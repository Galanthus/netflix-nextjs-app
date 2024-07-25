"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { Bell, Search } from "lucide-react"

import logo from "../../public/netflix_logo.svg"
import UserNavbar from "./UserNavbar"

interface NavbarProps {
  name: string
  href: string
}

const links: NavbarProps[] = [
  {
    name: "Home",
    href: "/home"
  },
  {
    name: "TV Shows",
    href: "/home/shows"
  },
  {
    name: "Movies",
    href: "/home/movies"
  },
  {
    name: "Recently Added",
    href: "/home/recently"
  },
  {
    name: "My List",
    href: "/home/user/list"
  }
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <div className="w-full max-w-7xl mx-auto items-center justify-between px-5 sm:px-6 py-5 lg:px-8 flex">
      <div className="flex items-center">
        <Link href="/home" className="w-32">
          <Image src={logo} alt="Netflix Logo" priority />
        </Link>

        <ul className="lg:flex gap-x-4 ml-14 hidden">
          {links.map((link, index) => (
            <li key={index}>
              <Link
                href={link.href}
                className={`text-sm ${pathname === link.href ? "font-semibold underline text-white" : "text-gray-300"}`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center gap-x-8">
        <Search className="w-5 h-5 text-gray-300 cursor-pointer" />
        <Bell className="w-5 h-5 text-gray-300 cursor-pointer" />
        <UserNavbar />
      </div>
    </div>
  )
}
