import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

interface InitialRoundState {
  loading: "idle" | "pending" | "succeeded" | "failed";
  activeRound: RoundType | null;
  activePickThree: RoundType | null;
  activePickFour: RoundType | null;
  activePickFive: RoundType | null;
  
  rounds: RoundType[];
  pickThreeRounds: RoundType[];
  pickFourRounds: RoundType[];
  pickFiveRounds: RoundType[];
  loadingRounds: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: InitialRoundState = {
  loading: "idle",
  activeRound: null,
  rounds: [],
  loadingRounds: "idle",
  activePickThree: null,
  activePickFour: null,
  activePickFive: null,
 
  pickThreeRounds: [],
  pickFourRounds: [],
  pickFiveRounds: [],
};

export const getActiveRound = createAsyncThunk(
  "rounds/active",
  async (_, { rejectWithValue }) => {
    const response = await fetch(`${BASE_URL}/round/current`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      return rejectWithValue(
        errorData.message || "Fetching active round failed"
      );
    }
    const result = await response.json();
    return result;
  }
);

export const getPickThreeActiveRound = createAsyncThunk(
  "rounds/pickThreeActive",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/round/active-pick-three`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(
          errorData.message || "Fetching pick three active round failed"
        );
      }
      const result = await response.json();
      return result;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const getPickFourActiveRound = createAsyncThunk(
  "rounds/pickFourActive",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/round/active-pick-four`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(
          errorData.message || "Fetching pick four active round failed"
        );
      }
      const result = await response.json();
      return result;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const getActivePickFiveRound = createAsyncThunk(
  "rounds/pickFiveActive",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/round/active-pick-five`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(
          errorData.message || "Fetching pick five active round failed"
        );
      }
      const result = await response.json();
      return result;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);









export const getFirstTenRounds = createAsyncThunk(
  "rounds/getFirstTen",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/round/first-ten`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Fetching rounds failed");
      }
      const result = await response.json();
      return result;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
export const getFirstTenPickThreeRounds = createAsyncThunk(
  "rounds/getFirstTenPickThree",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/round/first-ten-pick-three`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Fetching rounds failed");
      }
      const result = await response.json();
      return result;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const getFirstTenPickFourRounds = createAsyncThunk(
  "rounds/getFirstTenPickFour",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/round/first-ten-pick-four`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Fetching rounds failed");
      }
      const result = await response.json();
      return result;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const getFirstTenPickFiveRounds = createAsyncThunk(
  "rounds/getFirstTenPickFive",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/round/first-ten-pick-five`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Fetching rounds failed");
      }
      const result = await response.json();
      return result;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

const roundSlice = createSlice({
  name: "rounds",
  initialState,
  reducers: {
    setActiveRound: (state, action: PayloadAction<RoundType>) => {
      state.activeRound = action.payload;
    },
    setFirstTenRounds: (state, action: PayloadAction<RoundType[]>) => {
      state.rounds = action.payload;
    },
    setPickThreeActiveRound: (state, action: PayloadAction<RoundType>) => {
      state.activePickThree = action.payload;
    },
    setPickFourActiveRound: (state, action: PayloadAction<RoundType>) => {
      state.activePickFour = action.payload;
    },
    setPickFiveActiveRound: (state, action: PayloadAction<RoundType>) => {
      state.activePickFive = action.payload;
    },
    

    // set other first ten rounds
    setFirstTenPickThreeRounds: (state, action: PayloadAction<RoundType[]>) => {
      state.pickThreeRounds = action.payload;
    },
    setFirstTenPickFourRounds: (state, action: PayloadAction<RoundType[]>) => {
      state.pickFourRounds = action.payload;
    },
    setFirstTenPickFiveRounds: (state, action: PayloadAction<RoundType[]>) => {
      state.pickFiveRounds = action.payload;
    },
  },
  extraReducers: (builder) => {
    // handle active round

    builder.addCase(getActiveRound.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(getActiveRound.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.activeRound = action.payload;
      console.log("Active round fetched:", action.payload);
    });
    builder.addCase(getActiveRound.rejected, (state, action) => {
      state.loading = "failed";
      state.activeRound = null;
    });
    // handle first ten rounds
    builder.addCase(getFirstTenRounds.pending, (state) => {
      state.loadingRounds = "pending";
    });
    builder.addCase(getFirstTenRounds.fulfilled, (state, action) => {
      state.loadingRounds = "succeeded";
      state.rounds = action.payload;
    });
    builder.addCase(getFirstTenRounds.rejected, (state) => {
      state.loadingRounds = "failed";
      state.rounds = [];
    });
    // handle pick three active round
    builder.addCase(getPickThreeActiveRound.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(getPickThreeActiveRound.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.activePickThree = action.payload;
      console.log("Active round fetched:", action.payload);
    });
    builder.addCase(getPickThreeActiveRound.rejected, (state) => {
      state.loading = "failed";
      state.activePickThree = null;
    });

    // handle pick four active round
    builder.addCase(getPickFourActiveRound.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(getPickFourActiveRound.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.activePickFour = action.payload;
      console.log("Active round fetched:", action.payload);
    });
    builder.addCase(getPickFourActiveRound.rejected, (state) => {
      state.loading = "failed";
      state.activePickFour = null;
    });

    // handle pick five active round
    builder.addCase(getActivePickFiveRound.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(getActivePickFiveRound.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.activePickFive = action.payload;
      console.log("Active round fetched:", action.payload);
    });
    builder.addCase(getActivePickFiveRound.rejected, (state) => {
      state.loading = "failed";
      state.activePickFive = null;
    });

   

   

    // handle first ten pick three rounds
    builder.addCase(getFirstTenPickThreeRounds.pending, (state) => {
      state.loadingRounds = "pending";
    });
    builder.addCase(getFirstTenPickThreeRounds.fulfilled, (state, action) => {
      state.loadingRounds = "succeeded";
      state.pickThreeRounds = action.payload;
    });
    builder.addCase(getFirstTenPickThreeRounds.rejected, (state) => {
      state.loadingRounds = "failed";
      state.pickThreeRounds = [];
    });
    // handle first ten pick four rounds
    builder.addCase(getFirstTenPickFourRounds.pending, (state) => {
      state.loadingRounds = "pending";
    });
    builder.addCase(getFirstTenPickFourRounds.fulfilled, (state, action) => {
      state.loadingRounds = "succeeded";
      state.pickFourRounds = action.payload;
    });
    builder.addCase(getFirstTenPickFourRounds.rejected, (state) => {
      state.loadingRounds = "failed";
      state.pickFourRounds = [];
    });
    // handle first ten pick five rounds
    builder.addCase(getFirstTenPickFiveRounds.pending, (state) => {
      state.loadingRounds = "pending";
    });
    builder.addCase(getFirstTenPickFiveRounds.fulfilled, (state, action) => {
      state.loadingRounds = "succeeded";
      state.pickFiveRounds = action.payload;
    });
    builder.addCase(getFirstTenPickFiveRounds.rejected, (state) => {
      state.loadingRounds = "failed";
      state.pickFiveRounds = [];
    });
  },
});

export default roundSlice.reducer;
export const {
  setActiveRound,
  setFirstTenRounds,
  setPickThreeActiveRound,
  setPickFourActiveRound,
  setPickFiveActiveRound,
 
  setFirstTenPickThreeRounds,
  setFirstTenPickFourRounds,
  setFirstTenPickFiveRounds,
} = roundSlice.actions;
