import Card from "./components/card/Card";
import { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import { getDocs, collection } from "firebase/firestore";
import { Search } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { setTopic } from "../../app/appSlice";

const View = () => {
    const dispatch = useDispatch()

    const topics = useSelector(state => state.app.topics);
    const topic = useSelector(state => state.app.topic);

    const[cards, setCards] = useState([]);
    const[displayCards, setDisplayCards] = useState([]);
    const[searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        if(!topic){return;}
        getDocs(collection(db, "public", "publicCards", topic)).then(docs => {
            setCards([]);
            docs.forEach(doc => {
                const data = doc.data();                
                setCards(oldArray => [...oldArray, data]);
            })
        })
    }, [topic])

    useEffect(() => {
        setDisplayCards([]);
        const query = String(searchQuery).toLowerCase();
        cards.forEach(card => {
            if(String(card.title).toLowerCase().includes(query) || String(card.evidence).toLowerCase().includes(query)){
                setDisplayCards(oldArray => [...oldArray, card]);
            }
        })
    }, [cards, searchQuery])

    return(
        <div className="relative bg-secondary w-full h-screen overflow-y-scroll overflow-x-clip text-quaternary">
            <div className="">
                <div className="flex space-x-4 w-full h-24 p-4">
                    <div className="w-3/4 h-full rounded-lg bg-primary flex items-cente p-2">
                        <div className="flex justify-center items-center w-12 h-12"><Search size={20}/></div>
                        <input type="text" className="w-full h-full rounded-lg outline-none bg-inherit text-lg" id="searchBar" placeholder="Search"
                        onChange={() => setSearchQuery(document.getElementById("searchBar").value)}/>
                    </div>
                    <select className="w-1/4 h-full p-2 rounded-lg bg-primary outline-none" id="viewTopicSelector" 
                    onChange={() => {dispatch(setTopic(document.getElementById("viewTopicSelector").value))}} value={topic}>
                        {topics.map(e => (
                            <option key={e} value={e}>{e}</option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-wrap px-2 pb-2">
                    {displayCards.map((card) => (
                        <div key={card.cardID} className="m-2">
                            <Card data={card} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default View;