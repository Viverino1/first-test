import { useState } from "react";
import { CardText, Collection, Star } from "react-bootstrap-icons";
import { PersonFill } from "react-bootstrap-icons";

const Sidebar = () => {

    return(
        <div className="group relative flex flex-col justify-between w-21 hover:w-72 h-screen p-2 bg-primary transition-all duration-300 text-quaternary">
            <div className="flex flex-col space-y-2">
                <Element icon={<CardText size={30}/>} text={"New Card"} link={"/new"}/>
                <Element icon={<Collection size={30}/>} text={"All Cards"} link={"/view"}/>
                <Element icon={<Star size={30}/>} text={"Saved"}/>
            </div>
            <div>
                <Element icon={<PersonFill size={30}/>} text={"Login"}/>
            </div>
        </div>
    )
}

const Element = ({text, icon, link}) => {
    return(
        <a className="flex items-center space-x-2 w-full h-16 rounded-lg p-2 transition-all duration-300 border-2 group-hover:border-tertiary border-transparent hover:bg-secondary" href={link}>
            <div>
                <div className="flex justify-center items-center w-12 h-12 rounded-3xl bg-tertiary">{icon}</div>
            </div>
            <div>
                <div className="w-0 group-hover:w-36 group-hover:opacity-100 opacity-0 transition-all duration-300 overflow-hidden whitespace-nowrap">{text}</div>
            </div>
        </a>
    )
}

export default Sidebar;