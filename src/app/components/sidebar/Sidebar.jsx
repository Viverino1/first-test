import { CardText, Collection, PersonFill, FileEarmarkArrowDown } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../firebase/firebase";
import { useSelector } from "react-redux";

const Sidebar = () => {
    const isLoggedIn = useSelector(state => state.app.isLoggedIn);
    return(
        <div className="group relative flex flex-col justify-between w-21 hover:w-72 h-screen p-2 bg-accent transition-all duration-300 text-background">
            <div className="flex flex-col space-y-2">
                {isLoggedIn? <Element icon={<CardText size={30}/>} text={"New Card"} link={"/new"}/> : <></>}
                <Element icon={<Collection size={30}/>} text={isLoggedIn? "All Cards" : "Public Cards"} link={"/view"}/>
                {isLoggedIn? <Element icon={<FileEarmarkArrowDown size={30}/>} text={"Download"} link={"/download"}/> : <></>}
            </div>
            <div>
                <Element icon={isLoggedIn? <img src={auth.currentUser.photoURL} className="w-16 rounded-full"/> : <PersonFill size={30}/>} text={isLoggedIn? auth.currentUser.displayName : "Log In"} link={"/profile"}/>
            </div>
        </div>
    )
}

const Element = ({text, icon, link}) => {
    const navigate = useNavigate();

    return(
        <button className="flex items-center space-x-2 w-full h-16 rounded-lg p-2 transition-all duration-300 border-2 group-hover:border-primary border-transparent hover:bg-primary" onClick={() => navigate(link)}>
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