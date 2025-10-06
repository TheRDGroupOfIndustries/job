"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ChevronLeft, Star, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { deleteMail, fetchMails } from "@/redux/features/mailSlice";
import { Mail } from "@/types";

interface MailDetailsProps {
  id: string;
  setSelectedMailId: (id: string | null) => void;
}

const MailDetails: React.FC<MailDetailsProps> = ({ id, setSelectedMailId }) => {
  const { mails } = useSelector((state: RootState) => state.mail);
  const { userData } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const [mail, setMail] = useState<Mail | null>(null);

  useEffect(() => {
    if (userData) dispatch(fetchMails() as never);
  }, [userData]);

  useEffect(() => {
    const foundMail = mails.find((m) => m._id === id);
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
  
  const handleDeleteMail = (id: string) => {
    dispatch(deleteMail({ mailId: id as string }) as any).unwrap().then(() => {
      // console.log("Mail deleted successfully");
      setSelectedMailId(null);
    }).catch((error: any) => {
      console.error("Error deleting mail:", error);
    });
  };

  if (!mail) return null;


  return (
    <div className="flex flex-col h-full">
      {/* Header with back button and actions, made slightly taller and cleaner */}
      <div className="flex items-center justify-start gap-3 border-b px-6 py-4 sticky top-0 bg-white z-10 shadow-sm">
        <Button
          variant="ghost"
          // Rounded-xl to match the theme's overall shape
          className="rounded-full p-2 cursor-pointer h-auto bg-background hover:bg-gray-100 transition" 
          onClick={() => {
            setSelectedMailId(null);
          }}
        >
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </Button>
        <div className="flex-grow text-left text-xl font-bold text-gray-800 truncate capitalize">
          {mail?.subject ?? "No Subject"}
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          {/* Delete button styled to match the theme */}
          <Button
            variant="ghost"
            onClick={() => handleDeleteMail(mail?._id)}
            // Orange/Coral accent color for a key action, referencing the 'View' buttons in the image
            className="p-2 rounded-xl bg-orange-50 cursor-pointer hover:bg-orange-100 text-orange-600 transition" 
          >
            <Trash2 size={20} className="" />
          </Button>
        </div>
      </div>

      {/* Sender/Recipient details section */}
      <div className="flex items-center gap-4 px-6 py-5 border-b">
        {/* Larger, rounded avatar */}
        <Avatar className="h-14 w-14 rounded-full shadow-md"> 
          {/* Avatar fallback color for a nicer contrast */}
          <AvatarFallback className="bg-primary text-white text-xl font-bold"> 
            {senderInitial}
          </AvatarFallback>
        </Avatar>
        <div>
          {/* Clearer subject/title */}
          <p className="text-lg font-bold text-gray-900">
            {mail?.subject ?? "No Subject"}
          </p>
          {/* Recipient in a less prominent color */}
          <p className="text-sm text-gray-500 font-medium">
            To: {mail?.to ?? "Unknown Recipient"}
          </p>
          {/* Timestamp in a light color */}
          <p className="text-xs text-gray-400 mt-1">
            {formatTimestamp(mail?.createdAt ?? "")}
          </p>
        </div>
      </div>

      {/* Mail content section */}
      <div className="flex-1 overflow-y-auto px-6 py-6 whitespace-pre-wrap text-gray-700 leading-relaxed custom-scrollbar">
        {mail?.message ?? ""}
      </div>
    </div>
  );
};

export default MailDetails;