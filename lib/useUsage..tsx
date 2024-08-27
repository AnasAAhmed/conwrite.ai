import { create } from "zustand";

interface UserUsage {
    usage: number;
    userId: string;
    setUsage: (usage: any) => void;
    setUserId: (userId: any) => void;
    resetUsage: () => void;
    maxCredits: number
    setMaxCredits: (maxCredits: any) => void;
}

export const useUsage = create<UserUsage>((set) => ({
    usage: 0,
    userId: '',
    maxCredits: 0,
    setMaxCredits: (maxCredits) => set({ maxCredits }),
    setUsage: (usage) => set({ usage }),
    setUserId: (userId) => set({ userId }),
    resetUsage: () => set({ usage: 0, userId: '', maxCredits: 0 }),
}));