import { createSlice, configureStore } from '@reduxjs/toolkit';

// Define the initial state based on the entityState interface
interface entityState { isBusinessOwner: boolean; isCustomer: boolean; } 

const initialState: entityState = {
  isBusinessOwner: false,
  isCustomer: false,
};

// Create the entitySlice using createSlice
const entitySlice = createSlice({
  name: 'entity',
  initialState,
  reducers: {
    setBusinessOwner: (state, action) => {
      state.isBusinessOwner = action.payload;
    },
    setCustomer: (state, action) => {
      state.isCustomer = action.payload;
    },
  },
});

// Extract the action creators from the entitySlice
export const { setBusinessOwner, setCustomer } = entitySlice.actions;

// Define the RootState type
export type RootState = {
  entity: entityState;
};

// Create the Redux store
const store = configureStore({
  reducer: {
    entity: entitySlice.reducer,
  },
});

// Export the store
export default store;