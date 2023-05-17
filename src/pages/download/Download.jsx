import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTopic } from "../../app/appSlice";
import { CloudDownload } from "react-bootstrap-icons";
import RenderCase from "../../reactPDF/renderPDF";
import LoginRedirect from "../profile/LoginRedirect";

const Download = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.app.isLoggedIn);
    const cards = useSelector(state => state.app.cards);

    if (isLoggedIn) {
        return(
            <div className="w-full h-screen flex flex-col space-y-4 p-4">
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