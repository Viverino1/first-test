import { Routes, Route, BrowserRouter } from "react-router-dom"
import Sidebar from "./components/sidebar/Sidebar";

import View from "../pages/view/View";
import New from "../pages/new/New";
import Profile from "../pages/profile/Profile";
import Download from "../pages/download/Download";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setCards, setIsLoggedIn, setTopic, setTopics } from "./appSlice";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
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

    auth.onAuthStateChanged((user) => {dispatch(setIsLoggedIn( user? true : false))});

    useEffect(() => {
        getDoc(doc(db, "public", "publicData")).then(result => {
            const data = result.data().topics;
            dispatch(setTopics(data));
            dispatch(setTopic(data[data.length - 1]))
        })
    }, [])

    useEffect(() => {
        if(!topic){return}
        getDocs(collection(db, "public", "publicCards", topic)).then((result) => {
            const cardsData = [];
            const docs = result.docs;
            docs.forEach(doc => {
                cardsData.push(doc.data());
            })
            dispatch(setCards(cardsData));
        })
    }, [topic])

    return(
        <></>
    )
}

export default App;