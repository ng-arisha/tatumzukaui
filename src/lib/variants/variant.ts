import { gameTypes, gameVarieties } from "@/utils/utils"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface InitialVariantState {
    variants: GameVariantType[]
    variant:GameVariantType
    games:GameType[]
    game:GameType
}

const initialState: InitialVariantState = {
    variants: gameVarieties,
     variant: gameVarieties[0],
   games:gameTypes,
    game:gameTypes[0]
}


const variantSlice = createSlice({
    name: 'variants',
    initialState,
    reducers: {
        setVariant:(state,action:PayloadAction<GameVariantType>)=>{
            state.variant = action.payload
        },
        setGame:(state,action:PayloadAction<GameType>)=>{
            state.game = action.payload
        }
    },
    extraReducers: (builder) => {
       
    }
})

export const {setVariant,setGame} = variantSlice.actions
export default variantSlice.reducer;