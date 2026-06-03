"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AppUser, UserRole } from "@/models";
import { demoUser } from "@/services/auth.service";
import { clientScopedStorage } from "./client-scoped-storage";

interface AuthState {
  user: AppUser | null;
  hasHydrated: boolean;
  signIn: (email?: string) => void;
  signOut: () => void;
  setRole: (role: UserRole) => void;
  setHasHydrated: (hasHydrated: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      hasHydrated: false,
      signIn: (email) =>
        set({
          user: {
            ...demoUser,
            email: email ?? demoUser.email,
          },
        }),
      signOut: () => set({ user: null }),
      setRole: (role) =>
        set((state) => ({
          user: { ...(state.user ?? demoUser), role },
        })),
      setHasHydrated: (hasHydrated) => set({ hasHydrated }),
    }),
    {
      name: "admin-auth",
      storage: clientScopedStorage,
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
