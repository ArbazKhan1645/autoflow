"use client";

import { useState } from "react";
import { KeyRound, Plus, ShieldCheck, UserCog, UsersRound } from "lucide-react";
import { AdminSheet } from "@/components/admin/admin-sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/card";
import { Input, Select } from "@/components/ui/input";
import { SectionHeader } from "@/components/ui/section-header";
import type { UserRole } from "@/models";

const adminAccounts = [
  {
    id: "usr-001",
    fullName: "Arbaz Khan",
    email: "mashwanikhan192@gmail.com",
    role: "owner" as UserRole,
    status: "active",
    lastLogin: "Today, 12:39 PM",
  },
  {
    id: "usr-002",
    fullName: "Ava Chen",
    email: "ava@autoflow.example",
    role: "admin" as UserRole,
    status: "active",
    lastLogin: "Yesterday, 6:10 PM",
  },
  {
    id: "usr-003",
    fullName: "Noah Patel",
    email: "noah@autoflow.example",
    role: "sales" as UserRole,
    status: "active",
    lastLogin: "May 19, 2026",
  },
  {
    id: "usr-004",
    fullName: "Imani Clark",
    email: "imani@autoflow.example",
    role: "inventory" as UserRole,
    status: "invited",
    lastLogin: "Pending",
  },
];

const accountMetrics = [
  {
    label: "Total accounts",
    value: adminAccounts.length,
    icon: UsersRound,
  },
  {
    label: "Owners",
    value: adminAccounts.filter((account) => account.role === "owner").length,
    icon: ShieldCheck,
  },
  {
    label: "Admins",
    value: adminAccounts.filter((account) => account.role === "admin").length,
    icon: UserCog,
  },
  {
    label: "Invites",
    value: adminAccounts.filter((account) => account.status === "invited").length,
    icon: KeyRound,
  },
];

export function AccountsManagementScreen() {
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6">
      <SectionHeader
        eyebrow="Admin accounts"
        title="Team access and role management"
        description="Manage CRM users, roles, account status, invitations, access level and security controls."
        action={
          <Button onClick={() => setSheetOpen(true)}>
            <Plus className="h-4 w-4" />
            Invite admin
          </Button>
        }
      />

      <div className="grid gap-4 md:grid-cols-4">
        {accountMetrics.map((metric) => (
          <Panel className="p-5" key={metric.label}>
            <metric.icon className="h-6 w-6 text-primary" />
            <p className="mt-4 text-3xl font-black text-slate-950">{metric.value}</p>
            <p className="text-sm font-bold text-slate-500">{metric.label}</p>
          </Panel>
        ))}
      </div>

      <Panel className="overflow-hidden">
        <div className="border-b border-slate-200 p-5">
          <h2 className="text-xl font-black text-slate-950">Admin users</h2>
          <p className="mt-1 text-sm text-slate-500">
            Current team members with access to CRM operations.
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-[0.12em] text-slate-500">
              <tr>
                <th className="px-5 py-3">User</th>
                <th className="px-5 py-3">Role</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Last login</th>
                <th className="px-5 py-3">Security</th>
                <th className="px-5 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {adminAccounts.map((account) => (
                <tr key={account.id}>
                  <td className="px-5 py-4">
                    <p className="font-black text-slate-950">{account.fullName}</p>
                    <p className="text-xs font-semibold text-slate-500">{account.email}</p>
                  </td>
                  <td className="px-5 py-4">
                    <Badge tone={account.role === "owner" ? "blue" : "slate"}>
                      {account.role}
                    </Badge>
                  </td>
                  <td className="px-5 py-4">
                    <Badge tone={account.status === "active" ? "green" : "amber"}>
                      {account.status}
                    </Badge>
                  </td>
                  <td className="px-5 py-4 font-semibold text-slate-600">{account.lastLogin}</td>
                  <td className="px-5 py-4">
                    <Badge tone="green">2FA ready</Badge>
                  </td>
                  <td className="px-5 py-4">
                    <Button size="sm" variant="outline" onClick={() => setSheetOpen(true)}>
                      Manage
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      <AdminSheet
        description="Invite a CRM team member and assign a role. In production this will connect to auth provider invitations."
        open={sheetOpen}
        title="Invite or manage admin account"
        onClose={() => setSheetOpen(false)}
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setSheetOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setSheetOpen(false)}>Save account</Button>
          </div>
        }
      >
        <div className="grid gap-4">
          <Input placeholder="Full name" />
          <Input placeholder="Email address" type="email" />
          <Select defaultValue="admin">
            <option value="owner">Owner</option>
            <option value="admin">Admin</option>
            <option value="sales">Sales</option>
            <option value="inventory">Inventory</option>
            <option value="support">Support</option>
          </Select>
          <Select defaultValue="active">
            <option value="active">Active</option>
            <option value="invited">Invited</option>
            <option value="suspended">Suspended</option>
          </Select>
          <div className="rounded-lg bg-blue-50 p-4">
            <p className="font-black text-slate-950">Permissions preview</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Role controls visible navigation and CRM actions. Owner and admin can
              manage products, content, accounts and settings.
            </p>
          </div>
        </div>
      </AdminSheet>
    </div>
  );
}
