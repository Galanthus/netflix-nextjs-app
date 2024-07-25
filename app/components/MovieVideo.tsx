import { getFirstMovie } from "../utils/data"
import MovieButtons from "./MovieButtons"
import { H1, Paragraph } from "./ui/typography"

export default async function MovieVideo() {
  const data = await getFirstMovie()

  return (
    <div className="h-[55vh] lg:h-[60vh] w-full flex items-center antialiased">
      <video
        className="w-full absolute top-0 left-0 h-[60vh] object-cover -z-10 brightness-[60%] pointer-events-none"
        src={data?.videoSource}
        poster={data?.imageString}
        autoPlay
        muted
        loop
      />

      <div className="absolute w-[90%] lg:w-[40%] mx-auto">
        <H1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold">{data?.title}</H1>
        <Paragraph className="mt-5 line-clamp-3">{data?.overview}</Paragraph>

        {data && (
          <div className="flex gap-x-3 mt-4">
            <MovieButtons
              age={data?.age}
              duration={data?.duration}
              id={data?.id}
              overview={data?.overview}
              releaseDate={data?.release}
              title={data?.title}
              youtubeUrl={data?.youtubeString}
              key={data?.id}
            />
          </div>
        )}
      </div>
    </div>
  )
}
