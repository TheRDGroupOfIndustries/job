// src/redux/features/counterSlice.ts
import { dummyMails } from "@/lib/Dummy/mails";
import { Mail } from "@/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import toast from "react-hot-toast";



interface MailState {
  mails: Mail[] | [];
  filteredMails: Mail[] | [];
  selectedMail: string[] | [];
}

const initialState: MailState = {
  mails: [],
  filteredMails: [],
  selectedMail: [],
};

export const createMail = createAsyncThunk(
  "mail/createMail",
  async (mail: Mail, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/mails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mail),
      });
      const data = await res.json();
      return data;
      
    } catch (error) {
      return rejectWithValue(error);
      
    }
  }
)

export const fetchMails = createAsyncThunk(
  "mail/fetchMails",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/mails", {
        method: "GET",
      });
      const data = await res.json();
      return data;
      
    } catch (error) {
      return rejectWithValue(error);
      
    }
  }
)

export const deleteMails = createAsyncThunk(
  "mail/deleteMails",
  async (_, { rejectWithValue, getState }) => {
    const { mail } = getState() as any;
    const mailIds = mail.selectedMail;
    // console.log(mailIds)
    try {
      const res = await fetch("/api/mails/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({mailIds})
      });

      const data = await res.json();
      return data;
      
    } catch (error) {
      return rejectWithValue(error);
      
    }
  }
)

export const deleteMail = createAsyncThunk(
  "mail/deleteMail",
  async ({ mailId }: { mailId: string }, { rejectWithValue, getState }) => {
    const mailIds = [mailId];
    // console.log(mailIds)
    try {
      const res = await fetch("/api/mails/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({mailIds})
      });

      const data = await res.json();
      return {data, mailId};
      
    } catch (error) {
      return rejectWithValue(error);
      
    }
  }
)



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
        (mail) => !state.selectedMail.includes(mail._id as never)
      );
      state.selectedMail = [];
    },
    setFilteredMails: (state, action: PayloadAction<Mail[]>) => {
      state.filteredMails = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(createMail.pending, (state) => {
      // state.loading = true;
      toast.loading("Sending Mail...", { id: "mail" });
    })
    .addCase(createMail.fulfilled, (state, action: PayloadAction<any>) => {
      state.mails.unshift(action.payload.mail as never);
      state.filteredMails.unshift(action.payload.mail as never);
      toast.success("Mail sent successfully", { id: "mail" });
    })
    .addCase(createMail.rejected, (state, action: PayloadAction<any>) => {
      // state.loading = false;
      toast.error(action.payload, { id: "mail" });
    });

    builder
    .addCase(fetchMails.pending, (state) => {
      // state.loading = true;
      // toast.loading("Fetching Mails...", { id: "mail" });
    })
    .addCase(fetchMails.fulfilled, (state, action: PayloadAction<any>) => {
      // console.log(action.payload);
      state.mails = action.payload.mails as never;
      state.filteredMails = action.payload.mails as never;
      // toast.success("Mails fetched successfully", { id: "mail" });
    })
    .addCase(fetchMails.rejected, (state, action: PayloadAction<any>) => {
      // state.loading = true;
      // toast.error("Failed to fetch mails", { id: "mail" });
    })
    builder
    .addCase(deleteMails.pending, (state) => {
      toast.loading("Deleting Mails...", { id: "deleteMail" });
    })
    .addCase(deleteMails.fulfilled, (state, action: PayloadAction<any>) => {
      state.mails = state.mails.filter(
        (mail) => !state.selectedMail.includes(mail._id as never)
      );
      state.filteredMails = state.filteredMails?.filter(
        (mail) => !state.selectedMail.includes(mail._id as never)
      );
      state.selectedMail = [];
      toast.success("Mails deleted successfully", { id: "deleteMail" });
    })
    .addCase(deleteMails.rejected, (state, action: PayloadAction<any>) => {
      toast.error("Failed to delete mails", { id: "deleteMail" });
    });
    builder
    .addCase(deleteMail.pending, (state) => {
      toast.loading("Deleting Mails...", { id: "deleteMail" });
    })
    .addCase(deleteMail.fulfilled, (state, action: PayloadAction<any>) => {
      // console.log(action.payload)
      state.mails = state.mails.filter(
        (mail) => mail._id !== action.payload.mailId
      );
      state.filteredMails = state.filteredMails?.filter(
        (mail) => mail._id !== action.payload.mailId
      );
      state.selectedMail = [];
      toast.success("Mails deleted successfully", { id: "deleteMail" });
    })
    .addCase(deleteMail.rejected, (state, action: PayloadAction<any>) => {
      toast.error("Failed to delete mails", { id: "deleteMail" });
    });
  },
});

export const { toggleMailSelection, deleteSelectedMails, setFilteredMails } = mailSlice.actions;
export default mailSlice.reducer;
