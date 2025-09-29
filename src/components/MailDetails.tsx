// components/MailDetails.tsx
"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ChevronLeft, Star, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchMails } from "@/redux/features/mailSlice";
import { Mail } from "@/types";

interface MailDetailsProps {
  id: string;
}

const MailDetails: React.FC<MailDetailsProps> = ({ id }) => {
  const { mails } = useSelector((state: RootState) => state.mail);
  const { userData } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const [mail, setMail] = useState<Mail | null>(null);

  useEffect(() => {
    if (userData) dispatch(fetchMails() as never);
  }, [userData]);

  useEffect(() => {
    const foundMail = mails.find(m => m._id === id);
    setMail(foundMail || null);
  }, [id, mails]);

  const senderInitial = mail?.to ? mail.to[0].toUpperCase() : "?";

  const formatTimestamp = (isoString: string) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(date);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between gap-3 border-b px-6 py-3 sticky top-0 bg-white z-10">
        <Button variant="ghost" className="rounded-full" onClick={() => { /* Implement if needed */ }}>
          <ChevronLeft className="w-6 h-6" />
        </Button>
        <div className="flex-grow text-left text-xl font-bold">{mail?.subject ?? "No Subject"}</div>
        <div className="flex items-center gap-4 text-gray-700">
          <Star size={20} className="cursor-pointer hover:text-yellow-500" />
          <Trash2 size={20} className="cursor-pointer hover:text-red-500" />
        </div>
      </div>

      <div className="flex items-center gap-4 px-6 py-4 border-b">
        <Avatar className="h-12 w-12 rounded-full">
          <AvatarFallback className="bg-gray-500 text-white">{senderInitial}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-base md:text-lg font-semibold">{mail?.subject ?? "No Subject"}</p>
          <p className="text-sm text-gray-600">{mail?.to ?? "Unknown Recipient"}</p>
          <p className="text-xs text-gray-400">{formatTimestamp(mail?.createdAt ?? "")}</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6 whitespace-pre-wrap text-gray-800">
        {mail?.message ?? ""}
      </div>
    </div>
  );
};

export default MailDetails;
