"use server"

import { revalidatePath } from "next/cache"

import { getServerSession } from "next-auth"

import { authOptions } from "./utils/auth"
import prisma from "./utils/db"

export async function addToWatchList(formData: FormData) {
  "use server"

  const movieId = formData.get("movieId")
  const pathname = formData.get("pathname")

  const session = await getServerSession(authOptions)

  const userId = session?.userId

  if (typeof movieId !== "string" || typeof pathname !== "string") {
    throw new Error("Invalid form data")
  }

  if (!userId) {
    throw new Error("User not authenticated")
  }

  // Check if the item is already in the watchlist
  const existingEntry = await prisma.watchList.findFirst({
    where: {
      userId: userId,
      movieId: Number(movieId)
    }
  })

  if (existingEntry) {
    // Return a message to the client to show to the user
    return { success: false, message: "Movie is already in your watchlist." }
  }

  const data = await prisma.watchList.create({
    data: {
      userId: userId!,
      movieId: Number(movieId)
    }
  })

  revalidatePath(pathname)
}

export async function deleteFromWatchList(formData: FormData) {
  "use server"

  const watchListId = formData.get("watchListId")
  const pathname = formData.get("pathname")

  if (typeof watchListId !== "string" || typeof pathname !== "string") {
    throw new Error("Invalid form data")
  }

  const data = await prisma.watchList.delete({
    where: {
      id: watchListId
    }
  })

  revalidatePath(pathname)
}
