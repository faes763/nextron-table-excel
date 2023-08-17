import { deleteCellTitle } from "../../excel";
import { useChangeTitle } from "../../store/useChangeTitle";
import { useUpdateData } from "../../store/useUpdateData";

export default function CardCreate({text,index,address}:{text:string,index:number,address:string}) {
    const {update} = useUpdateData();
    const {isChange,openTitle,setTextTitle,setCellTitle} = useChangeTitle();
    const changeTitle = ()=>{
        openTitle();
        setTextTitle(text);
        setCellTitle(address);
    }
    return (
        <div className="flex flex-col gap-y-2 border p-4 max-w-[500px]">
            <label onClick={changeTitle} className="overflow-auto w-full cursor-pointer">{text}</label>
            <input className={`border p-2 rounded-3xl create-value ${address}`} type="text" placeholder={text} required/>
            <div>
               <img onClick={async()=>{await deleteCellTitle(address); update()}} className="w-5 h-5 cursor-pointer ml-auto" src="/images/basket.svg"/>
            </div>
        </div>
    )
}