import { UserBetDetails, UserDetails, Bet } from "@/types";
import { User } from "@supabase/auth-helpers-nextjs";
import { useSessionContext, useUser as useSupaUser } from "@supabase/auth-helpers-react";
import { createContext, useContext, useEffect, useState } from "react";

type UserContextType = {
  accessToken: string | null
  providerToken: string | null
  providerRefreshToken: string | null
  expiryDate: number | null
  user: User | null
  isLoading: boolean
  userDetails: UserDetails | null
  userBetDetails: UserBetDetails | null
};

export const UserContext = createContext<UserContextType | undefined>(
    undefined
);

export interface Props {
    [propName: string]: any
}

export const MyUserContextProvider = (props: Props) => {
    const {
        session,
        isLoading: isLoadingUser,
        supabaseClient: supabase
    } = useSessionContext();
    const user = useSupaUser();
    const client_id = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID || null;
    const client_secret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET || null;


    const accessToken = session?.access_token || null;
    var providerToken = session?.provider_token || null;
    var providerRefreshToken = session?.provider_refresh_token || null;
    var expiryDate = session?.expires_at || 0;

    const [isLoadingData, setIsLoadingData] = useState(false);
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
    const [userBetDetails, setUserBetDetails] = useState<UserBetDetails | null>(null);

    const getUserDetails = () => supabase.from('profiles').select('*').single()
    const getUserBetDetails = () => supabase.from('bets').select('*')

    useEffect(() => {
        console.log(session)
        if (expiryDate > 0 && Date.now() >= expiryDate * 1000) {
            console.log(" ..token ... :3 expired")
            const refreshRequest = async () => {
                const response = await fetch('https://accounts.spotify.com/api/token', {
                    method: 'POST',
                    headers: {
                        'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64')),
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: `grant_type=refresh_token&refresh_token=${providerRefreshToken}`
                });
                console.log(response);
                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    providerToken = data.access_token;
                    expiryDate = Date.now() + data.expires_in * 1000
                }
                setIsLoadingData(false);
            }
            refreshRequest()

        }
        if (!user && !isLoadingData && !userDetails) {
            setIsLoadingData(true);

            Promise.allSettled([getUserDetails(), getUserBetDetails()])
                .then((result) => {
                    const userDetailsPromise = result[0];
                    const userBetDetailsPromise = result[1];

                    if (userDetailsPromise.status === 'fulfilled') {
                        setUserDetails(userDetailsPromise.value.data as UserDetails);
                    }

                    if (userBetDetailsPromise.status === 'fulfilled') {
                        const betArray = userBetDetailsPromise.value.data as Bet[];
                        const betDetails: UserBetDetails = { bets: betArray }
                        setUserBetDetails(betDetails)
                    }

                    setIsLoadingData(false);
                }
            );
        } else if (!user && !isLoadingData && !isLoadingUser) {
            setUserDetails(null);
        }
    }, [user, isLoadingUser]);

    const value = {
        accessToken,
        providerToken,
        providerRefreshToken,
        expiryDate,
        user,
        isLoading: isLoadingUser || isLoadingData,
        userDetails,
        userBetDetails,
    }

    return <UserContext.Provider value={value} {...props} />
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("fuck you");
    }
    return context;
}