import {NextResponse} from "next/server";
import {without} from "lodash";

import prisma from "@/lib/db";
import {serverAuth} from "@/lib/auth";

export async function POST(req: Request) {
    try {

        const {currentUser} = await serverAuth()

        const body = await req.json();
        const { movieId } = body;

        const existingMovie = await prisma.movie.findUnique({
            where: {
                id: movieId
            }
        })

        if (!existingMovie) {
            throw new Error("Invalid ID")
        }

        const user = await prisma.user.update({
            where: {
                email: currentUser.email || ''
            },
            data: {
                favoriteIds: {
                    push: movieId
                }
            }
        })

        return NextResponse.json(user)

    } catch (err) {
        console.log(err)
    }
}

export async function DELETE(req: Request) {
    try {
        const {currentUser} = await serverAuth()

        const body = await req.json();
        const { movieId } = body;

        const existingMovie = await prisma.movie.findUnique({
            where: {
                id: movieId
            }
        })

        if (!existingMovie) {
            throw new Error("Invalid ID")
        }

        const updatedFavoriteIds = without(currentUser.favoriteIds, movieId)

        const updatedUser = await prisma.user.update({
            where: {
                email: currentUser.email || ''
            },
            data: {
                favoriteIds: updatedFavoriteIds
            }
        })

        return NextResponse.json(updatedUser)

    } catch (err) {
        console.log(err)
    }
}
