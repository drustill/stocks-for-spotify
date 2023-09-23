import { Friend } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getFriends = async (): Promise<Friend[]> => {
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
    .from('friends')
    .select('*')
    .eq('id', sessionData.session?.user.id)

  console.log(data)

  if (error) {
    console.log(error.message);
  }

  return (data as any) || [];
};

export default getFriends;