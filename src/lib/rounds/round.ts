import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

interface InitialRoundState {
    loading: 'idle' | 'pending' | 'succeeded' | 'failed';
    activeRound: RoundType | null;
    rounds: RoundType[];
    loadingRounds: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: InitialRoundState = {
    loading: 'idle',
    activeRound: null,
    rounds: [],
    loadingRounds: 'idle'
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

export const getFirstTenRounds = createAsyncThunk("rounds/getFirastTen",
    async(_,{rejectWithValue})=>{
        try {
            const response = await fetch(`${BASE_URL}/round/first-ten`,{
                method:"GET",
                headers:{
                    "Content-Type":"application/json"
                }
            })
            if(!response.ok){
                const errorData = await response.json();
                return rejectWithValue(errorData.message || "Fetching rounds failed")
            }
            const result = await response.json();
            return result;
            
        } catch (error) {
            rejectWithValue(error)
        }
    }
)


const roundSlice = createSlice({
    name: 'rounds',
    initialState,
    reducers: {
        setActiveRound:(state,action:PayloadAction<RoundType>)=>{
            state.activeRound = action.payload;
        },
        setFirstTenRounds:(state,action:PayloadAction<RoundType[]>)=>{
            state.rounds = action.payload;
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
        // handle first ten rounds
        builder .addCase(getFirstTenRounds.pending,(state)=>{
            state.loadingRounds = 'pending';
        }
        )
        builder .addCase(getFirstTenRounds.fulfilled,(state,action)=>{
            state.loadingRounds = 'succeeded';
            state.rounds = action.payload;
        }
        )
        builder .addCase(getFirstTenRounds.rejected,(state,action)=>{
            state.loadingRounds = 'failed';
            state.rounds = [];
        }
        )

    }
})

export default roundSlice.reducer;
export const {setActiveRound,setFirstTenRounds} = roundSlice.actions;