import { handleAuthClick } from "../../firebase/firebase";
import { BoxArrowLeft, BoxArrowRight, Google } from "react-bootstrap-icons";
import { auth } from "../../firebase/firebase";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoggedIn, setTopic } from "../../app/appSlice";

const Profile = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.app.isLoggedIn);

    if(!isLoggedIn){
        return(
            <div className="flex flex-col justify-center items-center p-4 w-full h-full text-background">
                <div className="flex flex-col space-y-4 items-center w-96 h-fit p-4 rounded-lg bg-secondary">
                    <div className="text-xl text-text">Log In To Your Account</div>
                    <div className="w-full h-px bg-accent"></div>
                    <Provider logo={<Google size={30}/>} provider={"Log in with Google"} callback={() => handleAuthClick()}/>
                </div>
            </div>
        )
    }else{
        return(
            <div className="flex flex-col space-y-4 p-4">
                {/* Navbar */}
                <div className="relative flex items-center w-full h-16 rounded-lg bg-primary text-background p-2 font-bold">
                    <button className="absolute left-2 flex h-12 w-fit rounded-lg p-2 space-x-2 items-center bg-accent" onClick={() => auth.signOut()}>
                        <BoxArrowLeft size={30}/>
                        <div>Log Out</div>
                    </button>
                    <TopicSelector/>
                </div>

                {/* Body */}
                <div className="flex flex-col space-y-4 text-background">
                    <div className="flex flex-col space-y-4 justify-center w-full h-fit rounded-lg p-4 bg-secondary">
                        <div className="text-3xl text-text">Team Options</div>
                        <button className="w-32 h-10 rounded-lg bg-primary">Create a Team</button>
                        <button className="w-32 h-10 rounded-lg bg-primary">Join a Team</button>
                        <button className="w-32 h-10 rounded-lg bg-primary">Leave Team</button>
                    </div>

                    <div className="flex flex-col space-y-4 justify-center w-full h-fit rounded-lg p-4 bg-secondary">
                        <div className="text-3xl text-text">Case Options</div>
                        <button className="w-32 h-10 rounded-lg bg-primary">Add Contention</button>
                    </div>
                </div>
            </div>
        )
    }
}

const Provider = ({logo, provider, callback}) => {
    return(
        <button className="relative flex justify-center items-center rounded-lg p-4 w-full h-16 bg-primary" onClick={callback}>
            <div className="absolute left-4">{logo}</div>
            <div className="text-xl">{provider}</div>
        </button>
    )
}

const TopicSelector = () => {
    const dispatch = useDispatch();
    const topics = useSelector(state => state.app.topics);
    const topic = useSelector(state => state.app.topic);

    return(
        <select className="absolute right-2 flex h-12 rounded-lg w-32 p-2 space-x-2 items-center bg-accent" id="userProfileTopicSelector" value={topic}
            onChange={() => {dispatch(setTopic(document.getElementById("userProfileTopicSelector").value))}}>
                {topics.map(e => (
                    <option key={e} value={e}>{e}</option>
                ))}
        </select>
    )
}

export default Profile;