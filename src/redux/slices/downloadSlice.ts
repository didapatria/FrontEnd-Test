import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { DownloadState } from "@/redux/types";

const initialState: DownloadState = {
  url: null,
}

const downloadSlice = createSlice({
  name: 'download',
  initialState,
  reducers: {
    downloadUrl: (state, action: PayloadAction<string>) => {
      state.url = action.payload;
    },
  },
});

export const {
  downloadUrl
} = downloadSlice.actions;

export default downloadSlice.reducer;