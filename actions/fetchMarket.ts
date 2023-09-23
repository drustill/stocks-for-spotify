import { UserBetDetails } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import {cookies } from "next/headers";

const fetchMarket = async (): Promise<[]> => {
    const supabase = createServerComponentClient({
        cookies: cookies
    });

    const { data, error } = await supabase
        .from('registered_entities')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.log(error);
    }

    return (data as any) || [];
}

export default fetchMarket;