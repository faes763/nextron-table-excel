import { create } from "zustand";

interface stateTitle {
    isOpen: boolean
    open: () => void
    close: () => void
    cell: string
    setCell: (currentCell: string) => void
    text: string
    setText: (currentText: string) => void
}

export const usePopupFilter = create<stateTitle>((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
    cell: "",
    setCell: (currentCell: string) => set({cell:currentCell}),
    text: "",
    setText: (currentText: string) => set({text:currentText})
}));