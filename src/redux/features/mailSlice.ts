// src/redux/features/counterSlice.ts
import { dummyMails } from "@/lib/Dummy/mails";
import { Mail } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MailState {
  mails: Mail[] | [];
  selectedMail: string[] | [];
}

const initialState: MailState = {
  mails: dummyMails || [],
  selectedMail: [],
};

const mailSlice = createSlice({
  name: "mail",
  initialState,
  reducers: {
    // Define your reducers here
    toggleMailSelection: (state, action: PayloadAction<string>) => {
      const mailId: string = action.payload;
      const index = state.selectedMail.indexOf(mailId as never);
      if (index === -1) {
        state.selectedMail.push(mailId as never);
      } else {
        state.selectedMail.splice(index, 1);
      }
    },
    deleteSelectedMails: (state) => {
      state.mails = state.mails.filter(
        (mail) => !state.selectedMail.includes(mail.id as never)
      );
      state.selectedMail = [];
    },
  },
});

export const { toggleMailSelection, deleteSelectedMails } = mailSlice.actions;
export default mailSlice.reducer;
