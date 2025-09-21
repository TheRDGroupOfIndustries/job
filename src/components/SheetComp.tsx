"use client";

import { useEffect, useState, JSX } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader } from "./ui/card";
import { ArrowUpRight, Plus, FileText, Trash } from "lucide-react";
import { Button } from "./ui/button";
import { removeSheet, setSheet } from "@/redux/features/sheetsSlice";
import { ISheet } from "@/models/Sheet";
import toast from "react-hot-toast";
import axios from "axios";

const FileCard = ({
  sheet,
  role,
}: {
  sheet: any;
  role: string | undefined;
}) => { 
  const dispatch = useDispatch()
  const handleDeleteSheet = async (id: string) => {
    toast.loading("Deleting Sheet...", {id: "deleting-sheet"})
    try {
      const res = await fetch(`/api/sheets/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (res.ok) { 
        console.log("Sheet Deleted Successfully.");
        dispatch(removeSheet(id))
        toast.success("Sheet Deleted Successfully.", {id: "deleting-sheet"})
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete sheet!", {id: "deleting-sheet"})
    }
  };


  return (
    <Card className="max-w-xs w-full h-[350px] overflow-hidden rounded-xl border border-gray-200  bg-card hover:bg-background shadow-badge transition-all duration-300 hover:shadow-xl hover:border-primary-500 border-none">
      <CardHeader className="flex items-center justify-center pt-8 pb-4">
        <FileText size={100} className="text-primary" />
      </CardHeader>
      <CardContent className="p-4 flex-1 flex flex-col justify-end">
        <div className="flex flex-col items-center space-y-2 mt-4">
          <h2 className="text-xl font-semibold truncate w-full text-center capitalize">
            {sheet.title}
          </h2>
          <div className="flex items-center gap-4">
            <Link
              href={`/${role}/sheets/${sheet._id}`}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white shadow-lg group hover:scale-110 transition-all duration-300"
            >
              <ArrowUpRight size={24} />
            </Link>
            <button
              onClick={() => handleDeleteSheet(sheet._id)}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white shadow-lg group hover:scale-110 transition-all duration-300 cursor-pointer"
            >
              <Trash size={24} />
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default function Sheet() {
  const { userData } = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const { sheets } = useSelector((state: RootState) => state.sheet);
  const dispatch = useDispatch()

  useEffect(() => {
    fetch("/api/sheets")
      .then((res) => res.json())
      .then(res => dispatch(setSheet(res)));
  }, []);

  const handleNewSheet = async () => {
    const req = await axios.post("/api/sheets", { title: "New Sheet", createdBy: userData?._id })
    if (req.status === 200) {
      const sheet = req.data;
      console.log(req);
      router.push(`/${userData?.role}/sheets/${sheet._id}`);
    }
  };

  return (
    <div className="flex-1 h-[calc(100vh-80px)] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pl-20 my-10 pr-10 overflow-y-auto custom-scrollbar">
      {/* New File Card */}
      <div
        onClick={handleNewSheet}
        className="max-w-xs w-full h-[350px] rounded-xl border-2 border-dashed border-gray-400 p-4 bg-transparent hover:bg-gray-100  duration-200 transition-all shadow-none flex flex-col justify-center items-center cursor-pointer"
      >
        <Plus size={100} className="text-gray-400 " />
        <span className="text-gray-400  text-3xl font-bold">New Sheet</span>
      </div>

      {/* Existing File Cards */}
      {sheets.length > 0 && sheets.map((s: ISheet) => ( 
        <FileCard key={s._id} sheet={s} role={userData?.role} />
      ))}
    </div>
  );
}
