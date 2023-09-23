import { ArtistDetails } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getArtistData = async (id: string): Promise<ArtistDetails> => {
    const supabase = createServerComponentClient({
        cookies: cookies
    });

    const { data, error } = await supabase
        .from('artistData')
        .select('*')
        .eq('id', id)
        .single()

    if (error) {
        console.log(error);
    }

    return (data as any) || null;
}

export default getArtistData;