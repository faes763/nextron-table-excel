import * as ExcelJS from 'exceljs';
import * as path from 'path';
import { app, ipcMain } from 'electron';
const pathPrint = path.join(app.getAppPath(), '/renderer/public/data/print.xlsx');
const pathMain = path.join(app.getAppPath(), '/renderer/public/data/example.xlsx');

export const addRowPrint = ipcMain.handle('add-row-print', async (event, cell:number) =>  {
    const work = new ExcelJS.Workbook();
    await work.xlsx.readFile(pathMain);
    const worksheet = work.getWorksheet('Sheet1');
    const rowCopy = worksheet.getRow(cell);

    const workFilePrint = new ExcelJS.Workbook();
    await workFilePrint.xlsx.readFile(pathPrint);
    const worksheetFilePrint = workFilePrint.getWorksheet('Sheet1');
    
    const newRow = worksheetFilePrint.getRow(cell);
    newRow.values = rowCopy.values;

    await workFilePrint.xlsx.writeFile(pathPrint);
});