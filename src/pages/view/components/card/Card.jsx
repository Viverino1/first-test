import { useState } from "react";
import { Star } from "react-bootstrap-icons";

const Card = ({title, sourceName, sourceLink, contention, evidence}) => {

    const[isStarred, setIsStarrted] = useState(false);

    return(
        <div className="text-quaternary">
            <div className="flex flex-col items-baseline h-96 w-96 rounded-lg bg-primary">
                <div className="flex justify-between items-center w-full h-16 p-2">
                    <img src="./cosmicLogo.png" alt="logo" className="w-12 h-12 rounded-3xl mr-2"/>
                    <div className="w-64">{title}</div>
                    <button className={`flex justify-center items-center w-12 h-12 rounded-3xl transition-all duration-200 ${isStarred? "bg-tertiary" : "bg-quaternary"}`} onClick={() => {setIsStarrted(!isStarred)}}><Star size={30} color="black"/></button>
                </div>

                <div className="h-12 w-full px-2 flex">
                    <div className="flex space-x-2 h-full w-full rounded-lg">
                        <div className="w-52 h-full p-2 flex items-center space-x-2 bg-secondary rounded-lg">
                            <a href={sourceLink} target="_blank" rel="noopener noreferrer" className="text-tertiary font-bold">{sourceName}</a>
                        </div>

                        <div className="w-52 h-full p-2 flex items-center space-x-2 bg-secondary rounded-lg">
                            <div>{contention}</div>
                        </div>
                    </div>
                </div>

                <div className="h-68 w-full p-2 flex">
                    <div className="overflow-y-scroll overflow-x-clip text-ellipsis">{evidence}</div>
                </div>
            </div>
        </div>
    )
}

export default Card;