"use client";

import React, { ChangeEvent, useState } from "react";
import Image from "next/image";
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useSupabaseClient } from "@supabase/auth-helpers-react";

import useBetModal from "@/hooks/useBetModal";
import { useUser } from "@/hooks/useUser";
import OtherModal from "./OtherModal";
import Input from "./Input";
import Button from "./Button";
import { useRouter } from "next/navigation";


const BetModal = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [amountText, setAmountText] = useState('Buy How Many Shares?');
    const [shareNum, setShareNum] = useState(0);

    const betModal = useBetModal();
    const supabaseClient = useSupabaseClient();
    const { user, userBetDetails, userDetails } = useUser();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        reset,
      } = useForm<FieldValues>({
        defaultValues: {
          amount: '',
        }
      });

    const handleInputEvent = (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.value) {
            setAmountText('Buy How Many Shares?')
        } else if (!isNaN(Number(event.target.value))) {
            setAmountText(`Buy ${event.target.value} Shares?`)
            setShareNum(Number(event.target.value))
        } else {
            setAmountText('Enter a Number')
        }
        
    }

    const handleMax = () => {

    }

    const onPurchase = async () => {
        //upload some shit to supabase bets table laaaaala..
      try {
        const { error } = await supabaseClient
            .from('bets')
            .insert({
                id: user?.id,
                artist_id: betModal.modalProps?.id,
                start_pop_index: Number(betModal.modalProps?.pop_index),
                start_follower: betModal.modalProps?.follower,
                share_amount: shareNum,
                price_purchased: shareNum * Number(betModal.modalProps?.price),
                price: Number(betModal.modalProps?.price),
                artist_image: betModal.modalProps?.image,
                artist_name: betModal.modalProps?.name
            });
        
        if (error) {
            console.error("FUCK YOU FUCK YOU LALALALALALALA", error)
        }
        router.refresh()
        setIsLoading(false)
        reset();
        betModal.onClose();
      } catch (error) {
        console.error("blaaa blaaaa pussy vagina :33", error)
      } finally {
        console.log("jaja")
        setIsLoading(false);
      }
    }

    const onChange = (open: boolean) => {
        if (!open) {
            reset();
            betModal.onClose();
        }
    }

    // find a way to detect if user already has money in this artist
    let content = (
        <form className=" text-white flex items-center" onSubmit={handleSubmit(onPurchase)}>
            <div className="flex flex-col w-full gap-y-4">
                <div className="flex justify-between items-center">
                    <div className="text-sm">{amountText}</div>
                    <button 
                      onClick={handleMax}
                      className="
                        text-sm
                        bg-emerald-200
                        rounded-lg
                        text-black
                        font-bold
                        border-transparent
                        hover:opacity-75
                        diasbled:cursor-not-allowed
                        hover:scale-110
                        px-2
                        py-1"
                      disabled={isLoading}
                    >
                        Max Amount
                    </button>
                </div>
                <Input
                    className="bg-white text-gray-800"
                    id="amount"
                    placeholder="Enter Number of Shares"
                    disabled={isLoading}
                    {...register('amount', { required: true })}
                />
                <Button disabled={isLoading} type="submit">
                    Purchase
                </Button>
            </div>
        </form>
    )

    return (
        <OtherModal
          title={`${betModal.modalProps?.name}`}
          description={`Priced at ${betModal.modalProps?.price}`}
          image={betModal.modalProps?.image || 'deanblunt.jpg'}
          isOpen={betModal.isOpen}
          onChange={onChange}
        >
        {content}
        </OtherModal>
    );
}

export default BetModal