import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  editCard: {},
}

export const newSlice = createSlice({
  name: 'new',
  initialState,
  reducers: {
    setEditCard(state, action){
        state.editCard = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setEditCard } = newSlice.actions;

export default newSlice.reducer;