// components/Sidebar.tsx

"use client";

import {
  BellRing,
  BriefcaseBusiness,
  ChartPie,
  DoorOpen,
  Dot,
  Layers,
  NotebookText,
  Pencil,
  Send,
  Table2,
  Target,
  TrainFront,
  UsersRound,
} from "lucide-react";
import { Badge } from "./ui/badge";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import toast from "react-hot-toast";
import { JSX, useEffect, useState } from "react";
import ProfileModal from "./ProfileModal";
import { getEmployeeTasks, getTasks } from "@/redux/features/taskSlice";
import { fetchMails } from "@/redux/features/mailSlice";
import { logout } from "@/redux/features/authSlice";

interface TOptions {
  label: string;
  icon: JSX.Element;
  path: string;
}

export default function Sidebar() {
  const { userData, isAutheticated } = useSelector(
    (state: RootState) => state.auth
  );
  const { tasks } = useSelector((state: RootState) => state.task);
  const { mails } = useSelector((state: RootState) => state.mail);
  const [Options, setOptions] = useState<TOptions[] | []>([]);
  const [openProfileModal, setOpenProfileModal] = useState(false);
  const [tab, setTab] = useState(1);
  const dispatch = useDispatch();
  const pathname = usePathname();
  const router = useRouter();

  const AdminOptions = [
    {
      label: "Dashboard",
      icon: <ChartPie className="w-5 h-5" />,
      path: "",
    },
    {
      label: "All Employee",
      icon: <UsersRound className="w-5 h-5" />,
      path: "all-employee",
    },
    {
      label: "Sheets",
      icon: <Table2 className="w-5 h-5" />,
      path: "sheets",
    },
    {
      label: "Job Posts",
      icon: <BriefcaseBusiness className="w-5 h-5" />,
      path: "job-posts",
    },
    {
      label: "Applications",
      icon: <NotebookText className="w-5 h-5" />,
      path: "applications",
    },
    {
      label: "Send Mails",
      icon: <Send className="w-5 h-5" />,
      path: "send-mails",
    },
    {
      label: "Blogs",
      icon: <Layers className="w-5 h-5" />,
      path: "/sanity-studio",
    },
    {
      label: "Assign Works",
      icon: <Target className="w-5 h-5" />,
      path: "assign-works",
    },
    {
      label: "Employee Chatbot",
      icon: <TrainFront className="w-5 h-5" />,
      path: "employee-chatbot",
    },
  ];

  const EmployeeOptions = [
    {
      label: "Dashboard",
      icon: <ChartPie className="w-5 h-5" />,
      path: "",
    },
    {
      label: "Sheets",
      icon: <Table2 className="w-5 h-5" />,
      path: "sheets",
    },
    {
      label: "Job Posts",
      icon: <BriefcaseBusiness className="w-5 h-5" />,
      path: "job-posts",
    },
    {
      label: "Applications",
      icon: <NotebookText className="w-5 h-5" />,
      path: "applications",
    },
    {
      label: "Send Mails",
      icon: <Send className="w-5 h-5" />,
      path: "send-mails",
    },
    {
      label: "Blogs",
      icon: <Layers className="w-5 h-5" />,
      path: "/sanity-studio",
    },
    {
      label: "My Works",
      icon: <Target className="w-5 h-5" />,
      path: "my-works",
    },
  ];

  const UserOptions = [
    {
      label: "Dashboard",
      icon: <ChartPie className="w-5 h-5" />,
      path: "",
    },
    {
      label: "Sheets",
      icon: <Table2 className="w-5 h-5" />,
      path: "sheets",
    },
    {
      label: "Job Posts",
      icon: <BriefcaseBusiness className="w-5 h-5" />,
      path: "job-posts",
    },
    {
      label: "Applications",
      icon: <NotebookText className="w-5 h-5" />,
      path: "applications",
    },
    {
      label: "Send Mails",
      icon: <Send className="w-5 h-5" />,
      path: "send-mails",
    },
    {
      label: "Blogs",
      icon: <Layers className="w-5 h-5" />,
      path: "blogs",
    },
    {
      label: "My Works",
      icon: <Target className="w-5 h-5" />,
      path: "my-works",
    },
  ];

  useEffect(() => {}, [tab]);

  useEffect(() => {
    if (userData && userData.role === "admin") {
          dispatch(getTasks() as any);
        } else if (userData && userData.role === "employee") {
          dispatch(getEmployeeTasks() as any);
        }
    if (userData) {
      dispatch(fetchMails() as any);

      userData.role === "admin"
        ? setOptions(AdminOptions)
        : userData.role === "employee"
        ? setOptions(EmployeeOptions)
        : userData.role === "user"
        ? setOptions(UserOptions)
        : setOptions([]);
    }

    // console.log(userData);
  }, [userData]);

  const handleLogout = async () => {
    toast.loading("Logging Out...", { id: "logout" });
    const res = await fetch("/api/auth/logout", { method: "POST" });
    const data = await res.json();
    // console.log(data);
    dispatch(logout());
    toast.success("Logged out", { id: "logout" });
    router.push("/auth/login");
  };

  return (
    <div className="w-[250px] py-4 md:py-10 flex flex-col gap-5 ">
      {/* Profile Card */}
      <div className=" bg-section p-5 rounded-4xl flex flex-col items-center relative ">
        <Badge className="rounded-full bg-primary text-card absolute top-0 left-6 -translate-y-1/2 ">
          Profile
        </Badge>
        <div className=" w-20 h-20 rounded-full mb-2">
          <Image
            src={userData?.profileImage || "/images/profile_picture.jpg"}
            alt="Profile Picture"
            // layout="fill"
            // objectFit="cover"
            priority={true}
            width={80}
            height={80}
            className=" rounded-full"
          />
        </div>
        <h2 className="text-xl font-semibold leading-tight font-stix-two-math">
          {userData && userData.name ? userData.name : "Username"}
        </h2>
        <p className="text-sm text-center text-secondary leading-tight font-dm-mono font-thin w-full max-w-[200px] line-clamp-1 break-words">
          {userData && userData.email ? userData.email : "username@gmail.com"}
        </p>
        <div className="flex items-center justify-center gap-3 mt-4">
          <div
            onClick={() => setOpenProfileModal(true)}
            className="flex items-center justify-center cursor-pointer p-3 rounded-full border border-secondary relative"
          >
            <Pencil size={18} className="text-secondary " />
          </div>
          <div className="flex items-center justify-center p-3 rounded-full border border-secondary relative">
            <Target size={18} className="text-secondary " />
            <Badge className="rounded-full bg-primary text-card absolute -top-2 -right-2 shadow-badge">
              {tasks?.length}
            </Badge>
          </div>
          <div className="flex items-center justify-center p-3 rounded-full border border-secondary relative">
            <BellRing size={18} className="text-secondary " />
            <Badge className="rounded-full bg-primary text-card absolute -top-2 -right-2 shadow-badge">
              {mails?.length}
            </Badge>
          </div>
        </div>
      </div>

      {/* Options Card */}
      <div className=" bg-section flex-1 p-5 rounded-4xl relative ">
        <Badge className="rounded-full bg-primary text-card absolute top-0 left-6 -translate-y-1/2 ">
          Options
        </Badge>
        <div className=" w-full h-[calc(100vh-470px)] overflow-y-auto custom-scrollbar">
          <ul className="flex flex-col h-full justify-between ">
            {Options.map((option) => (
              <Link
                href={`${
                  option.label === "Blogs"
                    ? `${option.path}`
                    : `/${userData?.role}/${option.path}`
                }`}
                key={option.label}
                className={`flex items-center gap-2 p-2 ${
                  pathname === `/${userData?.role}/${option.path}` ||
                  (option.path === "" && pathname === `/${userData?.role}`)
                    ? "text-primary font-semibold"
                    : "text-secondary"
                } hover:text-primary rounded-md transition-all duration-200`}
              >
                {option.icon}
                <span>{option.label}</span>
              </Link>
            ))}
          </ul>
        </div>
      </div>

      {/* Setting Card */}
      <div className=" bg-section p-5 rounded-4xl relative">
        <Badge className="rounded-full bg-primary text-card absolute top-0 left-6 -translate-y-1/2 ">
          Settings
        </Badge>
        <div className=" w-full h-full ">
          {/* <Label
            htmlFor="notification"
            className="flex items-center gap-2 w-full justify-between cursor-pointer px-3"
          >
            <span className=" text-lg">Notification</span>
            <Switch id="notification" className="shadow-md" />
          </Label> */}
          <Button
            type="button"
            onClick={handleLogout}
            variant={"ghost"}
            className="text-lg text-primary cursor-pointer w-full  "
          >
            <DoorOpen size={24} /> Logout
          </Button>
        </div>
      </div>

      {openProfileModal && (
        <ProfileModal close={() => setOpenProfileModal(false)} />
      )}
    </div>
  );
}
