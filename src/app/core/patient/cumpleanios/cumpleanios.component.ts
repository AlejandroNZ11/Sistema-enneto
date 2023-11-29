/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, OnInit, inject } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BsModalService } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';
import { pageSelection } from 'src/app/shared/models/models';
import { PacienteList, PacienteListData } from 'src/app/shared/models/paciente';
import { PacienteService } from 'src/app/shared/services/paciente.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-cumpleanios',
  templateUrl: './cumpleanios.component.html',
  styleUrls: ['./cumpleanios.component.scss']
})
export class CumpleaniosComponent implements OnInit {
  public patientsList: Array<PacienteList> = [];
  dataSource!: MatTableDataSource<PacienteList>;
  public showFilter = false;
  public lastIndex = 0;
  public pageSize = 10;
  public totalData = 0;
  public skip = 0;
  public limit: number = this.pageSize;
  public pageIndex = 0;
  public serialNumberArray: Array<number> = [];
  public currentPage = 1;
  public pageNumberArray: Array<number> = [];
  public pageSelection: Array<pageSelection> = [];
  public totalPages = 0;
  isLoading = false;
  selectedOption = 'hoy';
  selectedMonth = '';
  whatsappMessage = '';
  constructor(private modalService: BsModalService, public pacienteService: PacienteService) {
  }
  ngOnInit() { }
  formatoFecha(fecha: Date): string {
    const [anio, mes, dia] = fecha.toString().split('T')[0].split('-');
    return `${dia}-${mes}-${anio}`;
  }
  meses = [
    { name: 'Enero', value: '1', },
    { name: 'Febrero', value: '2', },
    { name: 'Marzo', value: '3', },
    { name: 'Abril', value: '4', },
    { name: 'Mayo', value: '5', },
    { name: 'Junio', value: '6', },
    { name: 'Julio', value: '7', },
    { name: 'Agosto', value: '8', },
    { name: 'Setiembre', value: '9', },
    { name: 'Octubre', value: '10', },
    { name: 'Noviembre', value: '11', },
    { name: 'Diciembre', value: '12', },
  ]
  public obtenerPacientesCumpleanios(): void {
    this.patientsList = [];
    this.serialNumberArray = [];
    this.isLoading = true;
    let dia = undefined
    let mes = undefined
    if (this.selectedOption === 'hoy') {
      const [Anio, Mes, Dia] = new Date().toISOString().split('T')[0].split('-');
      dia = Dia;
      mes = Mes;
    }
    if (this.selectedOption === 'mes') {
      if (this.selectedMonth) {
        mes = this.selectedMonth;
      } else {
        Swal.showLoading();
        Swal.close();
        Swal.fire('', 'Seleccione un mes', 'info');
        return;
      }
    }
    this.pacienteService.obtenerPacientesCumpleanios(this.currentPage, this.pageSize, dia, mes)
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .subscribe((data: PacienteListData) => {
        if (data.totalData > 0) {
          this.totalData = data.totalData;
          for (let index = this.skip; index < Math.min(this.limit, data.totalData); index++) {
            const serialNumber = index + 1;
            this.serialNumberArray.push(serialNumber);
          }
          this.patientsList = data.data;
          this.dataSource = new MatTableDataSource<PacienteList>(this.patientsList);
          this.calculateTotalPages(this.totalData, this.pageSize);
        } else {
          Swal.showLoading();
          Swal.close();
          Swal.fire('Ninguno', 'No se encontro ningun paciente que cumpla años', 'info');
        }
      });
  }
  #document = inject(DOCUMENT);
  enviarMensaje(numero: string) {
    const url = `https://api.whatsapp.com/send/?phone=51${numero}&text=${encodeURI(this.whatsappMessage)}`;
    const anchor = this.#document.createElement('a');
    anchor.href = url;
    anchor.target = '_blank';
    anchor.click();
    anchor.remove();
  }

  cancelar() {
    this.modalService.hide();
  }

  public sortData(sort: Sort) {
    const data = this.patientsList.slice();
    if (!sort.active || sort.direction === '') {
      this.patientsList = data;
    } else {
      this.patientsList = data.sort((a, b) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const aValue = (a as any)[sort.active];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const bValue = (b as any)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }
  public getMoreData(event: string): void {
    if (event == 'next') {
      this.currentPage++;
      this.pageIndex = this.currentPage - 1;
      this.limit += this.pageSize;
      this.skip = this.pageSize * this.pageIndex;
      this.obtenerPacientesCumpleanios();
    } else if (event == 'previous') {
      this.currentPage--;
      this.pageIndex = this.currentPage - 1;
      this.limit -= this.pageSize;
      this.skip = this.pageSize * this.pageIndex;
      this.obtenerPacientesCumpleanios();
    }
  }

  public moveToPage(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.skip = this.pageSelection[pageNumber - 1].skip;
    this.limit = this.pageSelection[pageNumber - 1].limit;
    if (pageNumber > this.currentPage) {
      this.pageIndex = pageNumber - 1;
    } else if (pageNumber < this.currentPage) {
      this.pageIndex = pageNumber + 1;
    }
    this.obtenerPacientesCumpleanios();
  }

  public PageSize(): void {
    this.pageSelection = [];
    this.limit = this.pageSize;
    this.skip = 0;
    this.currentPage = 1;
    this.obtenerPacientesCumpleanios();
  }

  private calculateTotalPages(totalData: number, pageSize: number): void {
    this.pageNumberArray = [];
    this.totalPages = totalData / pageSize;
    if (this.totalPages % 1 != 0) {
      this.totalPages = Math.trunc(this.totalPages + 1);
    }
    /* eslint no-var: off */
    for (var i = 1; i <= this.totalPages; i++) {
      var limit = pageSize * i;
      var skip = limit - pageSize;
      this.pageNumberArray.push(i);
      this.pageSelection.push({ skip: skip, limit: limit });
    }
  }
}
