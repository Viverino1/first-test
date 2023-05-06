import { useEffect, useState } from "react";
import Card from "../view/components/card/Card";
import { saveEvent, db } from "../../firebase/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const New = () => {
    const[title, setTitle] = useState("");
    const[sourceName, setSourceName] = useState("");
    const[sourceLink, setSourceLink] = useState("");
    const[contention, setContention] = useState("");
    const[evidence, setEvidence] = useState("");

    const[topic, setTopic] = useState("");

    const[eventID, setEventID] = useState(0);
    getDoc(doc(db, "public", "publicCards")).then(result => {
        const id = result.data().cardIDCounter + 1;
        setEventID(id.toString())
    })
    const[topics, setTopics] = useState([]);

    useEffect(() => {
        console.log("e");
        getDoc(doc(db, "public", "publicData")).then(result => {
            const data = result.data().topics;
            for(let i = 0; i < data.length; i++){
                setTopics(oldArray => [...oldArray, data[i]]);
            }
        })
    }, [])

    return(
        <div className="relative flex w-full h-full text-quaternary">
            <div className="flex flex-col space-y-4 w-full p-4">
                <input type="text" id="title" className="w-full h-16 text-3xl p-2 rounded-lg bg-primary outline-none" placeholder="Title" onChange={() => {setTitle(document.getElementById("title").value)}}/>
                <input type="text" id="sourceName" className="w-full h-12 text-xl p-2 rounded-lg bg-primary outline-none" placeholder="Source Name" onChange={() => {setSourceName(document.getElementById("sourceName").value)}}/>
                <input type="text" id="sourceLink" className="w-full h-12 text-xl p-2 rounded-lg bg-primary outline-none text-tertiary" placeholder="Source Link" onChange={() => {setSourceLink(document.getElementById("sourceLink").value)}}/>
                <div className="flex space-x-4">
                    <select id="contention" className="w-3/4 h-12 text-lg p-2 rounded-lg bg-primary outline-none" onChange={() => {setContention(document.getElementById("contention").value)}}>
                        <option value="">Select a Contention</option>
                        <option value="contention1">contention1</option>
                    </select>
                    <select id="topic" className="w-1/4 h-12 text-lg p-2 rounded-lg bg-primary outline-none" onChange={() => {setTopic(document.getElementById("topic").value)}}>
                        <option value="">Select a Topic</option>
                        {topics.map(e => (
                            <option key={e} value={e}>{e}</option>
                        ))}
                    </select>
                </div>
                <textarea id="evidence" className="w-full h-full text-md p-2 rounded-lg bg-primary outline-none resize-none" placeholder="Source Text" onChange={() => setEvidence(document.getElementById("evidence").value)}/>
            </div>
            <div className="relative top-0 bottom-0 right-0 flex flex-col space-y-4 justify-center items-center p-4">
                <div className="flex justify-center items-center w-32 h-12 rounded-lg bg-primary text-xl">preview</div>
                <Card title={title} sourceName={sourceName} sourceLink={sourceLink} contention={contention} evidence={evidence}/>
                <button className="flex justify-center items-center w-32 h-12 rounded-lg bg-primary text-xl" onClick={() => saveEvent(eventID, topic, title, sourceName, sourceLink, contention, evidence)}>Save</button>
            </div>
        </div>
    )
}

export default New;