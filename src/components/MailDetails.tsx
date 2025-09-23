"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "./ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Mail } from "@/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { fetchMails } from "@/redux/features/mailSlice";

export default function MailDetails({ id }: { id: string }) {
  const { mails, selectedMail } = useSelector((state: RootState) => state.mail);
  const [mail, setMail] = useState<Mail | null>(null);
  const { userData } = useSelector((state: RootState)=> state.auth)
  const dispatch = useDispatch();

  // Example mail data if no prop is passed
  const sampleMail = {
    id: "a1b2c3d4-e5f6-7a8b-c9d0-1e2f3a4b5c6d",
    subject: "Project Meeting Rescheduled",
    body: "Hi team, the project meeting for tomorrow has been moved to Friday at 10 AM. Please let me know if you can't make it.",
    sender: "j.doe@example.com",
    timestamp: "2025-09-03T10:00:00Z",
  };
  const router = useRouter();

    useEffect(()=> {
      if(userData) dispatch(fetchMails() as never)
  
    }, [userData])


  useEffect(() => {
    const foundMail = mails.find((m) => m._id === id);
    if (foundMail) {
      console.log(foundMail)
      setMail(foundMail);
    }
  }, [id, mails]);


  // const currentMail = sampleMail;
  const senderInitial = mail?.to
    ? mail?.to[0].toUpperCase()
    : "?";

  // Function to format the timestamp
  const formatTimestamp = (isoString: string) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(date);
  };

  return (
    <>
      <div className="flex sticky top-0 left-0 right-0 justify-between pl-20 pr-10 pt-5">
        <Button
          variant={"ghost"}
          onClick={() => router.back()}
          className="rounded-full cursor-pointer bg-background hover:bg-background/80 transition"
        >
          <ChevronLeft className="w-8 h-8 " />
        </Button>
        <h1 className="text-xl font-semibold">Primary Mails</h1>
      </div>
      <div className="flex-1 h-[calc(100vh-80px)] overflow-y-auto px-10">
        {mail && <Card className="w-full  border-none shadow-none rounded-none">
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Avatar className="h-12 w-12 rounded-full">
                <AvatarFallback className="bg-primary text-white text-xl font-semibold">
                  {senderInitial}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <CardTitle className="text-xl md:text-2xl font-bold">
                  {mail.subject}
                </CardTitle>
                <CardDescription className="text-secondary">
                  <span className="font-medium text-gray-700">To:</span>{" "}
                  {mail.to ? mail.to : "Unknown"}
                </CardDescription>
              </div>
            </div>
            <p className="text-sm text-secondary mt-2">
              {formatTimestamp(mail.createdAt || "")}
            </p>
          </CardHeader>
          <Separator className="my-4" />
          <CardContent>
            <p className="text-foreground leading-relaxed whitespace-pre-wrap">
              {mail.message}
            </p>
          </CardContent>
        </Card>}
      </div>
    </>
  );
}
