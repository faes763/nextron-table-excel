import { useEffect, useState } from "react";
import { createCellTitle, createRow, getDataTable, titleExcel } from "../../excel";
import MainHeader from "../../components/mainHeader";
import { useChangeTitle } from "../../store/useChangeTitle";
import CardCreate from "./card-create";
import { useUpdateData } from "../../store/useUpdateData";

// const startCharCode = 'a'.charCodeAt(0);


export default function Create() {
    const [titles,setTitles] = useState([]);
    //get titles card
    useEffect(()=>{getTitles()},[]);

    const {change} = useChangeTitle();
    //on page create you can name title
    useEffect(()=>change(),[]);

    //update info title
    const {isUpdate,halt,update} = useUpdateData();

    //get titles card
    const getTitles = async()=>{
        const infoTable = await getDataTable();       
        if(infoTable) setTitles(infoTable.titles);
        halt();
        console.log(infoTable.titles)
    }

    //if update to rerender page
    useEffect(()=>{
        if(isUpdate) getTitles();
    },[isUpdate]);

    const create = async(evsent)=>{
        event.preventDefault();
        const inputDocument = document.querySelectorAll('.create-value');
        console.log(inputDocument)
        // const endCharCode = startCharCode + inputDocument.length - 1;
        const letters = [];

        // for (let i = startCharCode; i <= endCharCode; i++) letters.push(String.fromCharCode(i).toUpperCase());
        // @ts-ignore
        const values = Array.from(inputDocument).map(input => {return{[input.classList[input.classList.length-1].slice(0, -1)] : input.value}});
        console.log(values)
        // const objLetterValue = letters.map((letter:string,index:number)=>{return {[letter]: values[index]}});
        const form = {};
        values.forEach(item => {
            const key = Object.keys(item)[0];
            form[key] = item[key];
        });
        await createRow(form);
    }

    const [text,setText] = useState("");

    const createCategory = async()=>{
        await createCellTitle(text);
        update();
    }
    return (
        <>
            <MainHeader/>
            <div className="flex flex-col w-[200px] border border-black gap-5 items-center rounded-2xl my-2 py-3">
                <h1>Создание категории</h1>
                <input className="text-center border border-black rounded-xl" onChange={e=>setText(e.target.value)} type="text" placeholder="Имя категории"/>
                <button className="border border-black rounded-xl py-1 px-6" onClick={createCategory}>Создать</button>
            </div>
            <form className="text-center max-w-[1200px] mx-auto items-center flex flex-col gap-5 py-5">
                <div className="flex  text-left mx-auto flex-wrap gap-5 justify-center">
                    {titles.map((el:titleExcel,index)=>{
                        return (
                            <CardCreate address={el.address} index={index} key={index} text={el.text} />
                        )
                    })}
                </div>
                <div>
                    <button onClick={create} className="border px-8 py-2 border-black rounded-3xl">Создать</button>
                </div>
            </form>
        </>
    )
}