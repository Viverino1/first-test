import { useState } from "react";
import { CardText, Collection, Star, PersonFill, FileEarmarkArrowDown } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../firebase/firebase";

const Sidebar = () => {
    const[isLoggedIn, setIsLoggedIn] = useState(false);
    auth.onAuthStateChanged(() => setIsLoggedIn(Boolean(auth.currentUser)));
    return(
        <div className="group relative flex flex-col justify-between w-21 hover:w-72 h-screen p-2 bg-primary transition-all duration-300 text-quaternary">
            <div className="flex flex-col space-y-2">
                <Element icon={<CardText size={30}/>} text={"New Card"} link={"/new"}/>
                <Element icon={<Collection size={30}/>} text={"All Cards"} link={"/view"}/>
                <Element icon={<Star size={30}/>} text={"Saved"}/>
                <Element icon={<FileEarmarkArrowDown size={30}/>} text={"Download"} link={"/download"}/>
            </div>
            <div>
                <Element icon={isLoggedIn? <img src={auth.currentUser.photoURL} className="w-16 rounded-full"/> : <PersonFill size={30}/>} text={isLoggedIn? auth.currentUser.displayName : "Log In"} link={"/login"}/>
            </div>
        </div>
    )
}

const Element = ({text, icon, link}) => {
    const navigate = useNavigate();

    return(
        <button className="flex items-center space-x-2 w-full h-16 rounded-lg p-2 transition-all duration-300 border-2 group-hover:border-tertiary border-transparent hover:bg-secondary" onClick={() => navigate(link)}>
            <div>
                <div className="flex justify-center items-center w-12 h-12 rounded-3xl bg-tertiary">{icon}</div>
            </div>
            <div>
                <div className="w-0 group-hover:w-36 group-hover:opacity-100 opacity-0 transition-all duration-300 overflow-hidden whitespace-nowrap">{text}</div>
            </div>
        </button>
    )
}

export default Sidebar;