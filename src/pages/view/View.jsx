import Card from "./components/card/Card";
import SearchBar from "./components/searchBar/SearchBar";

const View = () => {
    const cards = [];
    for(let i = 0; i < 10; i++){
        cards[i] = i;
    }

    return(
        <div className="relative bg-secondary w-full h-screen overflow-y-scroll overflow-x-clip">
            <div className="">
                <div className="flex flex-wrap">
                    {cards.map(card => (
                        <div key={card} className="m-2">
                            <Card/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default View;