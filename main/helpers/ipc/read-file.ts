import * as ExcelJS from 'exceljs';
import * as path from 'path';
import { app, ipcMain } from 'electron';
const pathMain = path.join(app.getAppPath(), '/renderer/public/data/example.xlsx');
const pathPrint = 'public/data/print.xlsx';
const pathFilter = path.join(app.getAppPath(),'/renderer/public/data/filter.xlsx');
const pdfFilePath = 'public/data/test.pdf';

export const readFile = ipcMain.handle('read-xlsx', async (event,filter:boolean) => {
    let pathFile = filter ? pathFilter : pathMain;
    console.log(pathFile)
    try {
        const work = new ExcelJS.Workbook();
        await work.xlsx.readFile(pathFile);

        const sheet = await work.getWorksheet('Sheet1');  
        const row = sheet.getRow(1);
        const values = [];
        row.eachCell(cell=>{
            const body = {
                address: cell.address,
                text: cell.value + ""
            }
            values.push(body);
        });
    
        const data: any[] = [];
        sheet.eachRow((rowData, rowNumber)=> {
            if(rowNumber!=1) {
                const arr = [];
                rowData.eachCell(function(cell, colNumber){
                    const dataCell = {
                        address: cell.address,
                        text: cell.value + ""
                    }
                    arr.push(dataCell);
                });
                data.push(arr);
            }
        });

        return {
            titles: values,
            rows: data,
        };
    } catch (error) {
        
    }
    
});