import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { DataList, DataListState } from "@/redux/types";
import axios from "axios";
import slugify from "slugify";

export const fetchDataList = createAsyncThunk(
  'dataList/fetchDataList',
  async () => {
    const apiUrl = "http://103.183.75.112/api/directory/dataList";
    try {
        const response = await axios(apiUrl, {
        method: "GET",
      });
      if (response.status !== 200) {
        throw new Error(
          `HTTP error!
          status: ${response.status}
          message: ${response.statusText}`
        );
      }
      const dataList: DataList = await response.data;
      return dataList?.data;
    } catch (error: { name: string, message: string } | any) {
      if (error.name === 'AbortError') {
        console.log('Network error:', error.message);
      } else if (error.name === 'Error' && error.message.includes('429')) {
        console.log('Rate limit exceeded. Please try again later.');
      } else {
        console.log('Unexpected error:', error.message);
      }
      throw error;
    }
  }
);

export const generateSlug = (data: string): string => {
  const slug = slugify(data, { replacement: '-', lower: true });
  return slug;
}

const initialState: DataListState = {
  dataList: [],
  loading: true,
  error: ""
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
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchDataList.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchDataList.fulfilled, (state, action: PayloadAction<DataList> | any) => {
      state.dataList = action.payload;
      state.loading = false;
      setDataList(state.dataList);
    })
    .addCase(fetchDataList.rejected, (state, action) => {
      state.error = "Error fetching data: " + action.error.message || "Unknown error";
      state.loading = false;
      setError(state.error);
    });
  },
});

export const {
  setDataList,
  setLoading,
  setError
} = dataListSlice.actions;

export default dataListSlice.reducer;