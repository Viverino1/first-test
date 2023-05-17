import Card from "./components/card/Card";
import { useEffect, useState } from "react";
import { BoxArrowLeft, Search } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { setTopic } from "../../app/appSlice";
import LoginRedirect from "../profile/LoginRedirect";

const View = () => {
    const dispatch = useDispatch()

    const topics = useSelector(state => state.app.topics);
    const topic = useSelector(state => state.app.topic);
    const cards = useSelector(state => state.app.cards);
    const isLoggedIn = useSelector(state => state.app.isLoggedIn)

    const[displayCards, setDisplayCards] = useState([]);
    const[searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        setDisplayCards([]);
        const query = String(searchQuery).toLowerCase();
        cards.forEach(card => {
            if(String(card.title).toLowerCase().includes(query) || String(card.evidence).toLowerCase().includes(query) || String(card.sourceName).toLowerCase().includes(query)){
                setDisplayCards(oldArray => [...oldArray, card]);
            }
        })
    }, [cards, searchQuery])

    return(
        <div className="relative bg-background w-full h-screen overflow-y-scroll overflow-x-clip text-text">
            <div className="">
                <div className="flex space-x-4 w-full h-24 p-4 text-background font-bold">
                    <div className="relative flex items-center w-full h-16 rounded-lg bg-primary text-background">
                        <div className="h-full w-full rounded-lg flex items-center">
                            <div className="flex justify-center items-center w-12 h-12"><Search size={20}/></div>
                            <input type="text" className="w-full h-full rounded-lg outline-none bg-inherit text-lg" id="searchBar" placeholder="Search"
                            onChange={() => setSearchQuery(document.getElementById("searchBar").value)}/>
                        </div>
                        <select className="absolute right-2 flex h-12 rounded-lg w-32 p-2 space-x-2 items-center bg-accent" id="viewTopicSelector"
                        onChange={() => {dispatch(setTopic(document.getElementById("viewTopicSelector").value))}} value={topic}>
                            {topics.map(e => (
                                <option key={e} value={e}>{e}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="flex flex-wrap px-2 pb-2">
                    {displayCards.map((card) => (
                        <div key={card.cardID} className="m-2">
                            <Card data={card} isPreview={!isLoggedIn}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default View;