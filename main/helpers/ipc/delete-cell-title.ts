import * as ExcelJS from 'exceljs';
import * as path from 'path';
import { app, ipcMain } from 'electron';
const pathMain = path.join(app.getAppPath(), '/renderer/public/data/example.xlsx');
const pathPrint = path.join(app.getAppPath(), '/renderer/public/data/print.xlsx');
const pathFilter = path.join(app.getAppPath(), '/renderer/public/data/filter.xlsx');

export const deleteCellTitle = ipcMain.handle('delete-cell-title', async (event, cell:string) =>  {
    const work = new ExcelJS.Workbook();
    await work.xlsx.readFile(pathMain);
    const worksheet = work.getWorksheet('Sheet1');
    worksheet.getCell(cell).value = undefined;
    const column = worksheet.getColumn(cell.slice(0,-1)); 
    column.eachCell(cell=>{
        cell.value = undefined;
    });
    await work.xlsx.writeFile(pathMain);

    const workPrint = new ExcelJS.Workbook();
    await workPrint.xlsx.readFile(pathPrint);
    const worksheetPrint = workPrint.getWorksheet('Sheet1');
    worksheetPrint.getCell(cell).value = undefined;
    const columnPrint = worksheetPrint.getColumn(cell.slice(0,-1)); 
    columnPrint.eachCell(cell=>{
        cell.value = undefined;
    });
    await workPrint.xlsx.writeFile(pathPrint);


    const workFilter = new ExcelJS.Workbook();
    await workFilter.xlsx.readFile(pathFilter);
    const worksheetFilter = workFilter.getWorksheet('Sheet1');
    worksheetFilter.getCell(cell).value = undefined;
    const columnFilter = worksheetFilter.getColumn(cell.slice(0,-1)); 
    columnFilter.eachCell(cell=>{
        cell.value = undefined;
    });
    await workFilter.xlsx.writeFile(pathFilter);
});