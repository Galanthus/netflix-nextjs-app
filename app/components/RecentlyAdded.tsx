import Image from "next/image"

import { getServerSession } from "next-auth"

import { authOptions } from "../utils/auth"
import prisma from "../utils/db"
import { MovieCard } from "./MovieCard"

async function getData(userId: string) {
  const data = await prisma.movie.findMany({
    select: {
      age: true,
      release: true,
      duration: true,
      id: true,
      overview: true,
      title: true,
      WatchList: {
        where: {
          userId: userId
        }
      },
      imageString: true,
      youtubeString: true
    },
    orderBy: {
      createdAt: "desc"
    },
    take: 4
  })

  return data
}

export default async function RecentlyAdded() {
  const session = await getServerSession(authOptions)

  const userId = session?.userId

  const data = await getData(userId!)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8 gap-6">
      {data.map((movie) => {
        return (
          <div key={movie.id} className="relative h-48">
            <Image
              src={movie.imageString}
              alt={movie.title}
              width={500}
              height={400}
              className="rounded-sm absolute w-full object-cover"
            />

            <div className="h-60 relative z-10 w-full transform transition duration-500 hover:scale-125 opacity-0 hover:opacity-100">
              <div className="bg-gradient-to-b border from-transparent via-black/50 to-black z-10 w-full h-full rounded-lg flex items-center justify-center">
                <Image
                  src={movie.imageString}
                  alt={movie.title}
                  width={800}
                  height={800}
                  className="absolute w-full h-full -z-10 rounded-lg object-cover"
                />

                <MovieCard
                  key={movie.id}
                  movieId={movie.id}
                  overview={movie.overview}
                  title={movie.title}
                  watchListId={movie.WatchList[0]?.id}
                  youtubeUrl={movie.youtubeString}
                  watchList={movie.WatchList.length > 0 ? true : false}
                  age={movie.age}
                  time={movie.duration}
                  year={movie.release}
                />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
