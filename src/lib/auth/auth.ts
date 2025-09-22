import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookie from "js-cookie";
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
interface InitalStateType {
  IsLoading: "idle" | "pending" | "succeeded" | "failed";
  token: string | null;
}
const initialState: InitalStateType = {
  IsLoading: "idle",
  token: null,
};

export const register = createAsyncThunk(
  "auth/register",
  async (data: { phone: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Registration failed");
      }
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(`Registration failed: ${error}`);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (data: { phone: string; password: string }, { rejectWithValue }) => {
    const response = await fetch(`${BASE_URL}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json();
      return rejectWithValue(errorData.message || "Login failed");
    }
    const result = await response.json();
    return result;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // handleregister
    builder.addCase(register.pending, (state) => {
      state.IsLoading = "pending";
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.IsLoading = "succeeded";
      state.token = action.payload.token;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.IsLoading = "failed";
      state.token = null;
      console.error("Registration error:", action.payload);
    });
    // handle login
    builder.addCase(login.pending, (state) => {
      state.IsLoading = "pending";
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.IsLoading = "succeeded";
      state.token = action.payload.access_token;
      Cookie.set("token", action.payload.access_token, { expires: 1 }); // Expires in 1 day
    });
    builder.addCase(login.rejected, (state, {payload}) => {
      state.IsLoading = "failed";
      state.token = null;
      console.log("Login error:", payload);
    });
  },
});

export default authSlice.reducer;
export const {} = authSlice.actions;
