// 'use client'
// import { filterFile } from "@/excel";

// import { useFilter } from "@/store/useFilter";
// import { useUpdateData } from "@/store/useUpdateData";
import { useEffect, useRef, useState } from "react";
import { usePopupFilter } from "../../../store/useFilterPopup";
import { useUpdateData } from "../../../store/useUpdateData";
import { useFilter } from "../../../store/useFilter";
import { filterFile } from "../../../excel";
// import { usePopupFilter } from "@/store/useFilterPopup";

export default function PopupTitle() {
    const {close,text,cell} = usePopupFilter();
    const {update} = useUpdateData();
    const [currentValue,setCurrentValue] = useState("");
  
    const ref = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
          // esc key
          if (event.keyCode === 27 || event.which === 27) close();
          // enter key
          if(event.keyCode === 13 || event.which === 13) getFilterData();
        }
    
        document.addEventListener('keydown', handleKeyDown);
    
        return () => {
          document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

   

    const {countFilter,set,filter,isFilter} = useFilter();
    const getFilterData = async()=>{
        if(ref.current) {
            await filterFile(cell,ref.current?.value,isFilter);
            filter()
            close();
            update();
            set(countFilter+1);
        }
      }

    return(
        <>
            <div onClick={close} className="fixed w-full h-full cursor-pointer z-20 inset-0"></div>
            <div className="z-20 text-center flex flex-col items-center justify-around py-5 rounded-2xl fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2  w-[400px] h-[200px] bg-[#e5e7eb]">
                <h1 className="font-bold overflow-auto w-[80%]">{text}</h1>
                <input ref={ref} value={currentValue} onChange={e=>setCurrentValue(e.target.value)} className="rounded-3xl pl-2" type="text"/>
                <button onClick={getFilterData} className="border border-black px-8 py-2 rounded-3xl">Фильтр</button>
            </div>
        </>
        
    )
}