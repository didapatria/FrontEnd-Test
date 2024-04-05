import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UIState } from "@/redux/types";

const initialState: UIState = {
  show: false,
}

const UISlice = createSlice({
  name: 'dataList',
  initialState,
  reducers: {
    setShow: (state, action: PayloadAction<boolean>) => {
      state.show = action.payload;
    },
  },
});

export const {
  setShow
} = UISlice.actions;

export default UISlice.reducer;