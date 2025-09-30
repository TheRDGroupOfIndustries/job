"use client";

import { CirclePlus, MailPlus, Search, Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  deleteMails,
  deleteSelectedMails,
  setFilteredMails,
} from "@/redux/features/mailSlice";
import ComposeMailModal from "./ComposeMailModal";
import { usePathname } from "next/navigation";
import TaskForm from "./TaskForm";
import ApplicationForm from "./ApplicationForm";
import Image from "next/image";
import Link from "next/link";
import JobApplicationForm from "./user/JobApplicationForm";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const { selectedMail } = useSelector((state: RootState) => state.mail);
  const [openAssignWorkForm, setOpenAssignWorkForm] = useState(false);
  const [openApplicationForm, setOpenApplicationForm] = useState(false);
  const { mails, filteredMails } = useSelector(
    (state: RootState) => state.mail
  );
  const { userData } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const pathname = usePathname();

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

  // Helper function to render dynamic right-side content
  const renderDynamicContent = () => {
    if (pathname.includes("send-mails")) {
      return (
        <div className="flex items-center gap-4 justify-end">
          {/* <form
            onSubmit={(e) => e.preventDefault()}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Search for mails..."
              value={searchQuery}
              onChange={handleSearchMails}
              className="bg-background rounded-full px-4 py-1 min-w-[200px] outline-secondary"
            />
            <Button
              type="submit"
              className="rounded-full bg-primary/40 hover:bg-primary/50 cursor-pointer"
            >
              <Search className="text-primary font-semibold" />
            </Button>
          </form>
          {selectedMail.length > 0 && (
            <Button
              type="button"
              className="text-card rounded-full cursor-pointer"
              onClick={() => dispatch(deleteMails() as any)}
            >
              <Trash2 />
            </Button>
          )} */}
          <ComposeMailModal />
        </div>
      );
    }

    if (pathname.includes("assign-works")) {
      return (
        <div className="flex justify-end">
          <Button
            onClick={() => setOpenAssignWorkForm(true)}
            className="rounded-full text-section cursor-pointer bg-orange-600 hover:bg-orange-700"
          >
            <CirclePlus className="mr-2 h-5 w-5" /> Assign Work
          </Button>
        </div>
      );
    }

    if (pathname.includes("my-works")) {
      return (
        <div className="flex justify-end">
          <Button
            onClick={() => setOpenAssignWorkForm(true)}
            className="rounded-full text-section cursor-pointer bg-orange-600 hover:bg-orange-700"
          >
            <CirclePlus className="mr-2 h-5 w-5" /> Add Work
          </Button>
        </div>
      );
    }

    // if (pathname.includes("applications")) {
    //   return (
    //     <div className="flex justify-end">
    //       <JobApplicationForm />
    //     </div>
    //   );
    // }

    // if (pathname.includes("all-employee")) {
    //   return (
    //     <div className="flex justify-end">
    //       <h2 className="text-2xl font-semibold text-gray-800">All Employees</h2>
    //     </div>
    //   );
    // }

    return (
      <div className="flex justify-end">{/* Empty space on the right */}</div>
    );
  };

  return (
    <header className="h-[80px] bg-section rounded-br-[40px] rounded-bl-[100px] pl-10 pr-10 flex items-center justify-between gap-10">
      <div className="grid grid-cols-3 w-full items-center h-full">
        <div className="flex-shrink-0"></div>

        <div className="flex justify-center">
          <Link
            href={`/${userData?.role}`}
            className="flex items-center space-x-2"
          >
            <Image
              src="/images/alplogo.webp"
              alt="logo"
              width={40}
              height={40}
            />
            <span className="text-2xl font-bold text-orange-600">
              Alpran HR Services
            </span>
          </Link>
        </div>

        <div className="flex justify-end">{renderDynamicContent()}</div>
      </div>

      {openAssignWorkForm && (
        <TaskForm
          mode={pathname.includes("my-works") ? "Create" : "Create"}
          close={() => setOpenAssignWorkForm(false)}
        />
      )}
      {openApplicationForm && (
        <ApplicationForm close={() => setOpenApplicationForm(false)} />
      )}
    </header>
  );
}
