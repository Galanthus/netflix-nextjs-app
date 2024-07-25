"use client"

import Image from "next/image"

import { signIn } from "next-auth/react"

import GoogleIcon from "@/public/google.svg"

import { Button } from "@/components/ui/button"

const GoogleSignInButton = () => {
  return (
    <Button onClick={() => signIn("google")} variant="outline" size="icon">
      <Image src={GoogleIcon} alt="Google" className="w-6 h-6" />
    </Button>
  )
}

export default GoogleSignInButton
