import Image from "next/image"

import { MovieCard } from "@/app/components/MovieCard"
import { authOptions } from "@/app/utils/auth"
import prisma from "@/app/utils/db"
import { getServerSession } from "next-auth"

async function getData(category: string, userId: string) {
  switch (category) {
    case "shows": {
      const data = await prisma.movie.findMany({
        where: {
          category: "show"
        },
        select: {
          age: true,
          duration: true,
          id: true,
          title: true,
          release: true,
          imageString: true,
          overview: true,
          youtubeString: true,
          WatchList: {
            where: {
              userId: userId
            }
          }
        }
      })

      return data
    }

    case "movies": {
      const data = await prisma.movie.findMany({
        where: {
          category: "movie"
        },
        select: {
          age: true,
          duration: true,
          id: true,
          title: true,
          release: true,
          imageString: true,
          overview: true,
          youtubeString: true,
          WatchList: {
            where: {
              userId: userId
            }
          }
        }
      })

      return data
    }

    case "recently": {
      const data = await prisma.movie.findMany({
        where: {
          category: "recent"
        },
        select: {
          age: true,
          duration: true,
          id: true,
          title: true,
          release: true,
          imageString: true,
          overview: true,
          youtubeString: true,
          WatchList: {
            where: {
              userId: userId
            }
          }
        }
      })

      return data
    }

    default: {
      throw new Error()
    }
  }
}

export default async function CategoryPage({ params }: { params: { genre: string } }) {
  const session = await getServerSession(authOptions)

  const userId = session?.userId

  const data = await getData(params.genre, userId!)

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
