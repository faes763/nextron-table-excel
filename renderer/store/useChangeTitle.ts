import { create } from "zustand";

interface stateTitle {
    isOpenTitle: boolean
    isChange: boolean
    change: () => void
    noChange: () => void
    openTitle: () => void
    close: () => void
    cell: string
    setCellTitle: (currentCell: string) => void
    text: string
    setTextTitle: (currentText: string) => void
}

export const useChangeTitle = create<stateTitle>((set) => ({
    isOpenTitle: false,
    isChange: false,
    change: ()=>set({isChange:true}),
    noChange: ()=>set({isChange:false}),
    openTitle: () => set({ isOpenTitle: true }),
    close: () => set({ isOpenTitle: false }),
    cell: "",
    setCellTitle: (currentCell: string) => set({cell:currentCell}),
    text: "",
    setTextTitle: (currentText: string) => set({text:currentText})
}));