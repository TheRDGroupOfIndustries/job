"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { fetchMails, toggleMailSelection } from "@/redux/features/mailSlice";
import { RootState } from "@/redux/store";
import { Mail } from "@/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function MailComp() {
  const { mails, filteredMails, selectedMail } = useSelector((state: RootState) => state.mail);
  const { userData } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false)

  // Format the date to "MM/DD/YYYY"
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
  };

  useEffect(() => {
    if (userData) dispatch(fetchMails() as never)
  }, [userData]);

  return (
    <>
      <div className="flex sticky top-0 left-0 right-0 justify-end  pr-10 pl-20 py-4 ">
        <h1 className="text-xl font-semibold">Primary Mails</h1>
      </div>
      <div className="flex-1 h-[calc(100vh-80px)] overflow-y-auto custom-scrollbar pr-10 pl-10 mb-10 ">
        {filteredMails.length > 0 ?
          filteredMails.map((mail: any) => (
            <div
              key={mail._id}
              className={`flex items-center justify-between p-4 border-b border-gray-200 transition-colors duration-200 ${
                selectedMail.includes(mail._id as never)
                  ? "bg-blue-100"
                  : "hover:bg-gray-100"
              }`}
            >
              <div className="flex items-center space-x-4 flex-grow min-w-0">
                <Checkbox
                  onCheckedChange={(checked) => {
                    console.log(checked, mail); // mail comes from outer scope
                    dispatch(toggleMailSelection(mail._id));
                  }}
                  className="cursor-pointer"
                />
                <Link href={`/${userData?.role}/send-mails/${mail._id}`}>
                  <div className="flex flex-col min-w-0 overflow-hidden">
                    <div className=" flex items-center gap-2">
                      <span className="font-semibold text-gray-800 text-sm md:text-base whitespace-nowrap overflow-hidden text-ellipsis">
                        {mail.subject}
                      </span>
                      <span className="text-xs font-medium text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis">
                        ({mail?.to || "No recipient" })
                      </span>
                    </div>
                    <div className="">
                      <p className="line-clamp-1 text-sm text-secondary max-w-lg">
                        {mail.message}{" "}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
              <span className="flex-shrink-0 ml-4 text-xs text-gray-400 md:text-sm whitespace-nowrap">
                {formatDate(mail.createdAt)}
              </span>
            </div>
          )) : (
            <p className="text-center text-xl text-gray-500 mt-20">No mails found.</p>
          )}
      </div>
    </>
  );
}
