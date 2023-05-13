import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  topics: [],
  topic: "",
  cards: {},
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
    }
  },
})

// Action creators are generated for each case reducer function
export const { setTopic, setTopics } = appSlice.actions;

export default appSlice.reducer;