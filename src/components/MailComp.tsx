"use client";

import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  deleteMails,
  fetchMails,
  setFilteredMails,
  toggleMailSelection,
} from "@/redux/features/mailSlice";
import { RootState } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/button";
import { Search, Trash2 } from "lucide-react";

interface MailCompProps {
  onSelectMail: (id: string) => void;
  selectedMailId: string | null;
}

const MailComp: React.FC<MailCompProps> = ({ onSelectMail, selectedMailId }) => {
  const { filteredMails, selectedMail, mails } = useSelector(
    (state: RootState) => state.mail
  );
  const { userData } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userData) dispatch(fetchMails() as never);
  }, [userData]);

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };
    const [searchQuery, setSearchQuery] = useState("");
  
const handleSearchMails = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);

    const query = e.target.value.toLowerCase();
    const filtered = mails.filter(
      (mail) =>
        mail.subject.toLowerCase().includes(query) ||
        mail.message.toLowerCase().includes(query) ||
        mail.to.toLowerCase().includes(query)
    );
    dispatch(setFilteredMails(filtered) as any);
  };
  return (
    <div className="h-full overflow-y-auto custom-scrollbar">
      {/* Updated header style to be more spacious */}
      <div className="flex items-center justify-between px-6 pl-20 py-6 border-b">
        <h1 className="text-xl font-bold text-gray-800">Mails</h1>
        <div className="flex items-center gap-4 text-gray-500">
          <span className="text-sm font-medium">{filteredMails.length} emails</span>
        </div>
      </div>

      <div className="p-4 border-b">
        <div className="flex items-center gap-4 justify-between">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex items-center flex-grow relative" // Added relative for Search icon positioning if needed
          >
            {/* Improved search bar with full rounded corners and a slight shadow */}
            <Search className="absolute left-3 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search for mails..."
              value={searchQuery}
              onChange={handleSearchMails}
              // Added pl-9 for icon padding, full rounded-xl, and slight shadow
              className="bg-background rounded-xl px-4 pl-9 py-2 w-full outline-none focus:ring-2 focus:ring-primary transition shadow-sm text-sm"
            />
          </form>
          {selectedMail.length > 0 && (
            // Changed button style for delete to match the theme's softer look
            <Button
              type="button"
              className="p-2 rounded-xl bg-orange-100 hover:bg-orange-200 text-primary shadow-sm transition"
              onClick={() => dispatch(deleteMails() as any)}
            >
              <Trash2 className="w-5 h-5" />
            </Button>
          )}
        </div>
      </div>

      {filteredMails.length > 0 ? (
        <div className="divide-y divide-gray-100">
          {filteredMails.map((mail) => (
            <div
              key={mail._id}
             
              className={`flex items-start gap-3 px-4 py-4 cursor-pointer transition 
                ${
                  selectedMail.includes(mail._id as never) || mail._id === selectedMailId
                    // Theme: Soft Indigo/Blue background with rounded corners for selected state
                    ? "bg-orange-50 border-l-4 border-primary"
                    : "hover:bg-gray-50" // Soft hover effect
                }
              `}
            >
              <Checkbox
                checked={selectedMail.includes(mail._id as never)}
                onCheckedChange={() => dispatch(toggleMailSelection(mail._id))}
                // Style checkbox to match a more modern, rounded look if possible (requires custom styling or shadcn component properties)
                className="mt-1 rounded-md border-gray-300" 
              />
              <div onClick={() => onSelectMail(mail._id)} className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  {/* Subject text color and style */}
                  <p className={`font-semibold text-base truncate capitalize ${selectedMail.includes(mail._id as never) ? "text-primary" : "text-gray-900"}`}>
                    {mail.subject ?? "No Subject"}
                  </p>
                  {/* Date text color for a softer look */}
                  <span className="text-xs text-gray-400 font-medium">
                    {formatDate(mail.createdAt ?? "")}
                  </span>
                </div>
                {/* Message preview style */}
                <p className="text-sm text-gray-500 truncate max-w-md mt-1">
                  {mail.message ?? ""}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="p-6 text-gray-500 text-center">📭 No mails found</p>
      )}
    </div>
  );
};

export default MailComp;