"use client";

import { defaultData } from "@/lib/Dummy/dataSource";
import {
  SpreadsheetComponent,
  SheetsDirective,
  SheetDirective,
  ColumnsDirective,
  RangesDirective,
  RangeDirective,
  RowsDirective,
  RowDirective,
  CellsDirective,
  CellDirective,
  CellStyleModel,
  ColumnDirective,
} from "@syncfusion/ej2-react-spreadsheet";
import { registerLicense } from "@syncfusion/ej2-base";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";

registerLicense(process.env.NEXT_PUBLIC_SYNCFUSION_KEY!);

export default function Home() {
  const { userData, isAutheticated } = useSelector(
      (state: RootState) => state.auth
    );

    const router = useRouter()
  // let spreadsheet!: SpreadsheetComponent;
  // const boldRight: CellStyleModel = { fontWeight: "bold", textAlign: "right" };
  // const bold: CellStyleModel = { fontWeight: "bold" };

  // function onCreated(): void {
  //   spreadsheet.cellFormat(
  //     { fontWeight: "bold", textAlign: "center", verticalAlign: "middle" },
  //     "A1:F1"
  //   );
  //   spreadsheet.numberFormat("$#,##0.00", "F2:F31");
  // }

    const [sheets, setSheets] = useState([]);

  useEffect(() => {
    fetch("/api/sheets")
      .then(res => res.json())
      .then(setSheets);
  }, []);

  return (
    // <div className=" pr-10 pl-20 py-10">
    //   <div className="w-[calc(100vw-480px)] h-[72vh]">
    //     <SpreadsheetComponent
    //       height="100%"
    //       width="100%"
    //       openUrl="https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/open"
    //       allowOpen={true}
    //       saveUrl="https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/save"
    //       allowSave={true}
    //       ref={(Obj: any) => {
    //         spreadsheet = Obj as SpreadsheetComponent;
    //       }}
    //       created={onCreated}
    //     >
    //       <SheetsDirective>
    //         <SheetDirective name="Car Sales Report">
    //           <RangesDirective>
    //             <RangeDirective dataSource={defaultData}></RangeDirective>
    //           </RangesDirective>
    //           <RowsDirective>
    //             <RowDirective index={30}>
    //               <CellsDirective>
    //                 <CellDirective
    //                   index={4}
    //                   value="Total Amount:"
    //                   style={boldRight}
    //                 />
    //                 <CellDirective formula="=SUM(F2:F30)" style={bold} />
    //               </CellsDirective>
    //             </RowDirective>
    //           </RowsDirective>
    //           <ColumnsDirective>
    //             <ColumnDirective width={180} />
    //             <ColumnDirective width={130} />
    //             <ColumnDirective width={130} />
    //             <ColumnDirective width={180} />
    //             <ColumnDirective width={130} />
    //             <ColumnDirective width={120} />
    //           </ColumnsDirective>
    //         </SheetDirective>
    //       </SheetsDirective>
    //     </SpreadsheetComponent>
    //   </div>
    // </div>
    <div className="pl-20 pr-10 my-10">
      <h1 className="text-xl font-bold">My Sheets</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4 cursor-pointer"
        onClick={async () => {
          const res = await fetch("/api/sheets", {
            method: "POST",
            body: JSON.stringify({ title: "New Sheet" }),
            headers: { "Content-Type": "application/json" },
          });
          const sheet = await res.json();
          router.push(`/${userData?.role}/sheets/${sheet._id}`)
        }}
      >
        + Create Sheet
      </button>

      <ul className="mt-6 space-y-2">
        {sheets.map((s: any) => (
          <li key={s._id} className="border p-3 rounded">
            <Link href={`/${userData?.role}/sheets/${s._id}`} className="text-blue-600 capitalize">
              {s.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
