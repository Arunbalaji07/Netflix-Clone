"use client"

import {useSession} from "next-auth/react";
import Image from "next/image";

import useCurrentUser from "@/hooks/useCurrentUser";

const ProfilePage = () => {
    const {data: session} = useSession();
    const {data: user} = useCurrentUser()

    if(!session) {
        window.location.replace('/auth')
        return null
    }

    const onClick = () => {
        // use router is not working so I use browser's window object.
        window.location.replace('/');
    }

    return (
        <div className="flex items-center h-full justify-center">
            <div className="flex flex-col">
                <h1 className="text-3xl md:text-6xl text-white text-center">Who is watching?</h1>
                <div className="flex items-center justify-center gap-8 mt-10">
                    <div onClick={onClick}>
                        <div className="group flex-row w-44 mx-auto">
                            <div
                                className="w-44 h-44 rounded-md flex items-center justify-center border-2 border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden">
                                <Image src="/images/default-blue.png" alt="profile" width={170} height={170}/>
                            </div>
                            <div className="mt-4 text-gray-400 text-2xl text-center group-hover:text-white">
                                {user?.name}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;