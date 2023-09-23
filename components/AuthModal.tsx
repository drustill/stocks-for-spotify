"use client";

import { useSessionContext, useSupabaseClient } from "@supabase/auth-helpers-react";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import useAuthModal from "@/hooks/useAuthModal";
import { useEffect } from "react";

const AuthModal = () => {
    const supabaseClient = useSupabaseClient();
    const router = useRouter();
    const { session } = useSessionContext();
    const { isOpen, onClose, onOpen } = useAuthModal();
    const scopes = 'playlist-read-private playlist-read-collaborative user-top-read user-library-read user-follow-read user-read-private user-read-email'
    
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (session) {
                onClose();
                router.push('/')
                router.refresh()
            } else if (!session) {
                onOpen();
                router.push('/')
            }
        }, 750); 
    
        return () => {
            clearTimeout(timeoutId);
        };
    }, [session]);

    return (
        <Modal
          title="Stocks for Spotify OMFG ROFL"
          description="Login with Spotify to continue"
          isOpen={isOpen}
        >
            <Auth
              theme='dark'
              supabaseClient={supabaseClient}
              appearance={{
                theme: ThemeSupa,
                variables: {
                    default: {
                        colors: {
                            brand: '#404040',
                            brandAccent: '#22c55e',
                        }
                    }
                }
              }}
              providers={['spotify']}
              providerScopes={{'spotify': scopes}}
              queryParams={{
                client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID || '',
                response_type: 'code',
                redirect_uri: 'https://yzpulpdvdsfeagnsnquo.supabase.co/auth/v1/callback',
              }}
              onlyThirdPartyProviders
            />
        </Modal>
    );
}

export default AuthModal;