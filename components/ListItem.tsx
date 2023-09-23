"use client";

import Image from "next/image";
import { AiFillCaretUp } from "react-icons/ai";

import { useUser } from "@/hooks/useUser";
import useAuthModal from "@/hooks/useAuthModal";
import useBetModal from "@/hooks/useBetModal";
import { ArtistDetails } from "@/types";

// this we need to get from supabase BITCH!!

interface ListItemProps {
  artistProps: ArtistDetails
}

const ListItem: React.FC<ListItemProps> = ({
  artistProps: artist
}) => {

    const authModal = useAuthModal();
    const betModal = useBetModal();
    const { user } = useUser();

    const onClick = () => {
      if (!user) {
        return authModal.onOpen();
      }
      return betModal.onOpen({
        id: artist.id,
        name: artist.name,
        price: artist.price,
        pop_index: artist.pop_index,
        follower: artist.follower,
        image: artist.image
      }); 
    }

    return (
      <button
        onClick={onClick}
        className="
          relative
          group
          flex
          items-center
          rounded-md
          overflow-hidden
          gap-x-3
          bg-gray-600
          transition
          
        "
      >
        <div 
          className="
            relative
            min-h-[64px]
            min-w-[64px]
          "
        >
          <Image 
            className='object-cover'
            fill
            sizes="100vh"
            src={artist.image}
            alt='image'
          />
        </div>
        <div 
          className="
            flex
            justify-between
            items-center
            w-full
            pr-2
            truncate
          "
          >
            <p className="font-medium text-md text-white truncate">{artist.name}</p> 
            <div 
              className="
                flex
                flex-col
                items-center
                justify-center
                group-hover:scale-110
                min-w-[40px]
              "
            >
              <AiFillCaretUp className='text-green-400' />
              <p className="font-medium text-white text-md">0.0%</p>
            </div>
          </div>
      </button>
    )
}

export default ListItem;