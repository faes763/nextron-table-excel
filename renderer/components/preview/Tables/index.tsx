import { useEffect, useState } from "react";
import { dataExcel, getDataTable } from "../../../excel";
import Row from "./row";
import { useUpdateData } from "../../../store/useUpdateData";
import { useFilter } from "../../../store/useFilter";

interface TableSetting {
    admin?:boolean;
    info?:dataExcel[];
}

export default function Tables({admin,info}:TableSetting) {
    const [rows,setRows] = useState([]);
    const {isFilter} = useFilter();
    const {isUpdate,halt} = useUpdateData();

    // If filter no to upd data
    useEffect(()=>{if(info) setRows(info)},[info]);

    // Get data to render site
    useEffect(()=>{getTable(false)},[]);


    useEffect(()=>{
        if(isFilter) getTable(true);
        if(isUpdate) getTable(false);
    },[isUpdate,isFilter]);

    const getTable = async(filter:boolean)=>{
        const infoTable = await getDataTable(filter);
        if(infoTable.rows) {
         
            setRows(infoTable.rows);
            halt();
        };
    }
    return (
        <>
            {rows.map((row:dataExcel[],index)=>
                <Row key={index + ""} index={index} admin={admin} rowData={row}/>
            )}
        </>
    )
}