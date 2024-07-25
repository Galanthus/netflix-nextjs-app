import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"

interface IPlayVideoModal {
  title: string
  overview: string
  youtubeUrl: string
  state: boolean
  changeState: (newState: boolean) => void
  release: number
  age: number
  duration: number
}

export default function PlayVideoModal({
  title,
  overview,
  youtubeUrl,
  state,
  changeState,
  release,
  age,
  duration
}: IPlayVideoModal) {
  return (
    <Dialog open={state} onOpenChange={changeState}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="line-clamp-3">{overview}</DialogDescription>
          <div className="flex gap-x-2 items-center">
            <p>{release}</p>
            <p className="border py-0.5 px-1 border-gray-200 rounded">{age}+</p>
            <p>{duration}h</p>
          </div>
        </DialogHeader>

        <iframe src={youtubeUrl} className="w-full h-full aspect-video" />
      </DialogContent>
    </Dialog>
  )
}
