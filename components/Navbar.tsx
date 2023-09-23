"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { HiHome } from 'react-icons/hi';
import { CgProfile } from 'react-icons/cg';

import Box from "./Box";
import NavbarItem from "./NavbarItem";
import Leaderboard from "./Leaderboard";
import { Friend, UserDetails } from "@/types";

interface NavbarProps {
    children: React.ReactNode;
    friends: Friend[]
}

const Navbar: React.FC<NavbarProps> = ({
    children,
    friends
}) => {
    const pathname = usePathname();

    const routes = useMemo(() => [
        {
            icon: HiHome,
            label: 'Home',
            active: pathname !== '/profile',
            href: '/'
        },
        {
            icon: CgProfile,
            label: 'Profile',
            active: pathname === '/profile',
            href: '/profile'
        },
    ], [pathname])

    return (
        <div className="flex h-full">
            <div 
                className="
                    hidden
                    md:flex
                    flex-col
                    gap-y-2
                    bg-grey-600
                    h-full
                    w-[300px]
                    p-2
                "
            >
                <Box>
                    <div 
                      className="
                        flex
                        flex-col
                        gap-y-4
                        px-5
                        py-4
                      "
                    >
                        {routes.map((item) => (
                            <NavbarItem 
                                key={item.label}
                                {...item}
                            />
                        ))}
                    </div>
                </Box>
                <Box className="overflow-y-auto h-full">
                    <div
                     className="
                        flex
                        flex-col
                        gap-y-1
                     "
                    >
                        <Leaderboard friends={friends}/>
                    </div>
                </Box>
            </div>
            <main className="h-full flex-1 overflow-y-auto py-2">
                {children}
            </main>
        </div>
    )
}

export default Navbar;