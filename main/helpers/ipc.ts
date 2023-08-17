import { test } from './ipc/test';
import { addRowPrint } from './ipc/add-row-print';
import { changeCell } from "./ipc/change-cell";
import { createRow } from "./ipc/create-row";
import { deleteRow } from "./ipc/delete-row";
import { filterFile } from "./ipc/filter-file";
import { readFile } from "./ipc/read-file";
import { deleteRowPrint } from './ipc/delete-row-print';
import { deleteAllRowPrint } from './ipc/delete-all-print';
import { printFile } from './ipc/print-file';
import { addAllFileToPrint } from './ipc/add-all-file-print';
import { createCellTitle } from './ipc/create-cell-title';
import { deleteCellTitle } from './ipc/delete-cell-title';

export const allHandlers = {
    readFile,
    changeCell,
    deleteRow,
    filterFile,
    createRow,
    deleteAllRowPrint,
    addRowPrint,
    deleteRowPrint,
    printFile,
    addAllFileToPrint,
    createCellTitle,
    deleteCellTitle,
    test
}