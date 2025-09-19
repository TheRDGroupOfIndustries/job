"use client";
import AuthInitializer from "@/components/auth/AuthInitializer";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { authenticate } from "@/lib/auth";
import { usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAdminRoot = pathname === "/admin";

  return (
    <div className=" bg-background w-full min-h-screen px-4 md:px-10 flex gap-5">
      <Sidebar />

      <div className="flex-1 h-screen flex flex-col gap-5 pb-10">
        <Header />
        {isAdminRoot ? (
          <div className=" overflow-y-auto flex flex-col flex-1  ">
            {children}
          </div>
        ) : (
          <div className="flex-1 bg-section rounded-[40px] rounded-tl-[100px] flex flex-col overflow-y-auto">
            {children}
          </div>
        )}
      </div>
      <AuthInitializer />
    </div>
  );
}
