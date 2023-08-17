import XlsxPopulate from 'xlsx-populate';

import { BrowserWindow, app, ipcMain } from "electron";
// import puppeteer from 'puppeteer-core';

import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';
const pathPrint = path.join(app.getAppPath(), '/renderer/public/data/print.xlsx');
let pdfFilePath = path.join(app.getAppPath(), '../app.asar.unpacked/renderer/public/data/test.pdf');
if (app.isPackaged) {
    // Если приложение упаковано, используйте путь к распакованному ASAR
    pdfFilePath = path.join(app.getAppPath(), '../app.asar.unpacked/renderer/public/data/test.pdf');
  } else {
    // Если приложение не упаковано, используйте обычный путь
    pdfFilePath = path.join(app.getAppPath(), '/renderer/public/data/test.pdf');
}
export const printFile = ipcMain.handle('print-file',async()=>{
    const workbook = await XlsxPopulate.fromFileAsync(pathPrint);
    
    const worksheet = workbook.sheet('Sheet1');
    
    const data = worksheet.usedRange().value();

    let size = 8;
    let minW = 50;
    let test = data[data.length-1].length;
    if(test<=15) {
        size = 8;
        minW = 50;
    } else if(test<=17) {
        size = 6;
        minW = 35;
    } else if(test>17) {
        size = 6;
        minW = 30;
    }
    else if(test>25) {
        size = 5;
        minW = 25;
    }
    else if(test>35) {
        size = 4;
        minW = 18;
    }

    const html = `
    <html>
        <head>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            .col {
                display:flex;
                justify-content: center;
                font-size: ${size}px;
            }
            p {
                word-wrap: break-word;
                min-width: ${minW}px;
                max-width: ${minW}px;
                text-align: center;
                padding: 5px 2px;
                border: 1px solid #000;
            }
            .bold {
                font-weight: bold;
            }
        </style>
        </head>
        <body>
            <div class="box">
            ${data.map((row:string[] | undefined[],index:number) => `
                ${row[0]!=undefined ?
                    `<div class="col">
                        ${row.map((value)=>`
                            <p ${index == 0 ? "class='bold'" : ""}>${value==undefined ? "" : value}</p>
                        `).join('')}
                    </div>`
                :
                 ``
                }
            `).join('')}
            </div>
           
        </body>
    </html>`;

    try {
        const browser = await puppeteer.launch({channel: 'chrome',headless: true});

        const page = await browser.newPage();

        await page.setContent(html);
        
        const pdfBuffer = await page.pdf();

        // Сохранить PDF в файл
        await fs.promises.writeFile(pdfFilePath, pdfBuffer)
        console.log('File to change')
        await browser.close();

        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
})