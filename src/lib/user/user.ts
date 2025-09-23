import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookie from "js-cookie";

interface InitialUserState {
  loading: "idle" | "pending" | "succeeded" | "failed";
  wallet: WalletType | null;
}

const initialState: InitialUserState = {
  loading: "idle",
  wallet: null,
};
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const getUserBalance = createAsyncThunk(
  "user/getUserBalance",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/user/balance`, {
        method: "GET",
        headers: {
          "content-Type": "application/json",
          Authorization: `Bearer ${Cookie.get("token")}`,
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(
          errorData.message || "Fetching user balance failed"
        );
      }
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(`Fetching user balance failed: ${error}`);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // handle get user balance
    builder.addCase(getUserBalance.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(getUserBalance.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.wallet = action.payload;
    });
    builder.addCase(getUserBalance.rejected, (state, { payload }) => {
      state.loading = "failed";
      state.wallet = null;
      console.error(payload);
    });
  },
});

export default userSlice.reducer;
export const {} = userSlice.actions;
