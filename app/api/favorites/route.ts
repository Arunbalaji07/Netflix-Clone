import { NextResponse } from "next/server";

import prisma from "@/lib/db";
import { serverAuth } from "@/lib/auth";

export async function GET() {
    try {
        const { currentUser } = await serverAuth()

        const favoriteMovies = await prisma.movie.findMany({
            where: {
                id: {
                    in: currentUser?.favoriteIds
                }
            }
        })

        return NextResponse.json(favoriteMovies)

    } catch (err) {
        console.log(err)
    }
}