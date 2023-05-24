import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  topics: [],
  publicCards: [],
  teamCards: [],
  cards: [],
  topic: "",
  isLoggedIn: false,
  showPublicCards: true,
  showTeamCards: true,
  showStarredCards: false,
  teamID: "",
  teamName: "",
  teamMembers: [],
  teamData: {
    contentions: []
  },
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
        state.cards.splice(0, state.cards.length);
        for(let i = 0; i < action.payload.length; i++){
            state.cards[i] = action.payload[i];
        }
    },
    setPublicCards(state, action){
        state.publicCards.splice(0, state.publicCards.length);
        for(let i = 0; i < action.payload.length; i++){
            state.publicCards[i] = action.payload[i];
        }
    },
    setTeamCards(state, action){
        state.teamCards.splice(0, state.teamCards.length);
        for(let i = 0; i < action.payload.length; i++){
            state.teamCards[i] = action.payload[i];
        }
    },
    setIsLoggedIn(state, action){
        state.isLoggedIn = action.payload;
    },
    setShowPublicCards(state, action){
        state.showPublicCards = action.payload;
    },
    setShowTeamCards(state, action){
        state.showTeamCards = action.payload;
    },
    setTeamID(state, action){
        state.teamID = action.payload;
    },
    setContentions(state, action){
        state.teamData.contentions.splice(0, state.teamData.contentions.length);
        for(let i = 0; i < action.payload.length; i++){
            state.teamData.contentions[i] = action.payload[i];
        }
    },
    setShowStarredCards(state, action){
        state.showStarredCards = action.payload;
    },
    setTeamData(state, action){
        state.teamData = action.payload;
    },
    addContention(state){
        state.teamData.contentions.push({name: "", subpoints: []});
    },
    addSubpoint(state, action){
        state.teamData.contentions[action.payload].subpoints.push("");
    },
    deleteContention(state, action){
        state.teamData.contentions.splice(action.payload, 1);
    },
    deleteSubpoint(state, action){
        state.teamData.contentions[action.payload.contention].subpoints.splice(action.payload.subpoint, 1);
    },
    setTeamMembers(state, action){
        state.teamMembers.splice(0, state.teamMembers.length);
        for(let i = 0; i < action.payload.length; i++){
            state.teamMembers[i] = action.payload[i];
        }
    },
    setTeamName(state, action){
        state.teamName = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const {
    setTopic,
    setTopics,
    setCards,
    refreshCards,
    setIsLoggedIn,
    setShowPublicCards,
    setShowTeamCards,
    setPublicCards,
    setTeamCards,
    setTeamID,
    setContentions,
    setShowStarredCards,
    setTeamData,
    addContention,
    addSubpoint,
    deleteContention,
    deleteSubpoint,
    setTeamMembers,
    setTeamName,
} = appSlice.actions;

export default appSlice.reducer;