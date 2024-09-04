// @ts-nocheck
'use client'
import { Card, CardContent } from '@/components/ui/card'
import { HotelIcon, HousePlusIcon, User2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { BiCommentCheck } from 'react-icons/bi'
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { useUser } from '@clerk/nextjs'
import { redirect, useRouter } from 'next/navigation'

import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { getAllBooks, getAllCategory, getAllComments, getAllHotels, getAllSites, getAllUsers } from '@/actions/actions'

const chartData = [
    { month: "January", Apartment: 186, Room: 80, Studio: 86 },
    { month: "February", Apartment: 305, Room: 200,Studio: 10},
    { month: "March", Apartment: 237, Room: 120,Studio: 96 },
    { month: "April", Apartment: 73, Room: 190, Studio: 100},
    { month: "May", Apartment: 209, Room: 130, Studio: 150},
    { month: "June", Apartment: 214, Room: 140, Studio: 286 },
]

const chartConfig = {
    Apartment: {
        label: "Apartment",
        color: "#2563eb",
    },
    Room: {
        label: "Room",
        color: "#60a5fa",
    },
    Studio: {
        label: "Studio",
        color: "#7166B8",
    }
} satisfies ChartConfig

export default function Page() {
    const { user, isLoaded, isSignedIn } = useUser(); 
    const router = useRouter(); 
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true); 
    const [apartement, setApartment] = React.useState([])
    const [studio, setStudio] = React.useState([])
    const [room, setRoom] = React.useState([])

    
    useEffect(() => {
        if (isLoaded && !isSignedIn) {
            router.push('/');
        } else if (isLoaded && user?.id !== 'user_2lbYGMvlajh6IOEww2em1vbeLOP') {
            router.push('/'); 
        } else if (isLoaded) {
            setIsLoading(false); // Data is loaded, stop showing the loader
        }
    }, [isLoaded, user]);

    // Fetch user data
    useEffect(() => {
        const fetchData = async () => {
            setUsers(await getAllUsers());
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const category = await getAllCategory()
            setApartment(category[0].properties)
            setStudio(category[1].properties)
            setRoom(category[2].properties)

        }
        fetchData()
    }, [])


   
    if (isLoading) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <p>Loading...</p>
            </div>
        );
    }
    return (
        <section className="w-full">
            <h1 className='text-4xl'>Admin Dashboard</h1>

            <div className='grid mt-10 w-full gap-[1.5rem] sm:grid-cols-2 lg-[1350px]:grid-cols-4' >
                <Card className='bg'>
                    <CardContent className=' flex gap-2 p-6'>
                        <div className='p-3 bg-rose-600 flex justify-center rounded-md items-center' >
                            <User2 className='text-white w-[42px]' />
                        </div>
                        <div className='p-1 pb-2'>
                            <p className='text-3xl'>{users.length}</p>
                            <h3 className='text-sm text-zinc-500'>No Users</h3>
                        </div>
                    </CardContent>
                </Card>

                <Card className='bg'>
                    <CardContent className=' flex gap-2 p-6'>
                        <div className='p-3 bg-[#7166B8] flex justify-center rounded-md items-center' >
                            <HousePlusIcon className='text-white w-[42px]' />
                        </div>
                        <div className='p-1 pb-2'>
                            <p className='text-3xl'>{room.length}</p>
                            <h3 className='text-sm text-zinc-500'>No Room</h3>
                        </div>
                    </CardContent>
                </Card>

                <Card className='bg'>
                    <CardContent className=' flex gap-2 p-6'>
                        <div className='p-3 bg-[#2DB7E7] flex justify-center rounded-md items-center' >
                            <BiCommentCheck className='text-white text-2xl  w-[42px]' />
                        </div>
                        <div className='p-1 pb-2'>
                            <p className='text-3xl'>{studio.length}</p>
                            <h3 className='text-sm text-zinc-500'>No Studio</h3>
                        </div>
                    </CardContent>
                </Card>

                <Card className='bg'>
                    <CardContent className=' flex gap-2 p-6'>
                        <div className='p-3 bg-[#25C24F] flex justify-center rounded-md items-center' >
                            <HotelIcon className='text-white w-[42px]' />
                        </div>
                        <div className='p-1 pb-2'>
                            <p className='text-3xl'>{apartement.length}</p>
                            <h3 className='text-sm text-zinc-500'>No Apartment</h3>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className='flex flex-col lg:flex-row gap-9 mt-10'>
                <div className='w-full bg-white'>
                    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                        <BarChart accessibilityLayer data={chartData}>
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                                tickFormatter={(value) => value.slice(0, 3)}
                            />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <ChartLegend content={<ChartLegendContent />} />
                            <Bar dataKey="Apartment" fill="var(--color-Apartment)" radius={1} />
                            <Bar dataKey="Room" fill="var(--color-Room)" radius={1} />
                            <Bar dataKey="Studio" fill="var(--color-Studio)" radius={1} />
                        </BarChart>
                    </ChartContainer>
                </div>
                 
                 <div  className='w-full flex  flex-col gap-5'>
                 <h1 className='text-2xl mt-10'>Apartments Booked</h1>
                <Card className='overflow-x-scroll '>
                    <table className='w-full text-sm min-w-[500px]  text-left border-collapse'>
                        <thead className="text-gray-600 bg-white font-medium border-b">
                            <tr>
                                <th className=' p-2'>User Name</th>
                                <th className=' p-2'>Apartment</th>
                                <th className=' p-2'>StartDate</th>
                                <th className=' p-2'>EndDate</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 divide-sky-50 divide-y">
                        
                                <tr>
                                    <td colSpan={4} className="border-none p-6 text-center">No reservations</td>
                                </tr>
                            
                        </tbody>
                    </table>
                </Card>
                </div>
            </div>

            <div className=''>
                <h1 className='text-2xl mt-10'>Comments</h1>
                <div className='mt-6 relative h-max p-4 overflow-x-auto'>
                <Card className=' w-full '>
                    <table className='w-full text-sm  text-left border-collapse'>
                        <thead className="text-gray-600 bg-white font-medium border-b">
                            <tr>
                                <th className=' p-2'>User Name</th>
                                <th className=' p-2'>Property Name</th>
                                <th className=' p-2'>Feedback</th>
                                <th className=' p-2'>Date</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 divide-sky-50 divide-y">
                         
                                <tr>
                                    <td colSpan={4} className="border-none p-6 text-center">No comments</td>
                                </tr>
                            
                        </tbody>
                    </table>
                </Card>
                </div>
            </div>
        </section>
    )
}
