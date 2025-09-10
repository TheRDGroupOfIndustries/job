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

registerLicense(process.env.NEXT_PUBLIC_SYNCFUSION_KEY!);

export default function Home() {
  let spreadsheet!: SpreadsheetComponent;
  const boldRight: CellStyleModel = { fontWeight: "bold", textAlign: "right" };
  const bold: CellStyleModel = { fontWeight: "bold" };

  function onCreated(): void {
    spreadsheet.cellFormat(
      { fontWeight: "bold", textAlign: "center", verticalAlign: "middle" },
      "A1:F1"
    );
    spreadsheet.numberFormat("$#,##0.00", "F2:F31");
  }

  return (
    <div className="w-[calc(100vw-400px)] h-[600px] mx-auto pl-10">
      <SpreadsheetComponent
        height="100%"
        width="100%"
        openUrl="https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/open"
        allowOpen={true}
        saveUrl="https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/save"
        allowSave={true}
        ref={(Obj: any) => {
          spreadsheet = Obj as SpreadsheetComponent;
        }}
        created={onCreated}
      >
        <SheetsDirective>
          <SheetDirective name="Car Sales Report">
            <RangesDirective>
              <RangeDirective dataSource={defaultData}></RangeDirective>
            </RangesDirective>
            <RowsDirective>
              <RowDirective index={30}>
                <CellsDirective>
                  <CellDirective
                    index={4}
                    value="Total Amount:"
                    style={boldRight}
                  />
                  <CellDirective formula="=SUM(F2:F30)" style={bold} />
                </CellsDirective>
              </RowDirective>
            </RowsDirective>
            <ColumnsDirective>
              <ColumnDirective width={180} />
              <ColumnDirective width={130} />
              <ColumnDirective width={130} />
              <ColumnDirective width={180} />
              <ColumnDirective width={130} />
              <ColumnDirective width={120} />
            </ColumnsDirective>
          </SheetDirective>
        </SheetsDirective>
      </SpreadsheetComponent>
    </div>
  );
}
