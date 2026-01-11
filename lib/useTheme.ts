import { create } from "zustand";

type ThemeState = {
    theme: string;
    setTheme: (value: string) => void;
};

export const useThemeStore = create<ThemeState>((set) => ({
    theme: 'dark',
    setTheme: (value: string) => set({ theme: value }),
}));
