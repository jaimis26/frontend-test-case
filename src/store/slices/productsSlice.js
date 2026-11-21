import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { MOCK_PRODUCTS } from "../../constants/mockData";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(MOCK_PRODUCTS);
      }, 1000);
    });
  },
);

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Ошибка при загрузке товаров";
      });
  },
});

export const selectProducts = (state) => state.products.items;
export const selectProductsLoading = (state) => state.products.loading;
export const selectProductsError = (state) => state.products.error;

export default productsSlice.reducer;
