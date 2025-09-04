import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className=" bg-background w-full min-h-screen px-4 md:px-10 flex gap-5">
      <Sidebar />

      <div className="flex-1 h-screen flex flex-col gap-5 pb-10">
        <Header />
        <div className="flex-1 bg-card rounded-[40px] rounded-tl-[100px]  py-6 flex flex-col overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
