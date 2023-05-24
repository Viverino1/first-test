import { createTeam, handleAuthClick, isUserInTeam } from "../../firebase/firebase";
import { BoxArrowLeft, ExclamationCircle, Google, PlusLg, Trash3 } from "react-bootstrap-icons";
import { auth } from "../../firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import { addContention, addSubpoint, deleteContention, deleteSubpoint, setContentions, setTeamData, setTeamID, setTopic } from "../../app/appSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.app.isLoggedIn);
    const teamID = useSelector(state => state.app.teamID);
    const teamData = useSelector(state => state.app.teamData);
    const teamName = useSelector(state => state.app.teamName);

    const [emailError, setEmailError] = useState("");
    const [namelError, setNameError] = useState("");
    const navigate = useNavigate();

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
            <div className="flex flex-col space-y-4 px-4 pt-4 h-screen">
                {/* Navbar */}
                <div className="relative flex items-center w-full h-16 rounded-lg bg-primary text-background p-2 font-bold">
                    <button className="absolute left-2 flex h-12 w-fit rounded-lg p-2 space-x-2 items-center bg-accent" onClick={() => auth.signOut()}>
                        <BoxArrowLeft size={30}/>
                        <div>Log Out</div>
                    </button>
                    <TopicSelector/>
                </div>

                <div className={`${teamID? "hidden" : "visible"}`}>
                    <div className="flex flex-col space-y-4 w-full h-fit p-4 rounded-lg bg-secondary text-text">
                        <div>
                            <div className="text-3xl font-bold text-primary">Create a team</div>
                            <div>To configure private cards, contentions, subpoints, and more.</div>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <div>Team Name</div>
                            <div className="flex items-center space-x-4">
                                <input type="text" className="w-1/2 h-10 rounded-lg p-2 bg-background outline-none" id="teamName"/>
                                <div className={`flex items-center space-x-2 text-red-500 ${namelError? "visible" : "invisible"}`}>
                                    <ExclamationCircle size={30}/>
                                    <div>{namelError}</div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <div>Invite Member by Email</div>
                            <div className="flex items-center space-x-4">
                                <input type="text" className="w-1/2 h-10 rounded-lg p-2 bg-background outline-none" id="email"/>
                                <div className={`flex items-center space-x-2 text-red-500 ${emailError? "visible" : "invisible"}`}>
                                    <ExclamationCircle size={30}/>
                                    <div>{emailError}</div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <button className="w-32 h-10 rounded-lg p-2 bg-primary text-background font-bold outline-none"
                            onClick={() => {
                                setEmailError("");
                                setNameError("");

                                isUserInTeam(document.getElementById("email").value).then(result => {
                                    if(result == 404){
                                        setEmailError("User not found.");
                                    }else if(result.teamID != ""){
                                        setEmailError(result.displayName + " is already part of a team.");
                                    }else{
                                        setEmailError("");
                                        const teamName = document.getElementById("teamName").value;

                                        if(!teamName){
                                            setNameError("Enter a team name.")
                                        }else{
                                            createTeam(teamName, auth.currentUser.uid, result.id).then(() => {
                                                //window.location.reload();
                                            })
                                        }
                                    }
                                })
                            }}>Create Team</button>
                        </div>
                    </div>
                </div>

                <div className={`${!teamID? "hidden" : "visible"} flex flex-col space-y-4 h-full rounded-t-lg overflow-scroll`}>
                    <div className="flex flex-col space-y-4 w-full h-fit p-4 rounded-lg bg-secondary text-text">
                        <div>
                            <div className="text-3xl font-bold text-primary">Case Options</div>
                        </div>
                        {teamData.contentions.map((contention, index) => (
                            <div key={index} className="flex flex-col space-y-4">
                                <div className="flex flex-col space-y-2">
                                    <div>Contention {index + 1}</div>
                                    <div className="flex items-center space-x-4">
                                        <input type="text" className="w-full h-10 rounded-lg p-2 bg-background outline-none"id={"cont" + (index + 1)} defaultValue={contention.name}/>
                                        <button className="flex justify-center items-center w-8 h-8 rounded-lg bg-primary text-background"
                                        onClick={() => {
                                            dispatch(deleteContention(index));
                                            navigate("/");
                                            setTimeout(() => {
                                                navigate("/profile");
                                            }, 0)
                                        }}>
                                            <Trash3 size={20}/>
                                        </button>
                                    </div>
                                </div>
                                <div className="ml-16 flex flex-col space-y-4">
                                    {contention.subpoints.map((subpoint, i) => (
                                        <div key={i} className="flex flex-col space-y-2">
                                            <div>Subpoint {i + 1}</div>
                                            <div className="flex items-center space-x-4">
                                                <input type="text" className="w-full h-10 rounded-lg p-2 bg-background outline-none" id={"cont" + (index + 1) + "sub" + (i + 1)} defaultValue={subpoint}/>
                                                <button className="flex justify-center items-center w-8 h-8 rounded-lg bg-primary text-background"
                                                onClick={() => {
                                                    dispatch(deleteSubpoint({contention: index, subpoint: i}));
                                                    navigate("/");
                                                    setTimeout(() => {
                                                        navigate("/profile");
                                                    }, 0)
                                                }}>
                                                    <Trash3 size={20}/>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                    <button className="flex justify-center items-center space-x-2 w-48 h-10 p-2 rounded-lg bg-primary text-background"
                                    onClick={() => {dispatch(addSubpoint(index));}}>
                                        <PlusLg size={20}/>
                                        <div>Add Subpoint</div>
                                    </button>
                                </div>
                            </div>
                        ))}

                        <button className="flex justify-center items-center space-x-2 w-48 h-10 p-2 rounded-lg bg-primary text-background"
                        onClick={() => {dispatch(addContention());}}>
                            <PlusLg size={20}/>
                            <div>Add Contention</div>
                        </button>

                        <div className="flex flex-col space-y-2">
                            <button className="w-32 h-10 rounded-lg p-2 bg-primary text-background font-bold outline-none" onClick={() => {
                                const newContentions = [];
                                for (let c = 0; c < teamData.contentions.length; c++) {
                                    var subpoints = [];
                                    for(let s = 0; s < teamData.contentions[c].subpoints.length; s++){
                                        subpoints.push(document.getElementById(String("cont" + (c + 1) + "sub" + (s + 1))).value)
                                    }
                                    newContentions.push({
                                        name: document.getElementById(String("cont" + (c + 1))).value,
                                        subpoints: subpoints
                                    })
                                }
                                dispatch(setContentions(newContentions));
                            }}>Save</button>
                        </div>
                    </div>

                    <div className="flex flex-col space-y-4 w-full h-fit p-4 rounded-lg bg-secondary text-text">
                        <div>
                            <div className="text-3xl font-bold text-primary">Team Options</div>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <div>Team Name</div>
                            <input type="text" className="w-1/2 h-10 rounded-lg p-2 bg-background outline-none" defaultValue={teamName}/>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <div>Invite Member by Email</div>
                            <input type="text" className="w-1/2 h-10 rounded-lg p-2 bg-background outline-none"/>
                        </div>
                        <button className="w-32 h-10 rounded-lg p-2 bg-primary text-background font-bold outline-none">Save</button>
                        <div className="flex flex-col space-y-2">
                            <div>Leave {teamName}</div>
                            <button className="w-32 h-10 rounded-lg p-2 bg-primary text-background font-bold outline-none">Leave Team</button>
                        </div>
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
    const navigate = useNavigate();

    return(
        <select className="absolute right-2 flex h-12 rounded-lg w-32 p-2 space-x-2 items-center bg-accent" id="userProfileTopicSelector" value={topic}
            onChange={() => {
                dispatch(setTopic(document.getElementById("userProfileTopicSelector").value));
                navigate("/");
                setTimeout(() => {
                    navigate("/profile");
                }, 0);
            }}>
                {topics.map(e => (
                    <option key={e} value={e}>{e}</option>
                ))}
        </select>
    )
}

export default Profile;