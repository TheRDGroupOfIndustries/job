// app/send-mail/page.tsx (or pages/send-mail.tsx depending on your setup)
"use client";

import { useState } from "react";
import MailComp from "@/components/MailComp";
import MailDetails from "@/components/MailDetails";

export default function Page() {
  const [selectedMailId, setSelectedMailId] = useState<string | null>(null);

  return (
    <div className="flex h-screen bg-white">
      <div className="w-1/3 border-r border-gray-200">
        <MailComp onSelectMail={(id: string) => setSelectedMailId(id)} />
      </div>

      <div className="flex-1 bg-white">
        {selectedMailId ? (
          <MailDetails id={selectedMailId} />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            Select a mail to view details
          </div>
        )}
      </div>
    </div>
  );
}
