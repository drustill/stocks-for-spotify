"use client";

import { useRouter } from "next/navigation"
import { CgProfile } from "react-icons/cg";
import { HiHome } from "react-icons/hi";
import { MdLeaderboard } from 'react-icons/md';
import { twMerge } from "tailwind-merge";

import Button from "./Button";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";
import useAuthModal from "@/hooks/useAuthModal";

interface HeaderProps {
    children: React.ReactNode,
    className?: string
}

const Header: React.FC<HeaderProps> = ({
    children,
    className
}) => {
    const router = useRouter();
    const supabaseClient = useSupabaseClient();

    const handleLogout = async () => {
        const { error } = await supabaseClient.auth.signOut();
        router.refresh();
        if (error) {
            console.log(error);
        }
    }

    return (
      <div
        className={twMerge(`
            h-fit
            bg-gradient-to-b
            from-gray-800
            p-6
        `,
            className
        )}
      >
        <div className="w-full mb-4 flex items-center justify-between">
        <div 
          className="
            flex
            flex-col
            text-green-200
            text-3xl
            font-bold
            items-center
          "
        >
          <p>Stocks for</p>
          <p>Spotify</p>
        </div>
        <div 
          className="
            flex
            md:hidden
            gap-x-2
            items-center
          "
        >
          <button 
            className="
              rounded-full
              p-2
              bg-emerald-200
              flex
              items-center
              justify-center
              hover:opacity-75
              transition
            ">
            <HiHome size={20} />
          </button>
          <button 
            className="
              rounded-full
              p-2
              bg-emerald-200
              flex
              items-center
              justify-center
              hover:opacity-75
              transition
            ">
            <CgProfile size={20} />
          </button>
          <button 
            className="
              rounded-full
              p-2
              bg-emerald-200
              flex
              items-center
              justify-center
              hover:opacity-75
              transition
            ">
            <MdLeaderboard size={20} />
          </button>
        </div>
        <div 
          className="
             flex
             justify-between
             items-center
             gap-x-4
          "
        >
          <>
            <div>
              <Button 
                onClick={handleLogout}
                className="md:px-6 md:py-4 md:text-xl">
                Sign Out
              </Button>
            </div>
          </>
        </div>
        </div>
        {children}
      </div>
    )
}

export default Header