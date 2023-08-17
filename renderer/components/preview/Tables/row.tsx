import { useEffect, useState } from "react";
import { addRowPrint, dataExcel, deleteRow, deleteRowPrint } from "../../../excel";
import { useElementCount, useUpdateData } from "../../../store/useUpdateData";
import { useDeleteFile } from "../../../store/useDeleteFile";
import clsx from "clsx";
import Cell from "./cell";
import React from "react";

interface RowSetting {
    index:number;
    admin?:boolean;
    rowData: dataExcel[]
}

export default function Row({index,admin,rowData}:RowSetting) {
    
    const [target,setTarget] = useState(false);
    const {update} = useUpdateData();
    const {next,prev,count} = useElementCount();
    const {isDelete,returnState} = useDeleteFile();
    useEffect(()=>{
        if(isDelete) {
            setTarget(false);
            returnState();
            prev(0);
        }
    },[isDelete])
    return (
        <div 
        
            className={clsx({
                "inline-flex justify-between border-black w-fit cursor-pointer relative border-2":true,
                "border-green-300":target
            })} 
        >
        
        {rowData != undefined && rowData.map((el:dataExcel,index1)=>{
            if(index1 == 0) return (
                <React.Fragment key={index1 + "" + index}>
                {!admin && <div 
                    onClick={()=>{
                        if(target) {
                            
                            deleteRowPrint(index+2);
                            setTarget(false);
                            prev(count-1);
                        }else {
                            
                            addRowPrint(index+2);
                            setTarget(true);
                            next(count+1);
                        }
                    }}
                    className="absolute inset-0 w-full h-full"
                />}
                <div  className={clsx({"flex items-center gap-x-1":true})}>
                    {admin == true && <img 
                        onClick={async()=>{
                            await deleteRow(el.address);
                            update()}
                        } 
                        className="cursor-pointer ml-[-35px]" 
                        src="/images/basket.svg" 
                        alt="delete"
                    />}
                    <Cell 
                        key={index1 + "" + index} 
                        first={true} 
                        text={el.text} 
                        admin={admin} 
                        address={el.address} 
                    />
                </div>
                </React.Fragment>
                
                
            )
            return (
                <React.Fragment key={index1 + "" + index} >
                {!admin && <div 
                    onClick={()=>{
                        if(target) {
                            deleteRowPrint(+el.address.replace(/\D/g, ''));
                            setTarget(false);
                            prev(count-1);
                        }else {
                            addRowPrint(+el.address.replace(/\D/g, ''));
                            setTarget(true);
                            next(count+1);
                        }
                    }}
                    className="absolute inset-0 w-full h-full"
                />}
                <Cell 
                    
                    text={el.text} 
                    admin={admin} 
                    address={el.address} 
                />
                </React.Fragment>
                
            )}
        )}
    </div>
    )
    
}