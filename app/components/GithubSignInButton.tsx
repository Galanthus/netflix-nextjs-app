"use client"

import { Github } from "lucide-react"
import { signIn } from "next-auth/react"

import { Button } from "@/components/ui/button"

const GithubSignInButton = () => {
  return (
    <Button onClick={() => signIn("github")} variant="outline" size="icon">
      <Github className="w-4 h-4" />
    </Button>
  )
}

export default GithubSignInButton
