import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as xlsx from 'xlsx';
import * as FileSaver from 'file-saver';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor() { }

  /* ------------------------------------------------------------------------------------------------------------------------------------ */
  public openPDF(data: any): void {
    html2canvas(data).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', [297, 210]);
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save(`Ventas_${new Date().getTime()}`);
    });
  }


  /* ------------------------------------------------------------------------------------------------------------------------------------ */
  public exportarExcel(datos: any, nombreArch?: string) {
    nombreArch = (nombreArch === null || nombreArch === '' || nombreArch === undefined) ? 'Documento' : nombreArch;
    const worksheet = xlsx.utils.json_to_sheet(datos);
    const workbook = { Sheets: { [nombreArch]: worksheet }, SheetNames: [nombreArch] };
    const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, nombreArch);
  }

  /* ------------------------------------------------------------------------------------------------------------------------------------ */
  public saveAsExcelFile(buffer: any, fileName: string) {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, `${fileName}_${new Date().getTime()}${EXCEL_EXTENSION}`);
  }
}
