"use client";

import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "./ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

declare global {
  interface Window {
    luckysheet: any;
  }
}

export default function Luckysheet({ id }: { id: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sheetData, setSheetData] = useState<any>(null);
  const lsRef = useRef<any>(null); 
  const [sheetTitle, setSheetTitle] = useState("");
  const [isReady, setIsReady] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState("Loading resources...");
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  // Load sheet data
  useEffect(() => {
    const loadSheetData = async () => {
      try {
        setLoadingStatus("Loading sheet data...");
        const res = await fetch(`/api/sheets/${id}`);
        if (res.ok) {
          const json = await res.json();
          setSheetData(json);
          setSheetTitle(json?.title || "New Sheet");
        } else {
          setSheetData({ data: [], title: "New Sheet" });
          setSheetTitle("New Sheet");
        }
      } catch (err) {
        setSheetData({ data: [], title: "New Sheet" });
        setSheetTitle("New Sheet");
      }
    };

    loadSheetData();
  }, [id]);

  // Load and initialize Luckysheet
  useEffect(() => {
    if (!sheetData) return;

    let cleanup = false;

    const initializeLuckysheet = async () => {
      try {
        setLoadingStatus("Loading Luckysheet resources...");

        // Load CSS files
        const cssFiles = [
          "https://cdn.jsdelivr.net/npm/luckysheet@latest/dist/plugins/css/pluginsCss.css",
          "https://cdn.jsdelivr.net/npm/luckysheet@latest/dist/plugins/plugins.css", 
          "https://cdn.jsdelivr.net/npm/luckysheet@latest/dist/css/luckysheet.css",
          "https://cdn.jsdelivr.net/npm/luckysheet@latest/dist/assets/iconfont/iconfont.css"
        ];

        // Only load CSS if not already loaded
        for (const cssFile of cssFiles) {
          if (cleanup) return;
          
          const existingLink = document.querySelector(`link[href="${cssFile}"]`);
          if (!existingLink) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = cssFile;
            document.head.appendChild(link);
          }
        }

        setLoadingStatus("Loading Luckysheet scripts...");

        // Load JavaScript files
        const loadScript = (src: string, id: string): Promise<void> => {
          return new Promise((resolve, reject) => {
            if (cleanup) return reject();

            // Check if script already exists
            const existingScript = document.getElementById(id);
            if (existingScript) {
              resolve();
              return;
            }

            const script = document.createElement('script');
            script.id = id;
            script.src = src;
            script.onload = () => resolve();
            script.onerror = () => reject(new Error(`Failed to load: ${src}`));
            document.head.appendChild(script);
          });
        };

        // Load scripts in sequence
        await loadScript(
          "https://cdn.jsdelivr.net/npm/luckysheet@latest/dist/plugins/js/plugin.js",
          "luckysheet-plugin"
        );
        
        if (cleanup) return;
        
        await loadScript(
          "https://cdn.jsdelivr.net/npm/luckysheet@latest/dist/luckysheet.umd.js", 
          "luckysheet-main"
        );

        if (cleanup) return;

        // Wait for scripts to initialize
        let attempts = 0;
        while (!window.luckysheet && attempts < 50) {
          await new Promise(resolve => setTimeout(resolve, 100));
          attempts++;
        }

        if (!window.luckysheet) {
          throw new Error("Luckysheet failed to initialize");
        }

        setLoadingStatus("Initializing spreadsheet...");

        // Prepare cell data
        const savedCelldata = sheetData?.data?.length > 0
          ? sheetData.data.map((cell: any) => ({
              r: cell.row - 1,
              c: cell.col - 1,
              v: {
                v: cell.value,
                m: String(cell.value),
                ct: { fa: "General", t: "g" },
              },
            }))
          : [];

        // Clear and prepare container
        if (containerRef.current) {
          containerRef.current.innerHTML = "";
          containerRef.current.style.position = "relative";
          containerRef.current.style.width = "100%";
          containerRef.current.style.height = "100%";
        }

        // Destroy any existing instance
        try {
          if (window.luckysheet.destroy) {
            window.luckysheet.destroy();
          }
        } catch (e) {
          // Ignore
        }

        // Configuration for maximum interactivity
        const config = {
          container: "luckysheet",
          lang: "en",
          
          // Core editing permissions
          allowEdit: true,
          allowUpdate: true,
          allowCopy: false,
          allowCut: true,
          
          // UI elements
          showtoolbar: true,
          showinfobar: true,
          showsheetbar: true,
          showstatisticBar: true,
          showRowBar: true,
          showColumnBar: true,
          
          // Additional permissions
          enableAddRow: true,
          enableAddCol: true,
          enableContextMenu: true,
          
          // Make sure these are enabled
          cellRightClickConfig: {
            copy: false,
            copyAs: false,
            paste: false,
            insertRow: true,
            insertColumn: true,
            deleteRow: true,
            deleteColumn: true,
            deleteCell: true,
            hideRow: true,
            hideColumn: true,
            rowHeight: true,
            columnWidth: true,
            clear: true,
            matrix: true,
            sort: true,
            filter: true,
            chart: true,
            image: true,
            link: true,
            data: true,
            cellFormat: true
          },
          
          // Data
          data: [{
            name: sheetData.title || "Sheet1",
            row: 100,
            column: 26,
            celldata: savedCelldata,
            status: 1,
          }],

          // Event hooks
          hook: {
            workbookCreateAfter: function() {
              if (cleanup) return;
              // console.log("✅ Workbook created");
              
              lsRef.current = window.luckysheet;
              
              // Additional setup for interactivity
              setTimeout(() => {
                // Ensure the spreadsheet is focusable and interactive
                const container = document.getElementById('luckysheet');
                if (container) {
                  container.setAttribute('tabindex', '0');
                  
                  // Find the main canvas/table element and ensure it's interactive
                  const canvas = container.querySelector('canvas');
                  const table = container.querySelector('.luckysheet-cell-main');
                  
                  // if (canvas) {
                  //   canvas.style.pointerEvents = 'auto';
                  // }
                  // if (table) {
                  //   table.style.pointerEvents = 'auto';
                  // }
                  
                  // Force focus
                  container.focus();
                  
                  // console.log("✅ Spreadsheet setup complete and interactive");
                }
                
                setIsReady(true);
                setLoadingStatus("");
              }, 500);
            },

            cellEditBefore: function(range: any) {
              // console.log("📝 Cell edit initiated:", range);
              return true;
            },

            cellEditAfter: function(range: any) {
              // console.log("✏️ Cell edit completed:", range);
            },

            cellUpdateBefore: function(r: number, c: number, value: any) {
              // console.log("🔄 Cell updating:", { r, c, value });
              return true;
            },

            cellUpdateAfter: function(r: number, c: number, oldValue: any, newValue: any) {
              // console.log("✅ Cell updated:", { r, c, oldValue, newValue });
            },

            cellMousedown: function(cell: any, postion: any, sheetFile: any, ctx: any) {
              // console.log("🖱️ Cell mouse down:", cell);
            },

            cellClick: function(cell: any, postion: any, sheetFile: any, ctx: any) {
              // console.log("👆 Cell clicked:", cell);
            }
          }
        };

        // console.log("🚀 Creating Luckysheet with config");
        
        // Create with a small delay to ensure DOM is ready
        setTimeout(() => {
          if (!cleanup) {
            window.luckysheet.create(config);
          }
        }, 100);

      } catch (error) {
        console.error("❌ Initialization error:", error);
        setError(String(error));
        setLoadingStatus("");
      }
    };

    initializeLuckysheet();

    return () => {
      cleanup = true;
      if (lsRef.current?.destroy) {
        try {
          lsRef.current.destroy();
        } catch (e) {
          // Ignore
        }
      }
    };
  }, [sheetData]);

  // Save function
  const saveSheet = async () => {
    const ls = lsRef.current;
    if (!ls) {
      toast.error("Spreadsheet not ready");
      return;
    }

    try {
      if (ls.exitEditMode) {
        ls.exitEditMode();
      }

      const allSheets = ls.getAllSheets();
      const sheet = allSheets?.[0];
      if (!sheet) {
        toast.error("No data to save");
        return;
      }

      const rawData = sheet.data || [];
      const extracted: { row: number; col: number; value: any }[] = [];

      rawData.forEach((row: any[], rowIndex: number) => {
        if (row) {
          row.forEach((cell, colIndex) => {
            if (cell && cell.v !== null && cell.v !== undefined && cell.v !== "") {
              extracted.push({
                row: rowIndex + 1,
                col: colIndex + 1,
                value: cell.v,
              });
            }
          });
        }
      });

      toast.loading("Saving...", { id: "save" });
      
      const response = await fetch(`/api/sheets/${id}`, {
        method: "PUT",
        body: JSON.stringify({ title: sheetTitle, data: extracted }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        toast.success("Saved!", { id: "save" });
        setTimeout(() => router.back(), 1000);
      } else {
        throw new Error("Save failed");
      }
    } catch (err) {
      toast.error("Save failed", { id: "save" });
    }
  };

  const closeSheet = () => {
    if (lsRef.current?.exitEditMode) {
      lsRef.current.exitEditMode();
    }
    router.back();
  };

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="text-red-500 mb-4">Error: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex flex-col relative">
      {/* Header - Fixed height */}
      <div className="h-14 flex justify-between items-center px-4 border-b bg-white z-50 flex-shrink-0 absolute top-0 left-0 right-0 pl-20 pr-10">
        <Button variant="ghost" onClick={closeSheet}>
          <ChevronLeft className="w-5 h-5" />
        </Button>
        
        <input
          type="text"
          value={sheetTitle}
          onChange={(e) => setSheetTitle(e.target.value)}
          className="border px-3 py-1 rounded text-center"
          disabled={!isReady}
        />
        
        <button
          onClick={saveSheet}
          disabled={!isReady}
          className="bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white px-4 py-2 rounded"
        >
          Save
        </button>
      </div>

      {/* Spreadsheet - Takes remaining space */}
      <div className="flex-1 relative">
        <div
          ref={containerRef}
          id="luckysheet"
          className="absolute inset-0"
          style={{ 
            width: '100%', 
            height: '100%',
            minHeight: '300px'
          }}
        />
        
        {!isReady && (
          <div className="absolute inset-0 bg-white flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p>{loadingStatus}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}