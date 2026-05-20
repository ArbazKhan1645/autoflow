import Link from "next/link";
import { CreditCard, LockKeyhole, ShieldCheck } from "lucide-react";
import { PublicPageShell } from "@/components/public/public-page-shell";
import { buttonClassName } from "@/components/ui/button";
import { Panel } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function PaymentScreen() {
  return (
    <PublicPageShell>
      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-primary">Payment</p>
        <h1 className="mt-3 text-4xl font-black tracking-normal text-slate-950">Secure payment details</h1>
        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_330px]">
          <Panel className="p-6">
            <div className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-black text-slate-950">Card information</h2>
            </div>
            <div className="mt-5 grid gap-4">
              <Input defaultValue="4242 4242 4242 4242" />
              <div className="grid gap-4 md:grid-cols-2">
                <Input defaultValue="12 / 28" />
                <Input defaultValue="123" />
              </div>
              <Input defaultValue="AutoFlow Customer" />
            </div>
            <Link className={buttonClassName({ variant: "primary", size: "lg", className: "mt-6" })} href="/account/complete">
              Complete order
            </Link>
          </Panel>
          <Panel className="p-5">
            <LockKeyhole className="h-6 w-6 text-primary" />
            <h2 className="mt-4 text-xl font-black text-slate-950">Protected checkout</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              This MVP uses a demo payment screen. In production, this layer can
              be replaced by Stripe, PayPal, bank transfer or local payment services.
            </p>
            <div className="mt-5 flex items-center gap-2 rounded-lg bg-blue-50 p-3 text-sm font-bold text-slate-700">
              <ShieldCheck className="h-5 w-5 text-primary" />
              Fitment notes remain attached
            </div>
          </Panel>
        </div>
      </section>
    </PublicPageShell>
  );
}
