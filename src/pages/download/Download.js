import { useEffect, useState } from "react";
import { downloadAsPDF } from "../../html2pdf/html2pdf";
import { useDispatch, useSelector } from "react-redux";
import { setTopic } from "../../app/appSlice";

const Download = () => {
    const dispatch = useDispatch();
    const topics = useSelector(state => state.app.topics);
    const topic = useSelector(state => state.app.topic);

    return(
        <div className="flex flex-col justify-center items-center p-4 w-full h-full text-quaternary">
            <div className="relative flex flex-col space-y-4 items-center w-96 h-fit p-4 rounded-lg bg-primary">
                <div className="flex space-x-4 justify-center items-center text-xl">
                    <div>Download Files</div>
                    <select className="absolute right-4 bg-secondary w-20 h-10 rounded-lg p-2" id="downloadTopicSelector" value={topic}
                    onChange={() => dispatch(setTopic(document.getElementById("downloadTopicSelector").value))}>
                        {topics.map((topic) => (
                            <option key={topic} value={topic}>{topic}</option>
                        ))}
                    </select>
                </div>
                <div className="w-full h-px bg-tertiary"></div>
                <Element text={"Download Cards"} callback={() => dowloadCards()}/>
            </div>

            <div id="testID">
                
            </div>
        </div>
    )
}

const Element = ({icon, text, callback}) => {
    return(
        <button className="relative flex justify-center items-center rounded-lg p-4 w-full h-16 bg-tertiary" onClick={callback}>
            <div className="absolute left-4">{icon}</div>
            <div className="text-xl">{text}</div>
        </button>
    )
}

function dowloadCards(){
    console.log("Downloading Cards");
    downloadAsPDF("testID", "file");
}

export default Download;