import Image from "next/image"

import { MovieCard } from "@/app/components/MovieCard"
import { authOptions } from "@/app/utils/auth"
import prisma from "@/app/utils/db"
import { getServerSession } from "next-auth"

async function getData(userId: string) {
  const data = await prisma.watchList.findMany({
    where: {
      userId: userId
    },
    select: {
      Movie: {
        select: {
          title: true,
          age: true,
          duration: true,
          imageString: true,
          overview: true,
          release: true,
          id: true,
          WatchList: true,
          youtubeString: true
        }
      }
    }
  })

  return data
}

export default async function WatchList() {
  const session = await getServerSession(authOptions)

  const userId = session?.userId

  const data = await getData(userId!)

  return (
    <>
      <h1 className="text-white text-4xl font-bold underline mt-10 max-sm:px-5">Your watchlist</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8 gap-6">
        {data.map((movie) => {
          return (
            <div key={movie.Movie?.id} className="relative h-48">
              {movie.Movie?.imageString && (
                <Image
                  src={movie.Movie.imageString}
                  alt={movie.Movie.title}
                  width={500}
                  height={400}
                  className="rounded-sm absolute w-full object-cover"
                />
              )}

              <div className="h-60 relative z-10 w-full transform transition duration-500 hover:scale-125 opacity-0 hover:opacity-100">
                <div className="bg-gradient-to-b border from-transparent via-black/50 to-black z-10 w-full h-full rounded-lg flex items-center justify-center">
                  {movie.Movie?.imageString && (
                    <Image
                      src={movie.Movie.imageString}
                      alt={movie.Movie.title}
                      width={800}
                      height={800}
                      className="absolute w-full h-full -z-10 rounded-lg object-cover"
                    />
                  )}

                  {movie.Movie && (
                    <MovieCard
                      key={movie.Movie.id}
                      movieId={movie.Movie.id}
                      overview={movie.Movie.overview}
                      title={movie.Movie.title}
                      watchListId={movie.Movie.WatchList[0]?.id}
                      youtubeUrl={movie.Movie.youtubeString}
                      watchList={movie.Movie.WatchList.length > 0 ? true : false}
                      age={movie.Movie.age}
                      time={movie.Movie.duration}
                      year={movie.Movie.release}
                    />
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
