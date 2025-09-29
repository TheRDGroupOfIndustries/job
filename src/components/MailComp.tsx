// components/MailComp.tsx
"use client";

import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { fetchMails, toggleMailSelection } from "@/redux/features/mailSlice";
import { RootState } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

interface MailCompProps {
  onSelectMail: (id: string) => void;
}

const MailComp: React.FC<MailCompProps> = ({ onSelectMail }) => {
  const { filteredMails, selectedMail } = useSelector((state: RootState) => state.mail);
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

  return (
    <div className="h-full overflow-y-auto custom-scrollbar">
      <div className="flex items-center justify-between px-6 py-4 border-b">
        <h1 className="text-lg font-semibold text-gray-800">Primary Mails</h1>
        <div className="flex items-center gap-4 text-gray-500">
          <span>{filteredMails.length} emails</span>
          <button title="Refresh" className="hover:text-gray-700">⟳</button>
          <button title="More options" className="hover:text-gray-700">⋯</button>
        </div>
      </div>

      <div className="p-4 border-b">
        <input
          type="search"
          placeholder="Search emails..."
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      {filteredMails.length > 0 ? (
        <div className="divide-y">
          {filteredMails.map(mail => (
            <div
              key={mail._id}
              onClick={() => onSelectMail(mail._id)}
              className={`flex items-start gap-3 px-4 py-3 cursor-pointer hover:bg-gray-50 transition ${
                selectedMail.includes(mail._id as never) ? "bg-blue-50 border border-blue-300 rounded-lg" : ""
              }`}
            >
              <Checkbox
                checked={selectedMail.includes(mail._id as never)}
                onCheckedChange={() => dispatch(toggleMailSelection(mail._id))}
                className="mt-1"
              />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-gray-900 truncate">{mail.subject ?? "No Subject"}</p>
                  <span className="text-xs text-gray-400">{formatDate(mail.createdAt ?? "")}</span>
                </div>
                <p className="text-sm text-gray-600 truncate max-w-md">{mail.message ?? ""}</p>
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
