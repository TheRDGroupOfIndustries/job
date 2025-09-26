"use client";

import { CirclePlus, MailPlus, Search, Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { deleteMails, deleteSelectedMails, setFilteredMails } from "@/redux/features/mailSlice";
import ComposeMailModal from "./ComposeMailModal";
import { usePathname } from "next/navigation";
import TaskForm from "./TaskForm";
import ApplicationForm from "./ApplicationForm";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const { selectedMail } = useSelector((state: RootState) => state.mail);
  const [openAssignWorkForm, setOpenAssignWorkForm] = useState(false);
  const [openApplicationForm, setOpenApplicationForm] = useState(false)
  const { mails, filteredMails } = useSelector((state: RootState) => state.mail);
  const { userData } = useSelector((state: RootState) => state.auth)
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
  }

  return (
    <header className="h-[80px] bg-section rounded-br-[40px] rounded-bl-[100px] pl-20 pr-10 flex items-center justify-between gap-10">
      <div className="flex-shrink-0 flex items-center space-x-2">
          <Link href={`/${userData?.role}`} className="flex items-center">
            <Image
              src="/images/alplogo.webp"
              alt="logo"
              width={40}
              height={40}
            />
            <span className="text-2xl font-bold text-orange-600 ml-2">
              Alpran HR Services
            </span>
          </Link>
        </div>
      {pathname.includes("send-mails") && (
        <>
          <div className="flex flex-1 items-center">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Search for mails..."
                value={searchQuery}
                onChange={handleSearchMails}
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
                onClick={() => dispatch(deleteMails() as any)}
              >
                <Trash2 />
              </Button>
            )}

            <ComposeMailModal />
          </div>
        </>
      )}

      {pathname.includes("assign-works") && (
        <>
          <Button
            onClick={() => setOpenAssignWorkForm(true)}
            className="rounded-full text-section cursor-pointer"
          >
            <CirclePlus /> Assign Work
          </Button>
          {openAssignWorkForm && (
            <TaskForm
              mode="Create"
              close={() => setOpenAssignWorkForm(false)}
            />
          )}
        </>
      )}
      {pathname.includes("my-works") && (
        <>
          <Button
            onClick={() => setOpenAssignWorkForm(true)}
            className="rounded-full text-section cursor-pointer"
          >
            <CirclePlus /> Add Work
          </Button>
          {openAssignWorkForm && (
            <TaskForm
              mode="Create"
              close={() => setOpenAssignWorkForm(false)}
            />
          )}
        </>
      )}
      {pathname.includes("applications") && (
        <>
          {/* <Button
            onClick={()=>setOpenApplicationForm(true)}
            className="rounded-full text-section cursor-pointer"
          >
            <CirclePlus /> Add Application
          </Button> */}

          {/* {openAssignWorkForm && <TaskForm mode="Create" close={()=>setOpenAssignWorkForm(false)}  />} */}
        </>
      )}
      {pathname.includes("all-employee") && (
        <>
          <h2 className="text-2xl font-semibold">All Employees</h2>
        </>
      )}
      {/* {pathname.includes("my-works") && (
        <>
          <h2 className="text-2xl font-semibold">Your Kanban</h2>
        </>
      )} */}
      {openApplicationForm && <ApplicationForm close={() => setOpenApplicationForm(false)} />}
    </header>
  );
}
