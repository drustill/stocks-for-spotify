import { ArtistDetails } from "@/types";
import { create } from "zustand";

interface BetModalStore {
    isOpen: boolean;
    modalProps: ArtistDetails | null;
    onOpen: (props: ArtistDetails) => void;
    onClose: () => void;
};

const useBetModal = create<BetModalStore>((set) => ({
    isOpen: false,
    modalProps: null,
    onOpen: (props) => set({ isOpen: true, modalProps: props }),
    onClose: () => set({ isOpen: false, modalProps: null }),
}));

export default useBetModal;