import { UserBetDetails, Bet } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getUserBets = async (): Promise<Bet[]> => {
    const supabase = createServerComponentClient({
        cookies: cookies
    });

    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

    console.log(sessionData)
    if (sessionError) {
      console.log(sessionError.message);
      return [];
    }

    const { data, error } = await supabase
        .from('bets')
        .select('*')
        .eq('id', sessionData.session?.user.id)
        

    if (error) {
        console.log(error);
    }

    return (data as any) || [];
}

export default getUserBets;