import * as ExcelJS from 'exceljs';
import * as path from 'path';
import { app, ipcMain } from 'electron';
const pathMain = path.join(app.getAppPath(), '/renderer/public/data/example.xlsx');
const pathPrint = path.join(app.getAppPath(), '/renderer/public/data/print.xlsx');
const pathFilter = path.join(app.getAppPath(), '/renderer/public/data/filter.xlsx');

export const createCellTitle = ipcMain.handle('create-cell-title', async (event, text:string) =>  {
    const work = new ExcelJS.Workbook();
    await work.xlsx.readFile(pathMain);
    const worksheet = work.getWorksheet('Sheet1');
    const row = worksheet.getRow(1);
    const lastCell = row.getCell(row.actualCellCount + 1);
    lastCell.value = text;
    await work.xlsx.writeFile(pathMain);

    const workPrint = new ExcelJS.Workbook();
    await workPrint.xlsx.readFile(pathPrint);
    const worksheetPrint = workPrint.getWorksheet('Sheet1');
    const rowPrint = worksheetPrint.getRow(1);
    const lastCellPrint = rowPrint.getCell(rowPrint.actualCellCount + 1);
    lastCellPrint.value = text;
    await workPrint.xlsx.writeFile(pathPrint);

    const workFilter = new ExcelJS.Workbook();
    await workFilter.xlsx.readFile(pathFilter);
    const worksheetFilter = workFilter.getWorksheet('Sheet1');
    const rowFilter = worksheetFilter.getRow(1);
    const lastCellFilter = rowFilter.getCell(rowFilter.actualCellCount + 1);
    lastCellFilter.value = text;
    await workFilter.xlsx.writeFile(pathFilter);
});