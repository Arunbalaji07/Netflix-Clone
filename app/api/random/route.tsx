import { NextResponse } from "next/server";

import prisma from "@/lib/db";
import { serverAuth } from "@/lib/auth";


export async function GET () {
    try {
        await serverAuth()

        const movieCount = await prisma.movie.count()
        const randomIndex = Math.floor(Math.random() * movieCount)

        const randomMovies = await prisma.movie.findMany({
            take: 1,
            skip: randomIndex,
        })

        return NextResponse.json(randomMovies[0])

    } catch (err) {
        console.log(err)
    }
}