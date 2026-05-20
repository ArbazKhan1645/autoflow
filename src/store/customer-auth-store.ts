"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CustomerUser {
  id: string;
  fullName: string;
  email: string;
  verified: boolean;
}

interface CustomerAuthState {
  user: CustomerUser | null;
  verificationEmail: string | null;
  verificationName: string | null;
  signIn: (email: string) => void;
  signUp: (fullName: string, email: string) => void;
  verify: () => void;
  signOut: () => void;
}

export const useCustomerAuthStore = create<CustomerAuthState>()(
  persist(
    (set) => ({
      user: null,
      verificationEmail: null,
      verificationName: null,
      signIn: (email) =>
        set({
          user: {
            id: "customer-demo",
            fullName: "AutoFlow Customer",
            email,
            verified: true,
          },
          verificationEmail: null,
          verificationName: null,
        }),
      signUp: (fullName, email) =>
        set({
          user: null,
          verificationEmail: email,
          verificationName: fullName,
        }),
      verify: () =>
        set((state) => ({
          user: {
            id: "customer-demo",
            fullName: state.verificationName ?? "Verified Customer",
            email: state.verificationEmail ?? "customer@example.com",
            verified: true,
          },
          verificationEmail: null,
          verificationName: null,
        })),
      signOut: () =>
        set({ user: null, verificationEmail: null, verificationName: null }),
    }),
    {
      name: "autoflow-customer-auth",
    },
  ),
);
