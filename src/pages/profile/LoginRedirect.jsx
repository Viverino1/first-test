import { useNavigate } from "react-router-dom"

export default function LoginRedirect(){
    const navigate = useNavigate()
    return(
        <div className="w-full h-full flex justify-center place-items-center">
            <div className="flex flex-col justify-center items-center p-4 w-full h-full text-background">
                <div className="flex flex-col space-y-4 items-center w-96 h-fit p-4 rounded-lg bg-secondary">
                    <div className="text-xl text-text">Log In To View This Page</div>
                    <button className="flex justify-center items-center rounded-lg p-4 w-full h-16 bg-primary" onClick={() => navigate("/profile")}>
                        <div className="text-xl">Login</div>
                    </button>
                </div>
            </div>
        </div>
    )
}