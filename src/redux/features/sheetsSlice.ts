import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISheet } from "@/models/Sheet";

export interface SheetsState {
  sheets: ISheet[];
}

const SheetsSlice = createSlice({
    name: "sheet",
    initialState: <SheetsState>{
        sheets: [],
    },
    reducers: {
        setSheet: (state, action: PayloadAction<any>) => {
            state.sheets = action.payload
        },
        removeSheet: (state, action: PayloadAction<string>) => {
            state.sheets = state.sheets.filter((sheet) => sheet._id !== action.payload); // Assuming payload is the sheet ID
        },
    },
})

export const { setSheet, removeSheet } = SheetsSlice.actions;
export default SheetsSlice.reducer;