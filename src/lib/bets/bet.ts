import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookie from "js-cookie";
import toast from "react-hot-toast";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
interface InitialBetTye {
    loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: InitialBetTye = {
    loading: 'idle',
    
}

export const placeBet = createAsyncThunk("bet/placeBet",
    async(data:{roundId:string,guess:number[],amount:number},{rejectWithValue})=>{
        try {
            const response = await fetch(`${BASE_URL}/bet/place`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    Authorization:`Bearer ${Cookie.get("token")}`
                },
                body:JSON.stringify(data)
            });
            if(!response.ok){
                const errorData = await response.json();
                return  rejectWithValue(errorData.message || "Placing bet failed");
            }
            const result = await response.json();
            return result;
        } catch (error) {
            return rejectWithValue(`Placing bet failed: ${error}`);
            
        }

    }
)

const betSlice = createSlice({
    name: 'bet',
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        // handle place bet
        builder.addCase(placeBet.pending,(state)=>{
            state.loading = 'pending';
        })
        builder.addCase(placeBet.fulfilled,(state)=>{
            state.loading = 'succeeded';
            toast.success("Bet placed successfully");
        })
        builder.addCase(placeBet.rejected,(state,{payload})=>{
            state.loading = 'failed';
            toast.error(`Placing bet failed: ${payload}`);
        })
    }
})

export default betSlice.reducer;
export const {} = betSlice.actions;