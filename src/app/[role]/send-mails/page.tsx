"use client";

import { useState } from "react";
import MailComp from "@/components/MailComp";
import MailDetails from "@/components/MailDetails";

export default function Page() {
  const [selectedMailId, setSelectedMailId] = useState<string | null>(null);

  return (
    // Changed bg-white to bg-gray-50 for a softer, themed background
    <div className="flex h-screen bg-gray-50"> 
      {/* Reduced width slightly for a more balanced layout like the image */}
      <div className="w-[35%] border-r border-gray-200 bg-white">
        <MailComp onSelectMail={(id: string) => setSelectedMailId(id)} selectedMailId={selectedMailId} />
      </div>

      <div className="flex-1 bg-white">
        {selectedMailId ? (
          <MailDetails id={selectedMailId} setSelectedMailId={setSelectedMailId} />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            Select a mail to view details
          </div>
        )}
      </div>
    </div>
  );
}