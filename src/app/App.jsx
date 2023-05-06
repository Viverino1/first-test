import { Routes, Route, BrowserRouter } from "react-router-dom"
import Sidebar from "./components/sidebar/Sidebar";

import Home from "../pages/home/Home";
import View from "../pages/view/View";
import New from "../pages/new/New";

const App = () => {
    return(
        <div className="fixed top-0 right-0 left-0 bottom-0">
            <div className="flex">
                <div className="bg-primary z-30">
                    <Sidebar/>
                </div>
                <div className="bg-secondary w-full z-10">
                    <BrowserRouter>
                        <Routes>
                            <Route path="/view" element={<View/>}/>
                            <Route path="/new" element={<New/>}/>
                        </Routes>
                    </BrowserRouter>
                </div>
            </div>
        </div>
    )
}

export default App;