import Link from "next/link"
import { twMerge } from "tailwind-merge"
import Image from "next/image"

interface ProfileListItemProps {
    image: string
    name: string
    value: number
    href: string
}

const ProfileListItem: React.FC<ProfileListItemProps> = ({
    image,
    name,
    value,
    href
}) => {

    const onClick = () => {
        // on click go to friend profile
    }

    return (
        <Link
          href={href}
          className={twMerge(`
          flex 
          flex-row 
          h-auto 
          items-center 
          w-full 
          gap-x-2
          text-md 
          font-medium
          cursor-pointer
          hover:text-white
          transition
          text-black-500
          justify-between
          py-1`,
          )
        }
        >
          <div className="flex flex-row gap-x-2 items-center">
            <Image src={image} alt='image' width={30} height={30} className="rounded-full" />
            <p className="truncate w-100">{name}</p>
          </div>
          <div className="px-3">
            <p className="truncate w-100">{value}</p>
          </div>
        </Link>
    )
}

export default ProfileListItem