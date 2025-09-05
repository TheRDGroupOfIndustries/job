"use client";

import { MailPlus, Search, Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { deleteSelectedMails } from "@/redux/features/mailSlice";
import ComposeMailModal from "./ComposeMailModal";


export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const { selectedMail } = useSelector((state: RootState) => state.mail);
  const dispatch = useDispatch();

  return (
    <header className="h-[80px] bg-card rounded-br-[40px] rounded-bl-[100px] pl-20 pr-10 flex items-center justify-between gap-10">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold mr-10">LOGO</h1>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            placeholder="Search for mails..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-background rounded-full px-4 py-1 min-w-[300px] outline-secondary "
          />
          <Button
            type="submit"
            className="rounded-full bg-primary/40 hover:bg-primary/50 cursor-pointer"
          >
            <Search className="text-primary font-semibold" />
          </Button>
        </form>
      </div>
      <div className="flex items-center gap-2">
        {selectedMail.length > 0 && (
          <Button
            type="button"
            className="text-card rounded-full cursor-pointer"
            onClick={() => dispatch(deleteSelectedMails())}
          >
            <Trash2 />
          </Button>
        )}

        <ComposeMailModal/>
      </div>
    </header>
  );
}
