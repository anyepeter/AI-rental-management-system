'use server'
import { NextResponse } from 'next/server';

import { prisma } from "@/lib/db";

export async function getAllCategories() {
  try {
    return await prisma.category.findMany();
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error("Failed to fetch categories");
  }
}
export async function getFirstUser() {
  try {
    return await prisma.user.findFirst({
      include: {
      properties: {
        include: {
          category: true,
          user: true,
          hospitals: true,
          schools: true,
          markets: true,
        }
      }
    }}
    );
  } catch (error) {
    console.error("Error fetching first user:", error);
    throw new Error("Failed to fetch first user");
  }
}

export async function getUserById(id: string) {
  try {
    return await prisma.user.findUnique({
      where: {
        clerkUserId: id,
      },
      include: {
        properties: {
          include: {
            category: true,
            user: true,
            hospitals: true,
            schools: true,
            markets: true,
          }
        }
      }
    });
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw new Error("Failed to fetch user by ID");
  }
}
export async function createProperty(data: {
  title: string;
  price?: number;
  categoryId: string;
  description: string;
  bedrooms?: number;
  bathrooms?: number;
  kitchen?: number;
  propertyNumber?: number;
  water: string;
  electricity: string;
  hasStorage: boolean;
  address: string;
  lat?: number;
  lng?: number;
  gate: boolean;
  gateman: boolean;
  images: string[];
  video?: string;
  userId: string;
  hospital: Array<{
    name: string;
    distance: string;
    type: string;
  }>
  school: Array<{
    name: string;
    distance: string;
    type: string;
  }>
  market: Array<{
    name: string;
    distance: string;
    type: string;
  }>
}) {
  try {
    const property = await prisma.property.create({
      data: {
        title: data.title,
        price: data.price,
        description: data.description,
        bedrooms: data.bedrooms,
        bathrooms: data.bathrooms,
        kitchen: data.kitchen,
        propertyNumber: data.propertyNumber,
        water: data.water,
        electricity: data.electricity,
        hasStorage: data.hasStorage,
        address: data.address,
        lat: data.lat,
        lng: data.lng,
        gate: data.gate,
        gateman: data.gateman,
        images: data.images,
        video: data.video,
        category: {
          connect: {
            id: data.categoryId,
          },
        },
        user: {
          connect: {
            id: data.userId,
          },
        },
        hospitals: {
          create: data.hospital.map((hospital: any) => ({
            name: hospital.name,
            distance: hospital.distance,
            type: hospital.type,
          }))
        },
        schools: {
          create: data.school.map((school: any) => ({
            name: school.name,
            distance: school.distance,
            type: school.type,
          }))
        },
        markets: {
          create: data.market.map((market: any) => ({
            name: market.name,
            distance: market.distance,
            type: market.type,
          }))
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      include: {
        category: true,
        user: true,
        hospitals: true,
        schools: true,
        markets: true,
      }
    });
    return property;
  } catch (error) {
    console.error("Error creating property:", error);
    throw new Error("Failed to create property");
  }
}


export const aiDescription = async (userData: { title: string, color: string; mainCarrefour: string; distanceFromRoad: number }) => {
  console.log(userData);

  try {
    const aiResponse = await fetch('https://gptprompt-2oqq2we3iq-uc.a.run.app', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: `I want you to write the description of a rental property with the follow attribute: 
                 the color of the property is ${userData.color}, the main carrefour from the property is ${userData.mainCarrefour}, 
                 and the distance from the main road is ${userData.distanceFromRoad}. The name of the property is ${userData.title}, also include unique attractive words
                 Ensure to write the description in 300 words in simple english and also ensure the response is an object with description attribute.`,
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      throw new Error(`OpenAI API Error: ${errorText}`);
    }

    const aiData = await aiResponse.json();
    const parsedData = {
      result: aiData.result,
    };

    return parsedData;
  } catch (error) {
    console.error('Error during AI description generation:', error);
    throw error;
  }
};

export async function getAllProperties() {
  try {
    const properties = await prisma.property.findMany({
      include: {
        category: true,
        user: true,
        hospitals: true,
        schools: true,
        markets: true,
      }
    });
    return JSON.parse(JSON.stringify(properties));
  } catch (error) {
    console.error("Error fetching properties:", error);
    throw new Error("Failed to fetch properties");
  }
}

export async function getAllUsers() {
  try {
    const users = await prisma.user.findMany();
    return JSON.parse(JSON.stringify(users));
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Failed to fetch users");
  }
}


export const aiRecommendation = async (userData: string) => {
  console.log(userData);

  const properties = await getAllProperties();

  try {
    const aiResponse = await fetch('https://gptprompt-2oqq2we3iq-uc.a.run.app', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // body: JSON.stringify({
      //   prompt: `Analyze this user query here ${userData} and determine if it's asking for a rental property in a specific category. In my database, 
      //   I have a category table with the following items: apartment, studio, room. Check which category the user is interested in.
      //   Additionally, check if the user specifies a location or address in Yaoundé where they are looking for the rental property. 
      //   Also, examine if the user mentions a price range, including max and min prices, or a fixed price. Respond in the following 
      //   object format: { isRentalRelated, category, minPrice, maxPrice, fixedPrice, address }. If the query is not related to rental 
      //   properties, provide a general response with the attribute name generalResponse.`,
      // }),
      body: JSON.stringify({
        "prompt": `Analyze this user query and determine if it's asking for rental properties in specific categories in my category table I have 3 items that is the apartment, studio, and room. then also check the user is asking for a specfic location or address in yaounde, min price, max price, fixed price,
         "${userData}". If response like object itsRelatedRental, category, address(Dont add yaounde the address), maxPrice, minPrice, fixedPrice they are asking for, if not then provide a general response that answer their question with the attribute tsRelatedRental and generalResponse`,
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      throw new Error(`OpenAI API Error: ${errorText}`);
    }

    const aiData = await aiResponse.json();
    const parsedData = {
      result: aiData.result,
    };

    const data = JSON.parse(parsedData.result);
    console.log(data);

    let responseText = '';
    let filteredSitess = [];
    if (data.itsRelatedRental) {
      const { category, address, maxPrice, minPrice, fixedPrice } = data

      const filteredSites = properties.filter(property => {
        return (
          (category && property.category.name.toLowerCase().includes(category.toLowerCase())) ||
          (address && property.address.toLowerCase().includes(address.toLowerCase())) ||
          (fixedPrice && property.price === fixedPrice) ||
          (minPrice && maxPrice && (property.price >= minPrice && property.price <= maxPrice))

        );
      });

      if (filteredSites.length > 0) {
        filteredSitess = filteredSites;
        responseText = `Here are some recommended properties for you:`;
      } else {
        responseText = "Sorry, we couldn't find any property matching your need.";
      }
    } else {
      responseText = `${data.generalResponse}`;
    }
    return { responseText, filteredSitess };
  } catch (error) {
    console.error('Error during AI recommendation generation:', error);
    throw error;
  }
};

export async function getAllCategory() {
  try {
    return await prisma.category.findMany({
      include: {
        properties: true,
      },
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error("Failed to fetch categories");
  }
}

