import Image from "next/image"

import loginBgImage from "@/public/login_background.jpg"
import loginLogoImage from "@/public/netflix_logo.svg"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent">
      <Image
        src={loginBgImage}
        alt="Background Login Screen"
        className="hidden sm:flex sm:object-cover -z-10 brightness-50"
        priority
        fill
      />

      <Image
        src={loginLogoImage}
        alt="Logo"
        width={120}
        className="absolute left-4 top-4 object-contain md:left-10 md:top-6"
        priority
      />

      {children}
    </div>
  )
}
