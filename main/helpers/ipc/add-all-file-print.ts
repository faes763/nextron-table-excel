import * as ExcelJS from 'exceljs';
import * as path from 'path';
import { app, ipcMain } from 'electron';
const pathMain = path.join(app.getAppPath(), '/renderer/public/data/example.xlsx');
const pathPrint = path.join(app.getAppPath(), '/renderer/public/data/print.xlsx');
const pathFilter = path.join(app.getAppPath(), '/renderer/public/data/filter.xlsx');

export const addAllFileToPrint = ipcMain.handle('add-all-file-print', async (event, filter:boolean) =>  {
    const workFilePrint = new ExcelJS.Workbook();
    await workFilePrint.xlsx.readFile(pathPrint);
    const worksheetFilePrint = workFilePrint.getWorksheet('Sheet1');

    // Очищаем все значения у файла
    worksheetFilePrint.eachRow({ includeEmpty: true }, (row, rowNumber) => {
        row.values = worksheetFilePrint.addRow(undefined).values;
    });
    await workFilePrint.xlsx.writeFile(pathPrint);
    if(filter) {
        const filterWork = new ExcelJS.Workbook();
        await filterWork.xlsx.readFile(pathFilter);
        const worksheetFilter = filterWork.getWorksheet('Sheet1');

        // Копируем значения из исходного листа в целевой лист
        worksheetFilter.eachRow({ includeEmpty: true }, (row, rowNumber) => {
            row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
                const destinationCell = worksheetFilePrint.getCell(rowNumber, colNumber);
                destinationCell.value = cell.value;
             });
         });
        await workFilePrint.xlsx.writeFile(pathPrint);
        console.log('full copy file! filter to print')
    } else {
        const work = new ExcelJS.Workbook();
        await work.xlsx.readFile(pathMain);
        const worksheet = work.getWorksheet('Sheet1');
        worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
            row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
                const destinationCell = worksheetFilePrint.getCell(rowNumber, colNumber);
                destinationCell.value = cell.value;
             });
         });
        await workFilePrint.xlsx.writeFile(pathPrint);
        console.log('full copy file! example to print')
    }
});