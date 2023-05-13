import { Routes, Route, BrowserRouter } from "react-router-dom"
import Sidebar from "./components/sidebar/Sidebar";

import View from "../pages/view/View";
import New from "../pages/new/New";
import Login from "../pages/login/Login";
import Download from "../pages/download/Download";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setTopic, setTopics } from "./appSlice";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

const App = () => {
    const dispatch = useDispatch();
    const topics = useSelector((state) => state.app.topics);

    useEffect(() => {
        getDoc(doc(db, "public", "publicData")).then(result => {
            const data = result.data().topics;
            dispatch(setTopics(data));
            dispatch(setTopic(data[data.length - 1]))
        })
    }, [])

    return(
        <div className="fixed top-0 right-0 left-0 bottom-0">
            <BrowserRouter>
                <div className="flex">
                    <div className="bg-primary z-30">
                    <Sidebar/>
                    </div>
                    <div className="bg-secondary w-full z-10">
                    
                        <Routes>
                            <Route path="/view" element={<View/>}/>
                            <Route path="/new" element={<New/>}/>
                            <Route path="/login" element={<Login/>}/>
                            <Route path="/download" element={<Download/>}/>
                        </Routes>
                    </div>
                </div>
            </BrowserRouter>
        </div>
    )
}

export default App;