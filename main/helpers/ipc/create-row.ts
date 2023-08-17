import * as ExcelJS from 'exceljs';
import * as path from 'path';
import { app, ipcMain } from 'electron';
const pathMain = path.join(app.getAppPath(), '/renderer/public/data/example.xlsx');

export const createRow = ipcMain.handle('create-row', async (event, data:any) =>  {
    const work = new ExcelJS.Workbook();
    await work.xlsx.readFile(pathMain);
    const worksheet = work.getWorksheet('Sheet1');
    const lastRow = worksheet.lastRow;
    const newRow = worksheet.addRow(undefined);

    
    const keys = Object.keys(data);
    const values = Object.values(data)

    keys.map((el:string,index)=>{
        newRow.getCell(el).value = values[index] + "";
    })

    await work.xlsx.writeFile(pathMain);
});