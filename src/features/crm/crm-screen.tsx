"use client";

import { useMemo, useState } from "react";
import { CalendarClock, Mail, MessageSquareText, Phone, Plus, StickyNote, UserRound } from "lucide-react";
import { AdminSheet } from "@/components/admin/admin-sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/card";
import { Input, SearchInput, Select } from "@/components/ui/input";
import { SectionHeader } from "@/components/ui/section-header";
import { Skeleton } from "@/components/ui/skeleton";
import { StatusPill } from "@/components/ui/status-pill";
import { useCustomers } from "@/hooks/use-customers";
import { formatDate } from "@/lib/utils";
import { useClientCurrency } from "@/components/providers/client-config-provider";
import type { CustomerStatus } from "@/models";
import { useNotificationStore } from "@/store/notification-store";

const statuses: (CustomerStatus | "all")[] = [
  "all",
  "lead",
  "active",
  "vip",
  "at-risk",
  "inactive",
];

export function CrmScreen() {
  const { currency } = useClientCurrency();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<CustomerStatus | "all">("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [customerSheetOpen, setCustomerSheetOpen] = useState(false);
  const [note, setNote] = useState("");
  const [localNotes, setLocalNotes] = useState<string[]>([]);
  const customers = useCustomers({ search, status });
  const pushToast = useNotificationStore((state) => state.pushToast);

  const selectedCustomer = useMemo(
    () => customers.data?.find((customer) => customer.id === selectedId) ?? customers.data?.[0],
    [customers.data, selectedId],
  );

  const addNote = () => {
    if (!note.trim()) return;
    setLocalNotes((current) => [note.trim(), ...current]);
    setNote("");
    pushToast({
      title: "CRM note saved",
      message: "The customer profile timeline has been updated locally.",
      severity: "success",
    });
  };

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6">
      <SectionHeader
        eyebrow="Customer CRM"
        title="Profiles, inquiries and follow-ups"
        description="A connected customer workspace for sales, support, notes, order history and AI-assisted follow-up management."
        action={
          <Button onClick={() => setCustomerSheetOpen(true)}>
            <Plus className="h-4 w-4" /> New customer
          </Button>
        }
      />

      <div className="grid gap-3 rounded-lg border border-border-soft bg-white/76 p-3 shadow-sm shadow-blue-900/5 backdrop-blur dark:bg-white/5 md:grid-cols-[1fr_190px]">
        <SearchInput
          placeholder="Search customer, company, phone, country..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <Select value={status} onChange={(event) => setStatus(event.target.value as CustomerStatus | "all")}>
          {statuses.map((item) => (
            <option key={item} value={item}>
              {item === "all" ? "All statuses" : item}
            </option>
          ))}
        </Select>
      </div>

      <div className="grid gap-6 xl:grid-cols-[360px_1fr]">
        <Panel className="overflow-hidden">
          <div className="border-b border-border-soft p-5">
            <h2 className="text-lg font-bold text-slate-950 dark:text-white">
              Customer accounts
            </h2>
            <p className="text-sm text-slate-500">{customers.data?.length ?? 0} profiles</p>
          </div>
          {customers.isLoading ? (
            <div className="p-5">
              <Skeleton className="h-96" />
            </div>
          ) : (
            <div className="divide-y divide-border-soft">
              {customers.data?.map((customer) => (
                <button
                  className={`w-full p-5 text-left transition ${
                    selectedCustomer?.id === customer.id
                      ? "bg-blue-50 dark:bg-blue-500/10"
                      : "hover:bg-slate-50 dark:hover:bg-white/5"
                  }`}
                  key={customer.id}
                  type="button"
                  onClick={() => setSelectedId(customer.id)}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate font-black text-slate-950 dark:text-white">
                        {customer.company}
                      </p>
                      <p className="mt-1 text-sm text-slate-500">{customer.fullName}</p>
                    </div>
                    <StatusPill status={customer.status} />
                  </div>
                  <p className="mt-3 text-sm font-semibold text-slate-600 dark:text-slate-300">
                    {currency.format(customer.totalSpent)} lifetime
                  </p>
                </button>
              ))}
            </div>
          )}
        </Panel>

        {selectedCustomer ? (
          <div className="space-y-6">
            <Panel className="p-6">
              <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-blue-50 text-primary">
                      <UserRound className="h-6 w-6" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-black text-slate-950 dark:text-white">
                        {selectedCustomer.company}
                      </h2>
                      <p className="text-sm font-semibold text-slate-500">
                        {selectedCustomer.fullName} / {selectedCustomer.city},{" "}
                        {selectedCustomer.country}
                      </p>
                    </div>
                    <StatusPill status={selectedCustomer.status} />
                  </div>
                  <div className="mt-6 grid gap-3 text-sm font-semibold text-slate-600 dark:text-slate-300 sm:grid-cols-3">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-primary" />
                      {selectedCustomer.phone}
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageSquareText className="h-4 w-4 text-primary" />
                      {selectedCustomer.whatsapp}
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-primary" />
                      {selectedCustomer.email}
                    </div>
                  </div>
                </div>
                <div className="rounded-lg bg-slate-50 p-5 dark:bg-white/5">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                    Sales tracking
                  </p>
                  <p className="mt-3 text-3xl font-black">
                    {currency.format(selectedCustomer.totalSpent)}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    {selectedCustomer.orderHistory.length} historical orders
                  </p>
                </div>
              </div>
            </Panel>

            <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
              <Panel className="p-5">
                <h2 className="text-lg font-bold text-slate-950 dark:text-white">
                  Inquiry tracking
                </h2>
                <div className="mt-4 space-y-3">
                  {selectedCustomer.inquiryHistory.map((inquiry) => (
                    <div
                      className="rounded-lg border border-border-soft bg-white p-4 dark:bg-white/5"
                      key={inquiry.id}
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <p className="font-black text-slate-950 dark:text-white">
                            {inquiry.subject}
                          </p>
                          <p className="mt-1 text-sm text-slate-500">
                            {inquiry.requestedPart} / {inquiry.vehicle}
                          </p>
                        </div>
                        <StatusPill status={inquiry.status} />
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <Badge tone="blue">{inquiry.channel}</Badge>
                        <Badge tone="green">{currency.format(inquiry.valueEstimate)}</Badge>
                        <Badge tone="amber">Owner {inquiry.assignedTo}</Badge>
                      </div>
                      <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-slate-600">
                        <CalendarClock className="h-4 w-4 text-primary" />
                        Follow-up {formatDate(inquiry.nextFollowUpAt)}
                      </div>
                    </div>
                  ))}
                </div>
              </Panel>

              <Panel className="p-5">
                <h2 className="text-lg font-bold text-slate-950 dark:text-white">
                  Notes
                </h2>
                <div className="mt-4 flex gap-2">
                  <textarea
                    className="min-h-24 flex-1 rounded-lg border border-slate-200 bg-white p-3 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-blue-100 dark:border-white/10 dark:bg-white/5"
                    placeholder="Add a customer note..."
                    value={note}
                    onChange={(event) => setNote(event.target.value)}
                  />
                  <Button aria-label="Save note" size="icon" onClick={addNote}>
                    <StickyNote className="h-4 w-4" />
                  </Button>
                </div>
                <div className="mt-4 space-y-3">
                  {[...localNotes, ...selectedCustomer.notes].map((item, index) => (
                    <div
                      className="rounded-lg bg-slate-50 p-3 text-sm text-slate-700 dark:bg-white/5 dark:text-slate-300"
                      key={`${item}-${index}`}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </Panel>
            </div>

            <Panel className="p-5">
              <h2 className="text-lg font-bold text-slate-950 dark:text-white">
                Activity timeline
              </h2>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {selectedCustomer.activityTimeline.map((activity) => (
                  <div
                    className="rounded-lg border border-border-soft bg-white p-4 dark:bg-white/5"
                    key={activity.id}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <Badge tone="slate">{activity.type}</Badge>
                      <span className="text-xs font-semibold text-slate-500">
                        {formatDate(activity.createdAt)}
                      </span>
                    </div>
                    <p className="mt-3 font-black text-slate-950 dark:text-white">
                      {activity.title}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">
                      {activity.description}
                    </p>
                    <p className="mt-3 text-xs font-bold uppercase tracking-[0.14em] text-primary">
                      {activity.owner}
                    </p>
                  </div>
                ))}
              </div>
            </Panel>
          </div>
        ) : (
          <Panel className="p-6">
            <Skeleton className="h-96" />
          </Panel>
        )}
      </div>

      <AdminSheet
        description="Create a CRM profile with contact, status and first inquiry context."
        open={customerSheetOpen}
        title="Add customer"
        onClose={() => setCustomerSheetOpen(false)}
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setCustomerSheetOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                setCustomerSheetOpen(false);
                pushToast({
                  title: "Customer created",
                  message: "Demo customer profile saved locally.",
                  severity: "success",
                });
              }}
            >
              Save customer
            </Button>
          </div>
        }
      >
        <div className="grid gap-4">
          <Input placeholder="Full name" />
          <Input placeholder="Company" />
          <Input placeholder="Phone" />
          <Input placeholder="WhatsApp" />
          <Input placeholder="Email" type="email" />
          <div className="grid gap-4 md:grid-cols-2">
            <Input placeholder="City" />
            <Input placeholder="Country" />
          </div>
          <Select defaultValue="lead">
            <option value="lead">Lead</option>
            <option value="active">Active</option>
            <option value="vip">VIP</option>
            <option value="at-risk">At-risk</option>
          </Select>
          <textarea
            className="min-h-28 rounded-lg border border-slate-300 bg-white p-3 text-sm font-medium text-slate-950 shadow-sm outline-none ring-1 ring-slate-200/80 placeholder:text-slate-500 focus:border-primary focus:ring-4 focus:ring-blue-100"
            placeholder="Opening note or inquiry details"
          />
        </div>
      </AdminSheet>
    </div>
  );
}
