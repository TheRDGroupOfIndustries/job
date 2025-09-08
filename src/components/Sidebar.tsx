"use client";

import {
  BellRing,
  BriefcaseBusiness,
  ChartPie,
  DoorOpen,
  Layers,
  NotebookText,
  Pencil,
  Send,
  Table2,
  Target,
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
import { authLogout } from "@/redux/features/authSlice";

export default function Sidebar() {
  const { userData, isAutheticated } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useDispatch();
  const pathname = usePathname();
  const router = useRouter();

  // console.log(pathname);
  const Options = [
    {
      label: "Dashboard",
      icon: <ChartPie className="w-5 h-5" />,
      path: "/",
    },
    {
      label: "Sheets",
      icon: <Table2 className="w-5 h-5" />,
      path: "/sheets",
    },
    {
      label: "Job Posts",
      icon: <BriefcaseBusiness className="w-5 h-5" />,
      path: "/job-posts",
    },
    {
      label: "Applications",
      icon: <NotebookText className="w-5 h-5" />,
      path: "/applications",
    },
    {
      label: "Send Mails",
      icon: <Send className="w-5 h-5" />,
      path: "/send-mails",
    },
    {
      label: "Blogs",
      icon: <Layers className="w-5 h-5" />,
      path: "/blogs",
    },
    {
      label: "My Works",
      icon: <Target className="w-5 h-5" />,
      path: "/my-works",
    },
  ];

  const handleLogout = async () => {
    const res = await fetch("/api/auth/logout", { method: "POST" });
    const data = await res.json();
    console.log(data);
    dispatch(authLogout());
    router.push("/auth/login");
  };

  return (
    <div className="min-w-[250px] py-4 md:py-10 flex flex-col gap-5">
      {/* Profile Card */}
      <div className=" bg-card  p-5 rounded-4xl flex flex-col items-center relative ">
        <Badge className="rounded-full bg-primary text-card absolute top-0 left-6 -translate-y-1/2 ">
          Profile
        </Badge>
        <div className=" w-20 h-20 rounded-full mb-2">
          <Image
            src={"/images/profile_picture.jpg"}
            alt="Profile Picture"
            priority={true}
            width={80}
            height={80}
            className=" rounded-full"
          />
        </div>
        <h2 className="text-xl font-semibold leading-tight font-stix-two-math">
          {userData && userData.name ? userData.name : "Adarsh Pandit"}
        </h2>
        <p className="text-sm text-secondary leading-tight font-dm-mono font-thin">
          {userData && userData.email
            ? userData.email
            : "adarshpandit@gmail.com"}
        </p>
        <div className="flex items-center justify-center gap-3 mt-4">
          <div className="flex items-center justify-center cursor-pointer p-3 rounded-full border border-secondary relative">
            <Pencil size={18} className="text-secondary " />
          </div>
          <div className="flex items-center justify-center cursor-pointer p-3 rounded-full border border-secondary relative">
            <Target size={18} className="text-secondary " />
            <Badge className="rounded-full bg-primary text-card absolute -top-2 -right-2 shadow-badge">
              2
            </Badge>
          </div>
          <div className="flex items-center justify-center cursor-pointer p-3 rounded-full border border-secondary relative">
            <BellRing size={18} className="text-secondary " />
            <Badge className="rounded-full bg-primary text-card absolute -top-2 -right-2 shadow-badge">
              20
            </Badge>
          </div>
        </div>
      </div>

      {/* Options Card */}
      <div className=" bg-card flex-1 p-5 rounded-4xl relative">
        <Badge className="rounded-full bg-primary text-card absolute top-0 left-6 -translate-y-1/2 ">
          Options
        </Badge>
        <div className=" w-full">
          <ul className="flex flex-col gap-px">
            {Options.map((option) => (
              <Link
                href={`/admin${option.path}`}
                key={option.label}
                className={`flex items-center gap-2 p-2 ${
                  pathname.replace(/\/$/, "") ===
                  `/admin${option.path}`.replace(/\/$/, "")
                    ? "text-primary font-semibold "
                    : "text-secondary"
                } hover:text-primary rounded-md transition-all duration-200 `}
              >
                {option.icon}
                <span>{option.label}</span>
              </Link>
            ))}
          </ul>
        </div>
      </div>

      {/* Setting Card */}
      <div className=" bg-card flex-1 p-5 rounded-4xl relative">
        <Badge className="rounded-full bg-primary text-card absolute top-0 left-6 -translate-y-1/2 ">
          Settings
        </Badge>
        <div className=" w-full h-full ">
          <Label
            htmlFor="notification"
            className="flex items-center gap-2 w-full justify-between cursor-pointer px-3"
          >
            <span className=" text-lg">Notification</span>
            <Switch id="notification" className="shadow-md" />
          </Label>
          <Button
            type="button"
            onClick={handleLogout}
            variant={"ghost"}
            className="text-lg text-primary cursor-pointer"
          >
            <DoorOpen size={24} /> Logout
          </Button>
        </div>
      </div>
    </div>
  );
}
