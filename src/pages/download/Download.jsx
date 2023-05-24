import { useDispatch, useSelector } from "react-redux";
import { setTopic } from "../../app/appSlice";
import { Filter } from "react-bootstrap-icons";
import RenderCase from "../../reactPDF/renderPDF";
import LoginRedirect from "../profile/LoginRedirect";
import { useState } from "react";

const Download = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.app.isLoggedIn);
    const cards = useSelector(state => state.app.cards);
    const topics = useSelector(state => state.app.topics);
    const topic = useSelector(state => state.app.topic);
    const [filterIsActive, setFilterIsActive] = useState(false);

    if (isLoggedIn) {
        return(
            <div className="w-full h-screen flex flex-col space-y-4 p-4">
                <div className="relative flex items-center w-full h-16 rounded-lg bg-primary text-background p-2 font-bold">
                    <button className="absolute left-2 flex h-12 w-fit rounded-lg p-2 space-x-2 justify-center items-center bg-accent" onClick={() => setFilterIsActive(!filterIsActive)}>
                        <div className="pt-1">
                            <Filter size={30}/>
                        </div>
                    </button>
                    <div className={`${filterIsActive? "visible" : "invisible"} absolute flex flex-col justify-center space-y-2 top-16 left-0 w-fit h-fit p-2 bg-accent rounded-lg`}>
                        <div className="flex items-center space-x-2 justify-start bg-primary p-2 rounded-lg">
                            <input type="checkbox" className="h-6 w-6 bg-accent"/>
                            <div className="w-40">Show Public Cards</div>
                        </div>
                        <div className="flex items-center space-x-2 justify-start bg-primary p-2 rounded-lg">
                            <input type="checkbox" className="h-6 w-6 bg-accent"/>
                            <div className="w-40">Show Team Cards</div>
                        </div>
                    </div>
                    <select className="absolute right-2 flex h-12 rounded-lg w-32 p-2 space-x-2 items-center bg-accent" id="userProfileTopicSelector" value={topic}
                        onChange={() => {dispatch(setTopic(document.getElementById("userProfileTopicSelector").value))}}>
                            {topics.map(e => (
                                <option key={e} value={e}>{e}</option>
                            ))}
                    </select>
                </div>
                <div className="w-full h-full overflow-scroll flex justify-center">
                    <RenderCase data={cards}/>
                </div>
            </div>
        )
    }else{
        return(
            <LoginRedirect/>
        )
    }
}

export default Download;