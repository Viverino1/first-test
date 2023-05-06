import { Search } from "react-bootstrap-icons"

const SearchBar = () => {
    return(
        <div className="w-full h-16 px-4 pt-4 bg-secondary ">
            <div className="flex items-center w-full h-full rounded-lg bg-primary">
                <div className="flex justify-center items-center w-12 h-12">
                    <Search size={30}/>
                </div>
                <input type="text" className="w-full h-full bg-primary outline-none"/>
            </div>
        </div>
    )
}

export default SearchBar;