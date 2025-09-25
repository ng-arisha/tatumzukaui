import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookie from "js-cookie";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

interface InitialPaymentState {
    loading: "idle" | "pending" | "succeeded" | "failed";
    userPayments: PaymentType[];
}

const initialState: InitialPaymentState = {
    loading: "idle",
    userPayments: [],
}


export const getUserPayments = createAsyncThunk("payment/userpayments",
    async(_,{rejectWithValue})=>{
        const response = await fetch(`${BASE_URL}/payment/history`,{
            method:"GET",
            headers:{
                "content-type":"application/json",
                Authorization: `Bearer ${Cookie.get("token")}`
            }
        });
        if(!response.ok){
            const errorResponse = await response.json();
            return rejectWithValue(errorResponse.message);
        }
        const data = await response.json();
        return data;

    }
)


const paymentSlice = createSlice({
    name:'payment',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{

        // get user payments
        builder.addCase(getUserPayments.pending,(state)=>{
            state.loading = "pending";
        });
        builder.addCase(getUserPayments.fulfilled,(state,action)=>{
            state.loading = "succeeded";
            state.userPayments = action.payload;
        });
        builder.addCase(getUserPayments.rejected,(state)=>{
            state.loading = "failed";
        });
    }
})

export default paymentSlice.reducer;
export const {} = paymentSlice.actions;