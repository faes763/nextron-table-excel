import { useEffect, useState } from "react";
import { addAllFileToPrint, dataExcel, deleteAllRowPrint, getDataTable, printFile } from "../../excel";
import Tables from "./Tables";
import { useDeleteFile } from "../../store/useDeleteFile";
import { useFilter } from "../../store/useFilter";
import { useElementCount } from "../../store/useUpdateData";

const pdfFilePath = '/data/test.pdf';

export default function Preview() {
    // Needed so that when the page is reloaded, the print file is cleared
    useEffect(()=>{clearPrintFile()},[]);

    const {count} = useElementCount();
    // need to normal work filter
    const {countFilter,set,noFilter,isFilter} = useFilter();

    const [data,setData] = useState<dataExcel[]>([]);
    async function filePrint() {
        if(count == 0) {
            await addAllFileToPrint(isFilter);
            await printFile();
        }
        else printFile();
    }
    //clear print-file
    const {deleted} = useDeleteFile();
    async function clearPrintFile() {
        await deleteAllRowPrint();
        deleted();
    }
    // need to normal work filter
    useEffect(()=>{noFilter()},[data])

    async function getData() {
        const values = await getDataTable(false);
        if(values) {
            const info = Object.values(values.rows);
            if(info) setData(info);
            set(0);
        }
    }
    return (
        <div>
            <div className="fixed max-w-[92px] flex flex-col items-center gap-4 text-center left-0 border-t-2 border-r-2 border-black bg-[#e5e7eb] z-10 h-full">
                <div>
                    <h1 className=" break-words">Выбрано элементов</h1>
                    <p className=" break-words">{count}</p>
                </div>
                <button onClick={filePrint} className="border border-black px-3 py-1 rounded-2xl">Печать</button>
                <button onClick={clearPrintFile} className="border border-black px-1 py-1 rounded-2xl">Очистить</button>
                <div>
                    <h1 className=" break-words">Фильтров</h1>
                    <p className=" break-words">{countFilter}</p>
                </div>
                <button onClick={getData} className="border border-black px-1 py-1 rounded-2xl text-sm">Сбросить фильтры</button>
            </div>
            <div className="flex flex-col gap-5 ml-[90px] relative">
                <Tables info={data}/>
            </div>
        </div>
    )
}