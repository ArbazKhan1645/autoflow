import { notifications } from "@/data/notifications";
import { mockApi } from "./mock-api";

export const notificationService = {
  async list() {
    return mockApi(notifications);
  },
};
