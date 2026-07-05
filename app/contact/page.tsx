import type { Metadata } from "next";
import { Phone } from "lucide-react";

import { CateringInquiry, FeedbackForm, VisitComposer } from "@/components/contact/ContactForms";
import { CallButton } from "@/components/layout/CallButton";
import { OpenBadge } from "@/components/OpenBadge";
import { InstagramIcon } from "@/components/ui/icons";
import { Glass } from "@/components/ui/Glass";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact — call, WhatsApp, catering & feedback",
  description:
    "Reach The Calcutta Classics in Shyambazar: call or WhatsApp for visits and catering, or leave feedback. Fastest channel: walking in hungry.",
};

export default function ContactPage() {
  return (
    <>
      <header className="mx-auto max-w-6xl px-4 pb-6 pt-12 md:px-8">
        <p className="text-xs uppercase tracking-[0.3em] text-soft">Say hello</p>
        <h1 className="mt-2 font-display text-4xl font-semibold md:text-5xl">Contact</h1>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <OpenBadge />
          <CallButton />
          <a
            href={site.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="tap-target inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm font-medium hover:border-momo-gold hover:text-momo-gold"
          >
            <InstagramIcon size={15} />
            {site.instagram.handle}
          </a>
        </div>
        {!site.contact.phone && (
          <Glass className="mt-4 flex items-center gap-3 px-4 py-3 text-sm text-soft">
            <Phone size={15} aria-hidden className="shrink-0 text-momo-gold" />
            Phone & WhatsApp numbers are being confirmed — DM us on Instagram
            meanwhile, or just show up. The steam is the doorbell.
          </Glass>
        )}
      </header>

      <div className="mx-auto grid max-w-6xl gap-6 px-4 pb-16 md:grid-cols-2 md:px-8">
        <VisitComposer />
        <CateringInquiry />
        <div className="md:col-span-2">
          <FeedbackForm />
        </div>
      </div>
    </>
  );
}
