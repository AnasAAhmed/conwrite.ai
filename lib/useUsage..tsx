import { create } from "zustand";

interface UserUsage {
    usage: number
    setUsage: (usage: any) => void;
    resetUsage: () => void;
}

export const useUsage = create<UserUsage>((set) => ({
    usage: 0,
    setUsage: (usage) => set({ usage }),
    resetUsage: () => set({ usage: 0 }),
}));