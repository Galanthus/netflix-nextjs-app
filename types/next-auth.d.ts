import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    userId?: string // Add userId to the Session type
  }
}
