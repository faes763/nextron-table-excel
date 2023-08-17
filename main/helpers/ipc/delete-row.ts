import * as ExcelJS from 'exceljs';
import * as path from 'path';
import { app, ipcMain } from 'electron';
const pathMain = path.join(app.getAppPath(), '/renderer/public/data/example.xlsx');

export const deleteRow = ipcMain.handle('delete-row', async (event, cell:string) =>  {
    const work = new ExcelJS.Workbook();
    await work.xlsx.readFile(pathMain);
    const worksheet = work.getWorksheet('Sheet1');
    const row = cell.slice(1);
    console.log(row)
    worksheet.getRow(+row).values = worksheet.addRow(undefined).values;
    await work.xlsx.writeFile(pathMain);
});