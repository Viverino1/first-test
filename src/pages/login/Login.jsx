import { handleAuthClick } from "../../firebase/firebase";
import { BoxArrowRight, Google } from "react-bootstrap-icons";
import { auth } from "../../firebase/firebase";
import { useState } from "react";

const Login = () => {
    const[isLoggedIn, setIsLoggedIn] = useState(Boolean(auth.currentUser));
    auth.onAuthStateChanged(() => setIsLoggedIn(Boolean(auth.currentUser)));

    if(!isLoggedIn){
        return(
            <div className="flex flex-col justify-center items-center p-4 w-full h-full text-quaternary">
                <div className="flex flex-col space-y-4 items-center w-96 h-fit p-4 rounded-lg bg-primary">
                    <div className="text-xl">Log In To Your Account</div>
                    <div className="w-full h-px bg-tertiary"></div>
                    <Element logo={<Google size={30}/>} provider={"Log in with Google"} callback={() => handleAuthClick()}/>
                </div>
            </div>
        )
    }else{
        return(
            <div className="flex flex-col justify-center items-center p-4 w-full h-full text-quaternary">
                <div className="flex flex-col space-y-4 items-center w-96 h-fit p-4 rounded-lg bg-primary">
                    <div className="text-xl">Hello, {auth.currentUser.displayName}</div>
                    <Element logo={<BoxArrowRight size={30}/>} provider={"Log Out"} callback={() => {auth.signOut();}}/>
                </div>
            </div>
        )
    }
}

const Element = ({logo, provider, callback}) => {
    return(
        <button className="relative flex justify-center items-center rounded-lg p-4 w-full h-16 bg-tertiary" onClick={callback}>
            <div className="absolute left-4">{logo}</div>
            <div className="text-xl">{provider}</div>
        </button>
    )
}

export default Login;