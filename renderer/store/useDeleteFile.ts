import { create } from "zustand";

interface stateFile {
    isDelete: boolean
    deleted: () => void
    returnState: () => void
}

export const useDeleteFile = create<stateFile>((set) => ({
    isDelete: false,
    deleted: () => set({ isDelete: true }),
    returnState: () => set({ isDelete: false }),
}));