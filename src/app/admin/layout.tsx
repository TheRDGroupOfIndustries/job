import Sidebar from "@/components/Sidebar";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className=" bg-background w-full min-h-screen px-4 md:px-10 flex gap-5">
      <Sidebar />

      <div className="flex-1 flex flex-col gap-5 pb-10">
        <div className="h-[80px] bg-card rounded-br-[40px] rounded-bl-[100px] px-20 flex items-center ">
          <h1 className="text-2xl font-bold">LOGO</h1>
        </div>
        <div className="flex-1 bg-card rounded-[40px] rounded-tl-[100px] p-20">{children}</div>
      </div>
    </div>
  );
}
