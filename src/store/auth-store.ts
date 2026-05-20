"use client";

import { create } from "zustand";
import type { AppUser, UserRole } from "@/models";
import { demoUser } from "@/services/auth.service";

interface AuthState {
  user: AppUser;
  setRole: (role: UserRole) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: demoUser,
  setRole: (role) =>
    set((state) => ({
      user: { ...state.user, role },
    })),
}));
