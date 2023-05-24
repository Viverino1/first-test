import { Routes, Route, BrowserRouter } from "react-router-dom"
import Sidebar from "./components/sidebar/Sidebar";

import View from "../pages/view/View";
import New from "../pages/new/New";
import Profile from "../pages/profile/Profile";
import Download from "../pages/download/Download";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setCards, setIsLoggedIn, setPublicCards, setTeamData, setTeamID, setTeamMembers, setTeamName, setTopic, setTopics } from "./appSlice";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";

const App = () => {
    return(
        <div className="fixed top-0 right-0 left-0 bottom-0">
            <BrowserRouter>
                <div className="flex">
                    <div className="bg-background z-30">
                    <Sidebar/>
                    <GetData/>
                    </div>
                    <div className="bg-background w-full z-10">
                        <Routes>
                            <Route path="/view" element={<View/>}/>
                            <Route path="/new" element={<New/>}/>
                            <Route path="/profile" element={<Profile/>}/>
                            <Route path="/download" element={<Download/>}/>
                        </Routes>
                    </div>
                </div>
            </BrowserRouter>
        </div>
    )
}

const GetData = () => {
    const dispatch = useDispatch();
    const topic = useSelector((state) => state.app.topic);
    const showPublicCards = useSelector(state => state.app.showPublicCards);
    const showTeamCards = useSelector(state => state.app.showTeamCards);
    const publicCards = useSelector(state => state.app.publicCards);
    const teamCards = useSelector(state => state.app.teamCards);
    const isLoggedIn = useSelector(state => state.app.isLoggedIn);
    const teamID = useSelector(state => state.app.teamID);
    const teamData = useSelector(state => state.app.teamData);

    auth.onAuthStateChanged((user) => {dispatch(setIsLoggedIn( user? true : false))});

    useEffect(() => {
        getDoc(doc(db, "public", "publicData")).then(result => {
            const data = result.data().topics;
            dispatch(setTopics(data));
            dispatch(setTopic(data[data.length - 1]))
        });
    }, [])

    useEffect(() => {
        if(!isLoggedIn){return;}
        getDoc(doc(db, "public", "publicData", "users", auth.currentUser.uid)).then(result => {
            const data = result.data();
            if(!data.hasOwnProperty("teamID")){
                setDoc(doc(db, "public", "publicData", "users", auth.currentUser.uid), {teamID : ""}, {merge: true})
            }else{
                dispatch(setTeamID(data.teamID));
            }
        })
    }, [isLoggedIn])

    useEffect(() => {
        if(!teamID){return;}
        getDoc(doc(db, "teams", teamID, "teamData", topic)).then(result => {
            const data = result.data();
            dispatch(setTeamData(data? data : {contentions: []}));
        });
        getDoc(doc(db, "teams", teamID)).then(result => {
            const data = result.data();
            dispatch(setTeamName(data.teamName));
            dispatch(setTeamMembers(data.members))
        })
    }, [teamID, topic]);

    useEffect(() => {
        if(!teamData || !teamID){return}
        setDoc(doc(db, "teams", teamID, "teamData", topic), teamData, {merge: true})
    }, [teamData])

    useEffect(() => {
        if(!topic){return}
        getDocs(collection(db, "public", "publicCards", topic)).then((result) => {
            const cardsData = [];
            const docs = result.docs;
            docs.forEach(doc => {
                cardsData.push(doc.data());
            })
            dispatch(setPublicCards(cardsData));
        })
    }, [topic])

    useEffect(() => {
        const outputArr = new Array().concat(showPublicCards? publicCards : [], showTeamCards? teamCards : []);
        dispatch(setCards(outputArr));
    }, [showPublicCards, showTeamCards, publicCards, teamCards]);

    return(null);   
}


export default App;