/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { routes } from 'src/app/shared/routes/routes';
import { MatTableDataSource } from "@angular/material/table";
import { pageSelection } from 'src/app/shared/models/models';
import { Sort } from '@angular/material/sort';
import { DataService } from 'src/app/shared/data/data.service';
import Swal from 'sweetalert2';
import { PacienteService } from 'src/app/shared/services/paciente.service';
import { PacienteListData, PacienteList, PacienteRequest } from 'src/app/shared/models/paciente';
import { TipoPacienteService } from 'src/app/shared/services/tipo-paciente.service';
import { ItipoPaciente } from 'src/app/shared/models/tipoPaciente';
import { finalize } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CumpleaniosComponent } from '../cumpleanios/cumpleanios.component';

@Component({
  selector: 'app-patients-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.scss']
})
export class PatientsListComponent implements OnInit {
  public routes = routes;
  public patientsList: Array<PacienteList> = [];
  dataSource!: MatTableDataSource<PacienteList>;
  pacienteSeleccionado: PacienteRequest = new PacienteRequest();
  public showFilter = false;
  public paciente = '';
  public tipoPaciente = '';
  public fechaInicio = '';
  public fechaFin = '';
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

  tiposPacientes!: ItipoPaciente[];
  isLoading = false;
  bsModalRef?: BsModalRef;
  constructor(private modalService: BsModalService, public data: DataService, public pacienteService: PacienteService, public tipoPacienteService: TipoPacienteService) {

  }
  ngOnInit() {
    this.tipoPacienteService.obtenerTipoPacientes().subscribe(data => { this.tiposPacientes = data; })
    this.obtenerDatosPacientes();

  }
  obtenerDatosPacientes(): void {
    this.patientsList = [];
    this.serialNumberArray = [];
    this.isLoading = true;
    this.pacienteService.obtenerPacientes(this.currentPage, this.pageSize)
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .subscribe((data: PacienteListData) => {
        this.totalData = data.totalData;
        for (let index = this.skip; index < Math.min(this.limit, data.totalData); index++) {
          const serialNumber = index + 1;
          this.serialNumberArray.push(serialNumber);
        }
        this.patientsList = data.data;
        this.dataSource = new MatTableDataSource<PacienteList>(this.patientsList);
        this.calculateTotalPages(this.totalData, this.pageSize);

      });

  }
  obtenerDatosPacientesConFiltro(): void {
    this.patientsList = [];
    this.serialNumberArray = [];
    this.isLoading = true;
    let fechaInicioFormateado = undefined
    let fechaFinFormateado = undefined
    let paciente = undefined
    let tipoPaciente = undefined
    if (this.fechaInicio) {
      fechaInicioFormateado = new Date(this.fechaInicio).toISOString().split('T')[0];
    }
    if (this.fechaFin) {
      fechaFinFormateado = new Date(this.fechaFin).toISOString().split('T')[0];
    }
    if (this.paciente) {
      paciente = this.paciente;
    }
    if (this.tipoPaciente != 'Todos') {
      tipoPaciente = this.tipoPaciente;
    }
    this.pacienteService.obtenerPacientes(this.currentPage, this.pageSize, fechaInicioFormateado, fechaFinFormateado, paciente, tipoPaciente)
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .subscribe((data: PacienteListData) => {
        this.totalData = data.totalData;
        for (let index = this.skip; index < Math.min(this.limit, data.totalData); index++) {
          const serialNumber = index + 1;
          this.serialNumberArray.push(serialNumber);
        }
        this.patientsList = data.data;
        this.dataSource = new MatTableDataSource<PacienteList>(this.patientsList);
        this.calculateTotalPages(this.totalData, this.pageSize);
      });
  }
  limpiarCampos() {
    this.fechaInicio = '';
    this.fechaFin = '';
    this.paciente = '';
    this.tipoPaciente = '';
    this.obtenerDatosPacientes();
  }
  formatoFecha(fecha: string): string {
    const [anio, mes, dia] = fecha.toString().split('T')[0].split('-');
    return `${dia}-${mes}-${anio}`;
  }

  eliminar(pacienteId: string) {
    Swal.fire({
      title: '¿Estas seguro que deseas eliminar?',
      showDenyButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.pacienteService.eliminarPaciente(pacienteId).subscribe(
          (response) => {
            if (response.isSuccess) {
              Swal.fire('Correcto', 'Paciente Eliminado en el sistema correctamente.', 'success');
              this.obtenerDatosPacientes();
              return;
            } else {
              console.error(response.message);
            }
          },
          (error) => {
            console.error(error);
          });
      } else {
        return;
      }
    })
  }

  modalCumpleanios() {
    const initialState = {
    };
    const modalOptions = {
      class: 'modal-lg',
      ignoreBackdropClick: true,
      initialState,
    };
    this.bsModalRef = this.modalService.show(CumpleaniosComponent, modalOptions),
      this.bsModalRef.onHidden?.subscribe(() => { });
  }

  public sortData(sort: Sort) {
    const data = this.patientsList.slice();

    if (!sort.active || sort.direction === '') {
      this.patientsList = data;
    } else {
      this.patientsList = data.sort((a, b) => {
        const aValue = (a as any)[sort.active];
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
      this.obtenerDatosPacientes();
    } else if (event == 'previous') {
      this.currentPage--;
      this.pageIndex = this.currentPage - 1;
      this.limit -= this.pageSize;
      this.skip = this.pageSize * this.pageIndex;
      this.obtenerDatosPacientes();
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
    this.obtenerDatosPacientes();
  }

  public PageSize(): void {
    this.pageSelection = [];
    this.limit = this.pageSize;
    this.skip = 0;
    this.currentPage = 1;
    this.obtenerDatosPacientes();
  }

  private calculateTotalPages(totalData: number, pageSize: number): void {
    this.pageNumberArray = [];
    this.totalPages = totalData / pageSize;
    if (this.totalPages % 1 != 0) {
      this.totalPages = Math.trunc(this.totalPages + 1);
    }
    for (let i = 1; i <= this.totalPages; i++) {
      const limit = pageSize * i;
      const skip = limit - pageSize;
      this.pageNumberArray.push(i);
      this.pageSelection.push({ skip: skip, limit: limit });
    }
  }
}
