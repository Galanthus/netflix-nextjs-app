import MovieVideo from "../components/MovieVideo"
import RecentlyAdded from "../components/RecentlyAdded"

export default async function HomePage() {
  return (
    <div className="max-sm:px-5">
      <MovieVideo />
      <h1 className="text-3xl font-bold">Recently Added</h1>
      <RecentlyAdded />
    </div>
  )
}
