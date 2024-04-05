import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DataList, DataListState } from "@/redux/types";

const initialState: DataListState = {
  dataList: [],
  loading: true,
};

const dataListSlice = createSlice({
  name: 'dataList',
  initialState,
  reducers: {
    setDataList: (state, action: PayloadAction<DataList[]>) => {
      state.dataList = action.payload;
      state.loading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setDataList, setLoading } = dataListSlice.actions;
export default dataListSlice.reducer;