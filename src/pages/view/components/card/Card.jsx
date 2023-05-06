import { useState } from "react";
import { Star } from "react-bootstrap-icons";

const Card = () => {
    const title = "Greenhouse Gasses emit a bunch of carbon yes hee"
    const sourceName = "Google";
    const sourceLink = "https://www.google.com/search?sxsrf=APwXEdf7B6Nq7v4xLAmvsgFjee8O7SmCyQ:1683241654694&q=sidebar+mockup&tbm=isch&sa=X&ved=2ahUKEwissZjn49z-AhVnAjQIHdulCnkQ0pQJegQICRAB&biw=1512&bih=833&dpr=2#imgrc=eZMYxM7VWIz2DM";
    const evidence = "“the use of 100% renewable carbon in PEF instead of fossil carbon in PET for producing 250 ml and 500 ml bottles would result in significant reductions in greenhouse gas (GHG) emissions. Avantium plans to start-up the world's first commercial FDCA plant in 2024. FDCA (2,5-furandicarboxylic acid) is the main building block of PEF. CO2 is absorbed by plants and released at the end of the product life cycle. Plant-based carbon has a net-neutral impact on the CO2 concentration in the atmosphere. In contrast to this, materials and polymers based on fossil carbon from underground, release additional CO2 into the atmosphere. Avantium has developed a technology (YXY) to convert plant-based sugars into a fully recyclable polymer. The new 100% bio-based polymer, PEF (polyethylene furanoate) has superior performance properties compared to PET (polyethylene terephthalate).”"
    const contention = "Economic Downsides to Climate Change";

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