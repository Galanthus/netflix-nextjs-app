"use client"

import { useState } from "react"

import { InfoIcon, PlayCircle } from "lucide-react"

import { Button } from "@/components/ui/button"

import PlayVideoModal from "./PlayVideoModal"

interface IMovieButtons {
  overview: string
  youtubeUrl: string
  id: number
  age: number
  title: string
  releaseDate: number
  duration: number
}

export default function MovieButtons({
  overview,
  youtubeUrl,
  id,
  age,
  title,
  releaseDate,
  duration
}: IMovieButtons) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)} className="text-lg font-medium">
        <PlayCircle className="mr-2 h-6 w-6" /> Play
      </Button>

      <Button
        onClick={() => setOpen(true)}
        className="text-lg font-medium bg-white/40 hover:bg-white/30 text-white"
      >
        <InfoIcon className="mr-2 h-6 w-6" /> Learn More
      </Button>

      <PlayVideoModal
        key={id}
        age={age}
        duration={duration}
        overview={overview}
        release={releaseDate}
        title={title}
        youtubeUrl={youtubeUrl}
        state={open}
        changeState={setOpen}
      />
    </>
  )
}
