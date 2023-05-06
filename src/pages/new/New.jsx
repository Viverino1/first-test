import Card from "../view/components/card/Card";

const New = () => {
    return(
        <div className="relative flex w-full h-full text-quaternary">
            <div className="flex flex-col space-y-4 w-full p-4">
                <input type="text" id="title" className="w-full h-16 text-3xl p-4 rounded-lg bg-primary outline-none" placeholder="Title" onChange={() => {console.log(document.getElementById("title").value)}}/>
                <input type="text" id="sourceName" className="w-full h-10 text-xl p-4 rounded-lg bg-primary outline-none" placeholder="Source Name"/>
                <input type="text" id="sourceLink" className="w-full h-10 text-xl p-4 rounded-lg bg-primary outline-none text-tertiary" placeholder="Source Link"/>
                <select id="contention" className="w-full h-10 text-lg px-4 rounded-lg bg-primary outline-none">
                    <option value="">Select a Contention</option>
                    <option value="Contention 1" >Contention 1</option>
                    <option value="Contention 2"> Contention 2</option>
                </select>
                <textarea id="sourceText" className="w-full h-full text-md p-4 rounded-lg bg-primary outline-none resize-none" placeholder="Source Text"></textarea>
            </div>
            <div className="relative top-0 bottom-0 right-0 flex flex-col space-y-4 justify-center items-center p-4">
                <div className="flex justify-center items-center w-32 h-16 rounded-lg bg-primary text-xl">Preview</div>
                <Card/>
            </div>
        </div>
    )
}

export default New;