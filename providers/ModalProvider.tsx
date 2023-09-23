"use client";

import { useEffect, useState } from "react";

import AuthModal from "@/components/AuthModal";
import BetModal from "@/components/BetModal";

const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <>
          <AuthModal />
          <BetModal />
        </>
    );
}

export default ModalProvider;