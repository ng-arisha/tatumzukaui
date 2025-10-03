import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookie from "js-cookie";
import toast from "react-hot-toast";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
interface InitialBetTye {
    loading: 'idle' | 'pending' | 'succeeded' | 'failed';
    userBets: BetType[];
    totalPages: number;
}

const initialState: InitialBetTye = {
    loading: 'idle',
    userBets: [],
    totalPages: 0
    
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

export const getUserBets = createAsyncThunk("bet/getUserBets",
    async(data:{page?:number,limit?:number},{rejectWithValue})=>{
        const response = await fetch(`${BASE_URL}/bet/history?page=${data.page}&limit=${data.limit}`,{
            method:"GET",
            headers:{
                "content-Type":"application/json",
                Authorization:`Bearer ${Cookie.get("token")}`
            }
        });
        if(!response.ok){
            const errorData = await response.json();
            return rejectWithValue(errorData.message || "Fetching bets failed");
        }
        const result = await response.json();
        return result;
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
            // toast.success("Bet placed successfully");
        })
        builder.addCase(placeBet.rejected,(state,{payload})=>{
            state.loading = 'failed';
            toast.error(`Placing bet failed: ${payload}`);
        })

        // handle get user bets
        builder.addCase(getUserBets.pending,(state)=>{
            state.loading = 'pending';
        })
        builder.addCase(getUserBets.fulfilled,(state,action)=>{
            state.loading = 'succeeded';
            console.log(action.payload.data);
            state.userBets = action.payload.data;
            state.totalPages = action.payload.totalPages;
        }
        )
        builder.addCase(getUserBets.rejected,(state,{payload})=>{
            state.loading = 'failed';
            toast.error(`Fetching bets failed: ${payload}`);
        }
        )
    }
})

export default betSlice.reducer;
export const {} = betSlice.actions;