import { gameVarieties } from "@/utils/utils"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface InitialVariantState {
    variants: GameVariantType[]
    variant:GameVariantType
}

const initialState: InitialVariantState = {
    variants: gameVarieties,
     variant: gameVarieties[0]
   
}


const variantSlice = createSlice({
    name: 'variants',
    initialState,
    reducers: {
        setVariant:(state,action:PayloadAction<GameVariantType>)=>{
            state.variant = action.payload
        }
    },
    extraReducers: (builder) => {
       
    }
})

export const {setVariant} = variantSlice.actions
export default variantSlice.reducer;