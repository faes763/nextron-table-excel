import { useEffect, useState } from "react";
import Title from "./title";
import { getDataTable } from "../../../excel";
import { useUpdateData } from "../../../store/useUpdateData";

export default function Titles() {
    const [titles,setTitles] = useState([]);
    const {isUpdate,halt} = useUpdateData();
    useEffect(()=>{
        getTitles();
    },[]);
    const getTitles = async()=>{
        const infoTable = await getDataTable();
        if(infoTable) setTitles(infoTable.titles);
        halt();
    }
    useEffect(()=>{
        if(isUpdate) getTitles();
    },[isUpdate]);
    return (
        <>
            {titles.map((element:any,index)=>(
                <Title key={element.address+index} address={element.address} text={element.text}/>
            ))}
        </>
    )
}