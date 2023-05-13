import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cards: [],
}

export const viewSlice = createSlice({
  name: 'view',
  initialState,
  reducers: {
  },
})

// Action creators are generated for each case reducer function
export const {  } = viewSlice.actions;

export default viewSlice.reducer;