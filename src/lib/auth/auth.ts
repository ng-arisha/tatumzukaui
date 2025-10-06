import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookie from "js-cookie";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
interface InitalStateType {
  IsLoading: "idle" | "pending" | "succeeded" | "failed";
  token: string | null;
  user: CustomeJwtPayload | null;
}
const initialState: InitalStateType = {
  IsLoading: "idle",
  token: null,
  user: null,
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
  reducers: {
    logout: (state) => {
      state.token = null;
      Cookie.remove("token");
      toast.success("Logged out successfully");
    },

    resetLoading: (state) => {
      state.IsLoading = "idle";
    },

    setUserFromToken: (state) => {
      const token = state.token;
      if(token){
        try {
          const decodedToken = jwtDecode<CustomeJwtPayload>(token);
          state.user = decodedToken;
          
        } catch (error) {
          state.user = null;
        }
      }

    }
  },
  extraReducers: (builder) => {
    // handleregister
    builder.addCase(register.pending, (state) => {
      state.IsLoading = "pending";
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.IsLoading = "succeeded";
      state.token = action.payload.token;

      toast.success("Registration successful");
    });
    builder.addCase(register.rejected, (state, action) => {
      state.IsLoading = "failed";
      state.token = null;
      console.log("Registration error:", action.payload);
      toast.error(`an error occured:${action.payload}`);
    });
    // handle login
    builder.addCase(login.pending, (state) => {
      state.IsLoading = "pending";
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.IsLoading = "succeeded";
      state.token = action.payload.access_token;
      Cookie.set("token", action.payload.access_token, { expires: 1 }); // Expires in 1 day
      toast.success("Login successful");
    });
    builder.addCase(login.rejected, (state, { payload }) => {
      state.IsLoading = "failed";
      state.token = null;
      console.log("Login error:", payload);
      toast.error(`an error occured:${payload}`);
    });
  },
});

export default authSlice.reducer;
export const { logout,setUserFromToken,resetLoading } = authSlice.actions;
