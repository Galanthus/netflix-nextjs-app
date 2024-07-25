import prisma from "./db"

const getFirstMovie = async () => {
  const data = await prisma.movie.findFirst({
    orderBy: {
      id: "asc"
    },
    select: {
      id: true,
      title: true,
      overview: true,
      videoSource: true,
      youtubeString: true,
      imageString: true,
      release: true,
      duration: true,
      age: true
    }
  })

  return data
}

export { getFirstMovie }
