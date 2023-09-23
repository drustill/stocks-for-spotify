"use client";

import React, { ChangeEvent, useState } from "react";
import Image from "next/image";
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useSupabaseClient } from "@supabase/auth-helpers-react";

import { useUser } from "@/hooks/useUser";
import OtherModal from "./OtherModal";
import Input from "./Input";
import Button from "./Button";
import { useRouter } from "next/navigation";


const FriendModal = () => {
    const [searchResults, setSearchResults] = useState([])
    
    const user = useUser();
    const friendModal = useFriendModal();
    const supabaseClient = useSupabaseClient();
    const router = useRouter();

    const handleSearch = async (event: ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        if (!query) {
            setSearchResults([])
            return;
        }
    }

}