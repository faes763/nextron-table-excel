import { create } from "zustand";

interface stateUpdate {
    isUpdate: boolean
    update: () => void
    halt: () => void
}

export const useUpdateData = create<stateUpdate>((set) => ({
    isUpdate: false,
    update: () => set({ isUpdate: true }),
    halt: () => set({ isUpdate: false }),
}));

interface stateCount {
    count: number,
    next: (currentCount:number)=> void
    prev: (currentCount:number)=>void
}

export const useElementCount = create<stateCount>((set) => ({
    count: 0,
    next: (currentCount:number)=> set({count: currentCount}),
    prev: (currentCount:number)=>set({count: currentCount}),
}));