export type CustomerStatus = "lead" | "active" | "vip" | "at-risk" | "inactive";
export type InquiryStatus =
  | "new"
  | "quoted"
  | "follow-up"
  | "won"
  | "lost";

export interface CustomerInquiry {
  id: string;
  subject: string;
  channel: "phone" | "whatsapp" | "email" | "web" | "walk-in";
  requestedPart: string;
  vehicle: string;
  status: InquiryStatus;
  assignedTo: string;
  valueEstimate: number;
  nextFollowUpAt: string;
  notes: string;
  createdAt: string;
}

export interface CustomerActivity {
  id: string;
  type: "call" | "note" | "quote" | "order" | "follow-up";
  title: string;
  description: string;
  owner: string;
  createdAt: string;
}

export interface Customer {
  id: string;
  fullName: string;
  phone: string;
  whatsapp: string;
  email: string;
  company: string;
  address: string;
  city: string;
  country: string;
  notes: string[];
  inquiryHistory: CustomerInquiry[];
  orderHistory: string[];
  activityTimeline: CustomerActivity[];
  totalSpent: number;
  status: CustomerStatus;
  createdAt: string;
  updatedAt: string;
}
