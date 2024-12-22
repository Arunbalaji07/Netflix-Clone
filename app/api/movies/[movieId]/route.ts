import { NextResponse } from "next/server";
import prisma from "@/lib/db"; // Assuming prisma setup
import { serverAuth } from "@/lib/auth"; // Assuming serverAuth middleware

// The function for GET requests
export async function GET(req: Request, {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    params }: {params: any} ) {
    try {
        // Authenticate the user
        await serverAuth();

        const { movieId } = await params; // Extract movieId from route parameters

        // Fetch the movie from the database
        const movie = await prisma.movie.findUnique({
            where: {
                id: movieId,
            },
        });

        // If the movie doesn't exist, return a 404
        if (!movie) {
            return NextResponse.json({ error: "Movie not found" }, { status: 404 });
        }

        // Return the movie details
        return NextResponse.json(movie);

    } catch (err) {
        console.error("Error fetching movie:", err);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
