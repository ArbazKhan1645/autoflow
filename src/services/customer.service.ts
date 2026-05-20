import { customers } from "@/data/customers";
import type { CustomerStatus } from "@/models";
import { mockApi } from "./mock-api";

export const customerService = {
  async list(filters?: { search?: string; status?: CustomerStatus | "all" }) {
    let rows = [...customers];

    if (filters?.search) {
      const query = filters.search.toLowerCase();
      rows = rows.filter((customer) =>
        [
          customer.fullName,
          customer.company,
          customer.email,
          customer.phone,
          customer.city,
          customer.country,
        ]
          .join(" ")
          .toLowerCase()
          .includes(query),
      );
    }

    if (filters?.status && filters.status !== "all") {
      rows = rows.filter((customer) => customer.status === filters.status);
    }

    return mockApi(rows);
  },

  async getById(id: string) {
    return mockApi(customers.find((customer) => customer.id === id) ?? null);
  },
};
