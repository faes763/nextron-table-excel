import { useChangeTitle } from "../../../store/useChangeTitle";
import { usePopupFilter } from "../../../store/useFilterPopup";

export default function Title({text,address,create}:{text:string,address:string,create?:boolean}) {
   
    const {open,setText,setCell} = usePopupFilter();
    const {isChange,openTitle,setTextTitle,setCellTitle} = useChangeTitle();
    const filter = ()=>{
        open();
        setText(text);
        
        setCell(address.slice(0,1));
    }

    const changeTitle = ()=>{
        openTitle();
        setTextTitle(text);
        setCellTitle(address);
    }

    return (
        <div className="relative text-center w-[200px]">
            <h1 onClick={()=>{
                    if(isChange) changeTitle();
                    else filter();
                }} 
                className="inline-block font-bold cursor-pointer overflow-auto w-full"
            >
                {text}
            </h1>
        </div>
        
    )
}