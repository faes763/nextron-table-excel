import { ipcRenderer } from 'electron';
import { useUpdateData } from '../store/useUpdateData';
export interface dataExcel {
  address: string,
  text: string
}
export interface titleExcel {
  address: string,
  text: string
}
export interface dataTable {
  titles: titleExcel[],
  rows: dataExcel[],
}


export async function getDataTable(filter?:boolean) {
  const data: dataTable = await ipcRenderer.invoke('read-xlsx',filter);
  return {...data};
}

export async function changeCell(cell:string,text:string) {
  const data = await ipcRenderer.invoke('change-cell',cell,text);
  return true;
}

export async function deleteRow(cell:string) {
  const data = await ipcRenderer.invoke('delete-row',cell);
  return true;
}

export async function filterFile(cell:string,filterName:string,filters:boolean) {
  const data = await ipcRenderer.invoke('filter-file',cell,filterName,filters);
  return true;
}

export async function createRow(dataRow:any) {
  const data = await ipcRenderer.invoke('create-row',dataRow);
  return true;
}
export async function deleteAllRowPrint() {
  const data = await ipcRenderer.invoke('delete-all-print');
  return true;
}

export async function addRowPrint(cell:number) {
  const data = await ipcRenderer.invoke('add-row-print',cell);
  return true;
}
export async function deleteRowPrint(cell:number) {
  const data = await ipcRenderer.invoke('delete-row-print',cell);
  return true;
}
export async function printFile() {
  const data = await ipcRenderer.invoke('print-file');
  if(data) await ipcRenderer.invoke('test');
  return data;
}
export async function addAllFileToPrint(filter:boolean) {
  const data = await ipcRenderer.invoke('add-all-file-print',filter);
  return true;
}

export async function createCellTitle(text:string) {
  const data = await ipcRenderer.invoke('create-cell-title',text);
  return true;
}

export async function deleteCellTitle(cell:string) {
  const data = await ipcRenderer.invoke('delete-cell-title',cell);
  return true;
}