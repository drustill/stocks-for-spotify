"use client";


import { FaUserFriends } from 'react-icons/fa';
import { AiOutlineGlobal, AiOutlinePlus } from 'react-icons/ai';
import { HiSwitchHorizontal } from 'react-icons/hi';
import { useState } from 'react';
import { useUser } from '@/hooks/useUser';
import ProfileListItem from './ProfileListItem';
import { User } from '@supabase/auth-helpers-nextjs';
import { Friend } from '@/types';

interface LeaderboardProps {
  friends: Friend[]
}

const Leaderboard: React.FC<LeaderboardProps> = ({
  friends
}) => {

  const [curr, setCurr] = useState<boolean>(true);

    const onClick = () => {
        
    };

    
    const onSwitch = () => {
      setCurr(!curr);
    };

    return (
        <div className="flex flex-col">
            <div
              className="
                flex
                items-center
                justify-between
                px-5
                pt-4
              "
            >
            {curr ? (
                <div
                  className="
                    inline-flex
                    items-center
                    gap-x-2
                  "  
                >
                    <FaUserFriends size = {24}/>
                    <p
                      className='
                        font-medium
                        text-md
                      '
                    >
                      Friends  
                    </p>
                  </div>
                  ) : (
                    <div
                    className="
                      inline-flex
                      items-center
                      gap-x-2
                    "  
                  >
                      <AiOutlineGlobal size = {24}/>
                      <p
                        className='
                          font-medium
                          text-md
                        '
                      >
                        Global Leaderboard    
                      </p>
                    </div>
                  )}
                <div 
                 className='
                  flex
                  items-center
                  gap-x-2
                 '
                >
                <HiSwitchHorizontal 
                  size={20}
                  onClick={onSwitch}
                  className='
                    cursor-pointer
                    hover:text-green-200
                    transition
                  '
                />
                {curr && <AiOutlinePlus 
                  size={20}
                  onClick={onClick}
                  className="
                    cursor-pointer
                    hover:text-green-200
                    transition  
                  "
                />
                }
                </div>
            </div>
            {curr ? (
              <div 
              className='
                flex
                flex-col
                gap-y-2
                mt-5
                px-4
              '
              >
                {friends.map((friend) => <ProfileListItem key={friend.friend_id} image='/deanblunt.jpg' name={friend.friend_name} href={`/profile/${friend.friend_id}`} value={friend.friend_value} />)}
              </div>
            ) : (
              <div 
              className='
                flex
                flex-col
                gap-y-2
                mt-4
                px-3
              '
              >
                Global Leaderboard
              </div>
            )}
        </div>
    );
}

export default Leaderboard;