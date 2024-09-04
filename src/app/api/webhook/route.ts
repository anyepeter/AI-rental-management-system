// @ts-nocheck
import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';
import { Webhook } from 'svix'
import { headers } from 'next/headers'


const {WEBHOOK_SECRET} = process.env;

// Clerk Webhook: create or delete a user in the database by Clerk ID
export async function POST(req: Request) {
    if (!WEBHOOK_SECRET) {
        throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local');
    }
    const headerPayload = headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");
    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response('Error occurred -- no svix headers', {
            status: 400
        });
    }
    const payload = await req.json();
    const body = JSON.stringify(payload);
    // Create a new Svix instance with your secret.
    const wh = new Webhook(WEBHOOK_SECRET);
    let evt;
    try {
        evt = wh.verify(body, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        });
        
        const { id: clerkUserId } = evt.data;

        console.log(evt.type)
        // Using prisma to send evt.id to the user table
        switch (evt.type) {
            case 'user.created':
                const { first_name: first, last_name: last, email_addresses: email_add, phone_numbers: phone_num, profile_image_url: image  } = evt.data;
                const emails = email_add[0].email_address;
                const phone = phone_num[0].phone_number;
                const user = await prisma.user.create({
                    data: { 
                        clerkUserId,
                        lastName: last || null,
                        firstName: first || null,
                        email: emails,
                        phone: phone || null,
                        image: image || null
                     }
                })
                return NextResponse.json({ user })
            case 'user.updated':
                const { first_name, last_name, email_addresses, phone_numbers, profile_image_url } = evt.data;
                const email = email_addresses[0].email_address;
                const phones = phone_numbers[0].phone_number;
                const updatedUser = await prisma.user.update({
                    where: { clerkUserId },
                   
                    data: { 
                        clerkUserId,
                        firstName: first_name || null,
                        lastName: last_name || null,
                        email: email,
                        phone: phones || null,
                        image: profile_image_url || null

                     }
                })
                return NextResponse.json({ user: updatedUser })
            case 'user.deleted':
                const deletedUser = await prisma.user.delete({
                    where: { clerkUserId },
                })
                return NextResponse.json({ user: deletedUser })
            default:
                return NextResponse.json({ message: 'Unhandled event type' }, { status: 400 })
        }
        
    } catch (err) {
        console.error('Error verifying webhook:', err);
        return new Response('Error occurred', {
            status: 400
        });
    }
}