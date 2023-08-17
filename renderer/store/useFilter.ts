import { create } from "zustand";



interface stateFilter {
    countFilter: number
    set: (currentCountFilter:number) => void
    isFilter: boolean
    filter: () => void
    noFilter: () => void
}

export const useFilter = create<stateFilter>((set) => ({
    countFilter: 0,
    set: (currentCountFilter:number) => set({countFilter:currentCountFilter}),
    isFilter: false,
    filter: () => set({ isFilter: true }),
    noFilter: () => set({ isFilter: false }),
}));

