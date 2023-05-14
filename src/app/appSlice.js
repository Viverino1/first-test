import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  topics: [],
  cards: [],
  topic: "",
  refreshCardsData: true,
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setTopics(state, action){
        for(let i = 0; i < action.payload.length; i++){
            state.topics[i] = action.payload[i];
        }
        
    },
    setTopic(state, action){
        state.topic = action.payload;
    },
    setCards(state, action){
        for(let i = 0; i < action.payload.length; i++){
            state.cards[i] = action.payload[i];
        }
    },
    refreshCards(state, action){
        state.refreshData = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setTopic, setTopics, setCards, refreshCards } = appSlice.actions;

export default appSlice.reducer;