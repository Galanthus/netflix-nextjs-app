import { redirect } from "next/navigation"

import { getServerSession } from "next-auth"

import { authOptions } from "./utils/auth"

export default async function Home() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return redirect("/login")
  } else {
    return redirect("/home")
  }
}
