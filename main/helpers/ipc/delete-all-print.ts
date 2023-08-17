import * as ExcelJS from 'exceljs';
import * as path from 'path';
import { app, ipcMain } from 'electron';
const pathPrint = path.join(app.getAppPath(), '/renderer/public/data/print.xlsx');

export const deleteAllRowPrint = ipcMain.handle('delete-all-print', async () =>  {
    const work = new ExcelJS.Workbook();
    await work.xlsx.readFile(pathPrint);
    const worksheet = work.getWorksheet('Sheet1');
    worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
        if(rowNumber>1) row.values = worksheet.addRow(undefined).values;
    });
    await work.xlsx.writeFile(pathPrint);
});