"use client";

import Image from "next/image";

import { ArtistDetails, SpotifyImage } from "@/types";
import useAuthModal from "@/hooks/useAuthModal";
import useBetModal from "@/hooks/useBetModal";
import { useUser } from "@/hooks/useUser";

interface ArtistItemProps {
    artistProps: ArtistDetails
}

const ArtistItem: React.FC<ArtistItemProps> = ({
    artistProps: artist
}) => {

    const authModal = useAuthModal();
    const betModal = useBetModal();
    const { user } = useUser();
    const modalProps = {
      id: artist.id,
      name: artist.name,
      price: artist.price

    }

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
            flex-col
            items-center
            justify-between
            rounded-xl
            overflow-hidden
            bg-gray-600
            transition
          "
        >
        <div 
          className="
            relative
            min-h-[180px]
            w-full
          "
        >
          <Image
            unoptimized
            className='object-cover'
            fill
            priority
            src={artist.image}
            alt='image'
          />
        </div>
        <div 
          className="
            w-full
            truncate
          "
          >
            <p className="font-medium text-lg text-white truncate">{artist.name}</p>
        </div>
        <div 
          className="
            w-full
            truncate
          "
          >
            <p className="font-medium text-lg text-white truncate">{artist.price}</p>
        </div>
        </button>
    )
}

export default ArtistItem