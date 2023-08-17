'use client'

import { useEffect, useRef, useState } from "react";
import { usePopupAlert } from "../../store/usePopupAlert";
import { useUpdateData } from "../../store/useUpdateData";
import { changeCell } from "../../excel";


export default function PopupAlert() {
    const {text,close,cell} = usePopupAlert();
    const {update} = useUpdateData();

    const [currentValue,setCurrentValue] = useState(text);

    const ref = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
          if (event.keyCode === 27 || event.which === 27) {
            close();
          }
          if(event.keyCode === 13 || event.which === 13) changeParams();
        }
    
        document.addEventListener('keydown', handleKeyDown);
    
        return () => {
          document.removeEventListener('keydown', handleKeyDown);
        };
      }, []);

      const changeParams = async()=>{
        if(ref.current) {
            await changeCell(cell,ref.current?.value);
            update();
            close();
        }
        
      }

    return(
        <>
            <div onClick={close} className="fixed w-full h-full cursor-pointer z-10 inset-0"></div>
            <div className="z-10 text-center flex flex-col items-center justify-around py-5 rounded-2xl fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2  w-[400px] h-[200px] bg-[#e5e7eb]">
                <h1 className="font-bold">{text}</h1>
                <input ref={ref} value={currentValue} onChange={e=>setCurrentValue(e.target.value)} className="rounded-3xl pl-2" type="text"/>
                <button onClick={changeParams} className="border border-black px-8 py-2 rounded-3xl">Изменить</button>
            </div>
        </>
        
    )
}