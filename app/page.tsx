"use client";

import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import {useEffect} from "react";

import Navbar from "@/components/navbar/Navbar";
import Billboard from "@/components/billboard/Billboard";
import MovieList from "@/components/movie/MovieList";
import useMovieList from "@/hooks/useMovieList";
import useFavorites from "@/hooks/useFavorites";
import InfoModal from "@/components/InfoModal/InfoModal";
import useInfoModal from "@/hooks/useInfoModal";

const HomePage = () => {
    const {data: session, status} = useSession();
    const router = useRouter()
    const { data: movies = [] } = useMovieList()
    const { data: favorites = []} = useFavorites()
    const { isOpen, closeModal } = useInfoModal()

    useEffect(() => {
        if (status === "loading") return; // Wait for session status to be determined

        if (!session) {
            router.push("/auth");
        }
    }, [status, session, router]);

    return (
        <>
            <InfoModal visible={isOpen} onClose={closeModal} />
            <Navbar/>
            <Billboard/>
            <div className="pb-40">
                <MovieList title="Trending Now" data={movies}/>
                <MovieList title="My List" data={favorites}/>
            </div>
        </>
    );
};

export default HomePage;
