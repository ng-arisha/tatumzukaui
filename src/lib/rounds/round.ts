import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

interface InitialRoundState {
    loading: 'idle' | 'pending' | 'succeeded' | 'failed';
    activeRound: RoundType | null;
}

const initialState: InitialRoundState = {
    loading: 'idle',
    activeRound: null,
}


export const getActiveRound = createAsyncThunk("rounds/active",
    async(_,{rejectWithValue})=>{
        const response = await fetch(`${BASE_URL}/round/current`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        })
        if(!response.ok){
            const errorData = await response.json();
            return rejectWithValue(errorData.message || "Fetching active round failed")
        }
        const result = await response.json();
        return result;
    }
)


const roundSlice = createSlice({
    name: 'rounds',
    initialState,
    reducers: {
        setActiveRound:(state,action:PayloadAction<RoundType>)=>{
            state.activeRound = action.payload;
        }
    },
    extraReducers: (builder) => {
        // handle active round
        
        builder .addCase(getActiveRound.pending,(state)=>{
            state.loading = 'pending';
        })
        builder .addCase(getActiveRound.fulfilled,(state,action)=>{
            state.loading = 'succeeded';
            state.activeRound = action.payload;
            console.log('Active round fetched:', action.payload);
        })
        builder  .addCase(getActiveRound.rejected,(state,action)=>{
            state.loading = 'failed';
            state.activeRound = null;
        })


    }
})

export default roundSlice.reducer;
export const {setActiveRound} = roundSlice.actions;