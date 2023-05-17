import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Star, ThreeDotsVertical, Pen, Trash3 } from "react-bootstrap-icons";
import { db } from "../../../../firebase/firebase";
import { useDispatch } from "react-redux";
import { setEditCard } from "../../../new/newSlice";
import { useNavigate } from "react-router-dom";

const Card = ({data, isPreview}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const[isCardMenuActive, setIsCardMenuActive] = useState(false);
    const[isStarred, setIsStarred] = useState(false);
    const[ownerPhotoURL, setOwnerPhotoURL] = useState("");

    useEffect(() => {
        if(!isPreview){
            getDoc(doc(db, "public", "publicData", "users", data.ownerUID)).then((result) => {
                const data = result.data();
                setOwnerPhotoURL(data.photoURL);
            })
        }else{
            setOwnerPhotoURL("./DebateToolLogo.png");
        }
    })

    useEffect(() => {
        if(!isPreview){
            getDoc(doc(db, "public", "publicCards", data.topic, data.cardID.toString())).then(result => {
                setIsStarred(result.data().isStarred);
            })
        }
    }, [isStarred, data, isPreview])

    function starCallback(){
        setDoc(doc(db, "public", "publicCards", data.topic, data.cardID.toString()), {isStarred: !isStarred}, {merge: true}).then(() => {
            setIsStarred(!isStarred);
        })
    }

    function editCallback(){
        dispatch(setEditCard({cardID: data.cardID, topic: data.topic}));
        navigate('/new')
    }

    function deleteCallback(){
        deleteDoc(doc(db, "public", "publicCards", data.topic, String(data.cardID))).then(() => window.location.reload())
    }

    return(
        <div className="">
            <div className="relative flex flex-col items-baseline h-96 w-96 rounded-lg bg-secondary ">
                <div className="flex justify-between items-center w-full h-16 p-2">
                    <img src={ownerPhotoURL} alt="logo" className="w-12 h-12 rounded-3xl mr-2"/>
                    <div className="w-64">{data.title}</div>
                    <button className={`${isPreview? "invisible" : "visible"} group flex justify-center items-center w-12 h-12 rounded-3xl transition-all duration-200`}>
                        <ThreeDotsVertical size={30} onClick={() => setIsCardMenuActive(!isCardMenuActive)}/>
                    </button>
                    <div className={`${isCardMenuActive? "visible" : "hidden"} absolute -right-16 top-0 flex flex-col space-y-2 z-30 w-18 rounded-lg h-fit p-2 bg-secondary border-2 border-primary border-opacity-50`}>
                        <MenuElement icon={<Star size={30}/>} callback={() => starCallback()} isSelected={isStarred}/>
                        <MenuElement icon={<Pen size={30}/>} callback={() => editCallback()}/>
                        <MenuElement icon={<Trash3 size={30}/>} callback={() => deleteCallback()}/>
                    </div>
                </div>

                <div className="h-12 w-full px-2 flex">
                    <div className="flex space-x-2 h-full w-full rounded-lg">
                        <div className="w-52 h-full p-2 flex items-center space-x-2 border-2 border-primary border-opacity-50 rounded-lg">
                            <a href={data.sourceLink} target="_blank" rel="noopener noreferrer" className="text-tertiary font-bold">{data.sourceName}</a>
                        </div>

                        <div className="w-52 h-full p-2 flex items-center space-x-2 border-2 border-primary border-opacity-50 rounded-lg">
                            <div>{data.contention}</div>
                        </div>
                    </div>
                </div>

                <div className="h-68 w-full p-2 flex">
                    <div className="overflow-y-scroll overflow-x-clip text-ellipsis">{data.evidence}</div>
                </div>
            </div>
        </div>
    )
}

const MenuElement = ({icon, callback, isSelected}) => {
    return(
        <button className={`${isSelected? "bg-primary hover:bg-secondary" : "bg-secondary hover:bg-primary"} h-12 w-12 flex justify-center items-center p-2 rounded-lg border-2 border-primary border-opacity-50 transition-all duration-300`} onClick={callback}>
            {icon}
        </button>
    )
}

export default Card;