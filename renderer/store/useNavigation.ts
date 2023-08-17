import { create } from "zustand";

interface stateNav {
    isOpen: boolean
    open: () => void
    close: () => void
}

export const useNavigation = create<stateNav>((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
}));