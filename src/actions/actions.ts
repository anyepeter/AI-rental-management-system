'use server'

import { prisma } from "@/lib/db";

export async function getAllCategories() {
  try {
      return await prisma.category.findMany();
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error("Failed to fetch categories");
  }
}
