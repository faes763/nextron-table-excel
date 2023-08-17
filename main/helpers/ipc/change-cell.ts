import * as ExcelJS from 'exceljs';
import * as path from 'path';
import { app, ipcMain } from 'electron';
const pathMain = path.join(app.getAppPath(), '/renderer/public/data/example.xlsx');

export const changeCell = ipcMain.handle('change-cell', async (event, cell:string,text:string) =>  {
    const work = new ExcelJS.Workbook();
    await work.xlsx.readFile(pathMain);
    const worksheet = work.getWorksheet('Sheet1');
    worksheet.getCell(cell).value = text;
    await work.xlsx.writeFile(pathMain);
});