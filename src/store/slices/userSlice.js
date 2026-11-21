import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { MOCK_USER } from "../../constants/mockData";

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_USER);
    }, 500);
  });
});

const initialState = {
  data: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Ошибка загрузки пользователя";
      });
  },
});

export const selectUser = (state) => state.user.data;
export const selectUserLoading = (state) => state.user.loading;

export default userSlice.reducer;
