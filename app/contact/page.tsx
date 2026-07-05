import type { Metadata } from "next";

import { ComingSoon } from "@/components/ComingSoon";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <ComingSoon
      title="Contact"
      note="Call, WhatsApp, feedback and catering inquiries wire up in Phase 7. For now, the fastest channel is walking in hungry."
    />
  );
}
