import { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
    isOAuth: boolean
    favoriteIds: string[]
}

declare module "next-auth" {
    interface Session {
        user: ExtendedUser
    }
}