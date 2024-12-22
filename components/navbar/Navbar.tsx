import React, {useCallback, useEffect, useState} from 'react';
import Image from "next/image";
import {BsBell, BsChevronDown, BsSearch} from "react-icons/bs";

import NavbarItem from "@/components/navbar/NavbarItem";
import MobileMenu from "@/components/navbar/MobileMenu";
import AccountMenu from "@/components/navbar/AccountMenu";

const navbarItemLabel = [
    {
        id: "1",
        label: "Home"
    },
    {
        id: "2",
        label: "Series"
    },
    {
        id: "3",
        label: "Films"
    },
    {
        id: "4",
        label: "New & Popular"
    },
    {
        id: "5",
        label: "My List"
    },
    {
        id: "6",
        label: "Browse by languages"
    },

]

const TOP_OFFSET= 66

const Navbar = () => {
    const [showMobileMenu, setShowMobileMenu] = useState(false)
    const [showAccountMenu, setShowAccountMenu] = useState(false)
    const [showBackground, setShowBackground] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= TOP_OFFSET) {
                setShowBackground(true)
            }
        }

        window.addEventListener("scroll", handleScroll)

        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])

    const toggleMobileMenu = useCallback(() => {
        setShowMobileMenu((current) => !current)
    }, [])

    const toggleAccountMenu = useCallback(() => {
        setShowAccountMenu((current) => !current)
    }, [])

    return (
        <nav className="w-full fixed z-40">
            <div
                className={`px-4 md:px-16 py-6 flex flex-row items-center transition duration-500 ${showBackground ? "bg-zinc-900 bg-opacity-90" : ""}  `}>
                <Image src={"/images/logo.png"} alt="logo" height={75} width={120}/>
                <div className="flex-row ml-8 gap-7 hidden lg:flex">
                    {navbarItemLabel.map((item) => {
                        return (
                            <NavbarItem key={item.id} label={item.label}/>
                        )
                    })}
                </div>
                <div onClick={toggleMobileMenu}
                     className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative">
                    <p className="text-white text-sm">Browse</p>
                    <BsChevronDown className={`text-white transition ${showMobileMenu ? 'rotate-180' : 'rotate-0'}`}/>
                    <MobileMenu visible={showMobileMenu}/>
                </div>
                <div className="flex flex-row ml-auto gap-7 items-center">
                    <div className="text-gray-200 hover:text-gray-300 cursor-pointer">
                        <BsSearch />
                    </div>
                    <div className="text-gray-200 hover:text-gray-300 cursor-pointer">
                        <BsBell />
                    </div>
                    <div onClick={toggleAccountMenu} className="flex flex-row items-center gap-2 cursor-pointer relative">
                        <div className="relative w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
                            <Image
                                src="/images/default-blue.png"
                                alt="Profile Picture"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <BsChevronDown className={`text-white transition ${showAccountMenu ? 'rotate-180' : 'rotate-0'}`}/>
                        <AccountMenu visible={showAccountMenu} />
                    </div>

                </div>
            </div>
        </nav>
    );
};

export default Navbar;