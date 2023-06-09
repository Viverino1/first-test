import { useEffect, useState } from "react";
import Card from "../view/components/card/Card";
import { saveCard, db } from "../../firebase/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { setEditCard } from "./newSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setTopic } from "../../app/appSlice";
import LoginRedirect from "../profile/LoginRedirect";

const New = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isLoggedIn = useSelector(state => state.app.isLoggedIn);

    const editCard = useSelector((state) => state.new.editCard);
    const[cardID, setCardID] = useState(0);

    const[title, setTitle] = useState("");
    const[sourceName, setSourceName] = useState("");
    const[sourceLink, setSourceLink] = useState("");
    const[contention, setContention] = useState("Intro");
    const[evidence, setEvidence] = useState("");

    const topic = useSelector(state => state.app.topic);
    const topics = useSelector(state => state.app.topics);

    useEffect(() => {
        if(editCard.topic && editCard.cardID){
            getDoc(doc(db, "public", "publicCards", editCard.topic, String(editCard.cardID))).then(result => {
                const data = result.data();
                setTitle(data.title);
                setSourceName(data.sourceName);
                setSourceLink(data.sourceLink);
                setContention(data.contention);
                setEvidence(data.evidence);
                dispatch(setTopic(data.topic));
                setCardID(data.cardID);

                dispatch(setEditCard({}));
            })
        }
    }, [])

    function save(){
        if(cardID){
            setDoc(doc(db, "public", "publicCards", topic, String(cardID)), {
                topic: topic,
                title: title,
                sourceName: sourceName,
                sourceLink: sourceLink,
                contention: contention,
                evidence: evidence,
            }, {merge: true}).catch(err => console.log(err))
            navigate("/view");
        }else{
            saveCard(topic, title, sourceName, sourceLink, contention, evidence, false).then(() => {
                navigate("/view");
            })
        }
    }

    if (isLoggedIn) {
        return(
            <div className="relative flex w-full h-full text-quaternary">
                <div className="flex flex-col space-y-4 w-full p-4">
                    <input type="text" id="title" className="w-full h-16 text-3xl p-2 rounded-lg bg-secondary outline-none placeholder-primary" placeholder="Title" value={title}
                    onChange={() => {setTitle(document.getElementById("title").value)}}/>
    
                    <input type="text" id="sourceName" className="w-full h-12 text-xl p-2 rounded-lg bg-secondary outline-none placeholder-primary" placeholder="Source Name" value={sourceName}
                    onChange={() => {setSourceName(document.getElementById("sourceName").value)}}/>
    
                    <input type="text" id="sourceLink" className="w-full h-12 text-xl p-2 rounded-lg bg-secondary outline-none text-tertiary placeholder-primary" placeholder="Source Link" value={sourceLink}
                    onChange={() => {setSourceLink(document.getElementById("sourceLink").value)}}/>
    
                    <div className="flex space-x-4">
                        <select 
                        id="contention"
                        value={contention}
                        className="w-3/4 h-12 text-lg p-2 rounded-lg bg-secondary outline-none appearance-none text-center"
                        onChange={() => {setContention(document.getElementById("contention").value)}}>
                            <option value="Intro">Intro</option>
                            <option value="Contention 1">Contention 1</option>
                            <option value="Contention 2">Contention 2</option>
                            <option value="Contention 3">Contention 3</option>
                        </select>
                        <select id="topic" className="w-1/4 h-12 text-lg p-2 rounded-lg bg-secondary outline-none appearance-none text-center"
                        value={topic}
                        onChange={() => {dispatch(setTopic(document.getElementById("topic").value))}}>
                            {topics.map(e => (
                                <option key={e} value={e}>{e}</option>
                            ))}
                        </select>
                    </div>
                    <textarea id="evidence" className="w-full h-full text-md p-2 rounded-lg bg-secondary outline-none resize-none placeholder-primary" placeholder="Source Text" value={evidence}
                    onChange={() => setEvidence(document.getElementById("evidence").value)}/>
                </div>
                <div className="relative top-0 bottom-0 right-0 flex flex-col space-y-4 justify-center items-center p-4">
                    <div className="flex justify-center items-center w-32 h-12 rounded-lg bg-secondary text-xl">preview</div>
                    <Card data={{
                        topic: topic,
                        title: title,
                        sourceName: sourceName,
                        sourceLink: sourceLink,
                        contention: contention,
                        evidence: evidence,
                        isStarred: false,
                    }} isPreview={true}/>
                    <button className="flex justify-center items-center w-32 h-12 rounded-lg bg-primary text-xl text-background" onClick={() => save()}>Save</button>
                </div>
            </div>
        )
    }else{
        return(
            <LoginRedirect/>
        )
    }
}

export default New;