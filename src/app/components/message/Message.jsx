const Message = ({message}) => {
    return(
        <div className={`fixed top-4 right-4 flex justify-center items-center w-36 h-16 rounded-lg bg-tertiary text-quaternary transition-all ${message? "translate-x-0" : "translate-x-40"}`}>
            <div>
                {message}
            </div>
        </div>
    )
}