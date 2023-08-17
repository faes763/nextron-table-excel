import * as ExcelJS from 'exceljs';
import * as path from 'path';
import { app, ipcMain } from 'electron';
const pathMain = path.join(app.getAppPath(), '/renderer/public/data/example.xlsx');
const pathFilter = path.join(app.getAppPath(), '/renderer/public/data/filter.xlsx');

export const filterFile = ipcMain.handle('filter-file', async (event, cell:string,filterName:string,filters:boolean) =>  {
    const filterWork = new ExcelJS.Workbook();
    await filterWork.xlsx.readFile(pathFilter);
    const worksheetFilter = filterWork.getWorksheet('Sheet1');

    const work = new ExcelJS.Workbook();
    await work.xlsx.readFile(pathMain);
    const worksheet = work.getWorksheet('Sheet1');

    if(filters) {
        const column = worksheetFilter.getColumn(cell); 
        
        const data = []; 
        column.eachCell(cell=>{
            data.push({
                address: cell.address.toLowerCase(),
                text: `${cell.text}`.toLowerCase()
            });
        });
        data.splice(0,1);
        const filteredData = data.filter(cell => {
            if(cell.text) {
                const value = cell.text;
                return value.includes(filterName.toLowerCase());    
            }
        });
        worksheetFilter.eachRow({ includeEmpty: true }, (row, rowNumber) => {
            if(rowNumber>1) row.values = worksheetFilter.addRow(undefined).values;
        });
        await filterWork.xlsx.writeFile(pathFilter);

        filteredData.map(cell=>{
            const rowNumber = +cell.address.slice(1);
            let copyRow = worksheet.getRow(rowNumber);
            worksheetFilter.getRow(rowNumber).values = copyRow.values;
        })
        await filterWork.xlsx.writeFile(pathFilter);
        
        return true;
    }
    
    if(filterName.length >= 1 && !filters) {
        const column = worksheet.getColumn(cell); 
        const data = []; 
        column.eachCell(cell=>{
            data.push({
                address: cell.address.toLowerCase(),
                text: `${cell.text}`.toLowerCase()
            });
        });
        data.splice(0,1);
        const filteredData = data.filter(cell => {
            if(cell.text) {
                const value = cell.text;
                return value.includes(filterName.toLowerCase());    
            }
        });
        
        
        worksheetFilter.eachRow({ includeEmpty: true }, (row, rowNumber) => {
            if(rowNumber>1) row.values = worksheetFilter.addRow(undefined).values;
        });
        await filterWork.xlsx.writeFile(pathFilter);

        filteredData.map(cell=>{
            const rowNumber = +cell.address.slice(1);
            let copyRow = worksheet.getRow(rowNumber);
            worksheetFilter.getRow(rowNumber).values = copyRow.values;
        })
        await filterWork.xlsx.writeFile(pathFilter);
        
        return true; 
    } else {
        return;
    }
});

