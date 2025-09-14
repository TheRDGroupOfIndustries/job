"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

// ✅ Import Luckysheet styles
import "luckysheet/dist/plugins/css/pluginsCss.css";
import "luckysheet/dist/plugins/plugins.css";
import "luckysheet/dist/css/luckysheet.css";
import "luckysheet/dist/assets/iconfont/iconfont.css";

export default function Luckysheet({ id }: { id: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sheetData, setSheetData] = useState<any>(null);
  const [ls, setLs] = useState<any>(null); // ✅ keep luckysheet instance

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
      const mod = await import("luckysheet");
      const luckysheet = (mod as any).default || mod;

      // Clear old container content
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }

      console.log("sheetData:", sheetData);
      const savedCelldata = sheetData?.data?.length > 0 ? sheetData.data.map((cell: any) => ({
        r: cell.row - 1, // Luckysheet is 0-indexed
        c: cell.col - 1,
        v: {
          v: cell.value, // raw value
          m: cell.value, // display value
          ct: { fa: "General", t: "g" }, // cell type
        },
      })) : [];
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

        setLs(luckysheet); // ✅ store instance
      }, 100);
    };

    if (sheetData) init();
  }, [sheetData]);

  // Save sheet data
  const saveSheet = async () => {
    if (!ls) return alert("⚠ Luckysheet not ready yet!");

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

    await fetch(`/api/sheets/${id}`, {
      method: "PUT",
      body: JSON.stringify({ title: data[0].name, data: extracted }),
      headers: { "Content-Type": "application/json" },
    });
    alert("✅ Sheet saved");
  };

  return (
    <div className="w-full h-screen flex flex-col">
      {/* Header */}

      {/* Spreadsheet Container */}
      <div className="flex-1 relative">
      <div className="flex justify-between items-center absolute top-0 left-0 right-0 px-10 py-2 pl-20 border-b z-20 bg-card">
        <h1 className="font-bold capitalize">{sheetData?.title ?? "Untitled Sheet"}</h1>
        <button
          onClick={saveSheet}
          className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer"
        >
          Save
        </button>
      </div>
        <div
          ref={containerRef}
          id="luckysheet"
          className="absolute top-0 left-0 right-0 bottom-0"
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
