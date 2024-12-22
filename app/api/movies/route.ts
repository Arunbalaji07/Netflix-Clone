import { NextResponse } from "next/server";

import prisma from "@/lib/db";
import { serverAuth } from "@/lib/auth";

export async function GET() {
    try {
        await serverAuth()

        const movies = await prisma.movie.findMany()

        return NextResponse.json(movies)
    } catch (err) {
        console.log(err)
    }
}