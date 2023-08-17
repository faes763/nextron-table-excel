import * as ExcelJS from 'exceljs';
import * as path from 'path';
import { app, ipcMain } from 'electron';
const pathPrint = path.join(app.getAppPath(), '/renderer/public/data/print.xlsx');

export const deleteRowPrint = ipcMain.handle('delete-row-print', async (event, cell:number) =>  {
    const work = new ExcelJS.Workbook();
    await work.xlsx.readFile(pathPrint);
    const worksheet = work.getWorksheet('Sheet1');
    const rowCopy = worksheet.getRow(cell);
    rowCopy.values = worksheet.addRow(undefined).values;
    await work.xlsx.writeFile(pathPrint);
});