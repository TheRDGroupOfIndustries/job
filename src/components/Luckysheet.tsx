"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

// @ts-expect-error
import "luckysheet/dist/plugins/css/pluginsCss.css";
// @ts-expect-error
import "luckysheet/dist/plugins/plugins.css";
// @ts-expect-error
import "luckysheet/dist/css/luckysheet.css";
// @ts-expect-error
import "luckysheet/dist/assets/iconfont/iconfont.css";

import toast from "react-hot-toast";
import { Button } from "./ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Luckysheet({ id }: { id: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sheetData, setSheetData] = useState<any>(null);
  // 🛑 FIX 1: Use a ref to hold the luckysheet API/instance to ensure it's available for cleanup.
  const lsRef = useRef<any>(null); 
  const [sheetTitle, setSheetTitle] = useState("");

  const router = useRouter();

  // Load existing sheet data from API
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/api/sheets/${id}`);
        if (res.ok) {
          const json = await res.json();
          setSheetData(json);
        }
      } catch (err) {
        console.error("❌ Error loading sheet:", err);
      }
    })();
  }, [id]);

  // Init Luckysheet once script + data are ready
  useEffect(() => {
    const init = async () => {
      // Import the module
      const mod = await import("luckysheet");
      const luckysheet = (mod as any).default || mod;

      // Clear old container content
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }

      console.log("sheetData:", sheetData);
      const savedCelldata =
        sheetData?.data?.length > 0
          ? sheetData.data.map((cell: any) => ({
              r: cell.row - 1,
              c: cell.col - 1,
              v: {
                v: cell.value,
                m: cell.value,
                ct: { fa: "General", t: "g" },
              },
            }))
          : [];

      setTimeout(() => {
        luckysheet.create({
          container: "luckysheet",
          lang: "en",
          data:
            sheetData?.data?.length > 0
              ? [
                  {
                    name: sheetData.title,
                    row: 100,
                    column: 100,
                    celldata: savedCelldata,
                  },
                ]
              : [
                  {
                    name: "Sheet1",
                    row: 100,
                    column: 100,
                    celldata: [],
                  },
                ],
        });

        // 🛑 FIX 2: Store the luckysheet API object in the ref for unmount cleanup
        lsRef.current = luckysheet; 

      }, 100);
      setSheetTitle(sheetData?.title);
    };

    if (sheetData) init();
  }, [sheetData]);

  // 🛑 FIX 3: Cleanup function now correctly uses lsRef.current
  useEffect(() => {
    return () => {
      if (lsRef.current && lsRef.current.exit) {
        console.log("Luckysheet Component Unmounting: Calling luckysheet.exit()");
        // luckysheet.exit() clears the DOM elements created by the library
        lsRef.current.exit(); 
        
        // Optional: Ensure the container is truly empty
        if (containerRef.current) {
          containerRef.current.innerHTML = "";
        }
      }
    };
  }, []);

  // Save sheet data
  const saveSheet = async () => {
    // 🛑 FIX 4: Use the ref to access the luckysheet API for saving
    const ls = lsRef.current;
    if (!ls) return alert("⚠ Luckysheet not ready yet!");

    if (ls.exitEditMode) {
      ls.exitEditMode(); 
      console.log("Input committed from active cell editor.");
    }

    const data = ls.getLuckysheetfile();
    console.log("📄 Saving data:", data);

    const sheet = ls.getAllSheets()[0] as { data: any[][] }; // first sheet
    const rawData: any[][] = sheet.data;

    const extracted: { row: number; col: number; value: any }[] = [];

    rawData.forEach((row: any[], rowIndex: number) => {
      row.forEach((cell, colIndex) => {
        if (cell && cell.v !== null && cell.v !== undefined) {
          extracted.push({
            row: rowIndex + 1,
            col: colIndex + 1,
            value: cell.v,
          });
        }
      });
    });

    console.log(extracted);

    toast.loading("Saving Sheet...", { id: "sheet-save" });
    await fetch(`/api/sheets/${id}`, {
      method: "PUT",
      body: JSON.stringify({ title: sheetTitle, data: extracted }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        toast.success("Sheet Saved Successfully", { id: "sheet-save" });
        router.back()
      })
      .catch((err) => {
        toast.error("Error Saving Sheet", { id: "sheet-save" });
      });
  };

  const closeSheet = () => {
    router.back();

    const ls = lsRef.current;
    if (ls.exitEditMode) {
      ls.exitEditMode(); 
      console.log("Input committed from active cell editor.");
    }
  }

  return (
    <div className="w-full h-screen flex flex-col relative">
      {/* Header */}
      <div className="flex justify-between items-center absolute top-0 left-0 right-0 px-10 py-2 pl-20 border-b z-20 bg-card">
        <Button
          variant={"ghost"}
          onClick={closeSheet}
          className="rounded-full cursor-pointer bg-background hover:bg-background/80 transition"
        >
          <ChevronLeft className="w-8 h-8 " />
        </Button>
        <input
          type="text"
          value={sheetTitle}
          placeholder="New Sheet"
          className="border px-2 py-1 rounded text-center"
          onChange={(e) => setSheetTitle(e.target.value)}
        />
        <button
          onClick={saveSheet}
          className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer"
        >
          Save
        </button>
      </div>

      {/* Spreadsheet Container */}
      <div className="flex-1 relative"> 
        <div
          ref={containerRef}
          id="luckysheet"
          className="absolute top-0 left-0 right-0 bottom-0 h-[calc(100vh-160px)] "
          suppressHydrationWarning={true}
        />
      </div>

      {/* Scripts (must be loaded in order) */}
      <Script
        src="https://cdn.jsdelivr.net/npm/luckysheet@latest/dist/plugins/js/plugin.js"
        strategy="afterInteractive"
      />
      <Script
        src="https://cdn.jsdelivr.net/npm/luckysheet@latest/dist/luckysheet.umd.js"
        strategy="afterInteractive"
        onReady={() => console.log("✅ Luckysheet script loaded")}
      />
    </div>
  );
}