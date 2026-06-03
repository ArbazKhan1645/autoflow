import type { AppUser, UserRole } from "@/models";
import { mockApi } from "./mock-api";

export const demoUser: AppUser = {
  id: "usr-001",
  fullName: "Store Owner",
  email: "owner@example.com",
  role: "owner",
};

export const authService = {
  async currentUser() {
    return mockApi(demoUser);
  },

  async switchRole(role: UserRole) {
    return mockApi({ ...demoUser, role });
  },
};
