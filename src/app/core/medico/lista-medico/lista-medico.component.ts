import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/data/data.service';
import { routes } from 'src/app/shared/routes/routes';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from "@angular/material/table";
import { pageSelection, apiResultFormat, } from 'src/app/shared/models/models';
import { MedicoService } from 'src/app/shared/services/medico.service';
import { MedicoList, MedicoListData, MedicoRequest } from 'src/app/shared/models/medico';
import { environment } from 'src/environments/environments';
import { formatDate } from '@angular/common';
import Swal from 'sweetalert2';
import { finalize, timestamp } from 'rxjs';
import { Iespecialidad } from 'src/app/shared/models/especialidades';
import { EspecialidadesService } from 'src/app/shared/services/especialidades.service';

@Component({
  selector: 'app-lista-medico',
  templateUrl: './lista-medico.component.html',
  styleUrls: ['./lista-medico.component.scss']
})
export class ListaMedicoComponent implements OnInit {
  public routes = routes;
  public doctorsList: Array<MedicoList> = [];
  dataSource!: MatTableDataSource<MedicoList>;
  doctorseleccionado: MedicoRequest = new MedicoRequest();
  public showFilter = false;
  public medico = '';
  public especialidad = '';
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
  isLoading = false;
  especialidades !: Iespecialidad[];
  constructor(public data: DataService, public medicoService: MedicoService, public especialidadService: EspecialidadesService) {

  }
  ngOnInit() {
    this.especialidadService.obtenerListaEspecialidad().subscribe((data)=> this.especialidades = data);
    this.obtenerDatosMedicos();
  }

  obtenerDatosMedicos(): void {
    this.doctorsList = [];
    this.serialNumberArray = [];
    let fechaInicioFormateado = undefined
    let fechaFinFormateado = undefined
    if (this.fechaInicio != "") {
      fechaInicioFormateado = new Date(this.fechaInicio)?.toISOString().split('T')[0];
    }
    if (this.fechaFin != "") {
      fechaFinFormateado = new Date(this.fechaFin)?.toISOString().split('T')[0];
    }
    this.medicoService.obtenerMedicos(environment.clinicaId, this.currentPage, this.pageSize, fechaInicioFormateado, fechaFinFormateado, this.medico, this.especialidad)
      .subscribe((data: MedicoListData) => {
        this.totalData = data.totalData;
        for (let index = this.skip; index < Math.min(this.limit, data.totalData); index++) {
          const serialNumber = index + 1;
          this.serialNumberArray.push(serialNumber);
        }
        this.doctorsList = data.data;
        this.dataSource = new MatTableDataSource<MedicoList>(this.doctorsList);
        this.calculateTotalPages(this.totalData, this.pageSize);
      });
  }

  formatoFecha(fecha: string): string {
    const [anio, mes, dia] = fecha.toString().split('T')[0].split('-');
    return `${dia}/${mes}/${anio}`;
  }
  eliminar(medicoId: string) {
    Swal.fire({
      title: '¿Estas seguro que deseas eliminar?',
      showDenyButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.medicoService.eliminarMedico(medicoId).subscribe(
          (response) => {
            if (response.isSuccess) {
              Swal.fire('Correcto', 'Médico Eliminado en el sistema correctamente.', 'success');
              this.obtenerDatosMedicos();
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
  public sortData(sort: Sort) {
    const data = this.doctorsList.slice();
    if (!sort.active || sort.direction === '') {
      this.doctorsList = data;
    } else {
      this.doctorsList = data.sort((a, b) => {
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
      this.obtenerDatosMedicos();
    } else if (event == 'previous') {
      this.currentPage--;
      this.pageIndex = this.currentPage - 1;
      this.limit -= this.pageSize;
      this.skip = this.pageSize * this.pageIndex;
      this.obtenerDatosMedicos();
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
    this.obtenerDatosMedicos();
  }
  public PageSize(): void {
    this.pageSelection = [];
    this.limit = this.pageSize;
    this.skip = 0;
    this.currentPage = 1;
    this.obtenerDatosMedicos();
  }
  private calculateTotalPages(totalData: number, pageSize: number): void {
    this.pageNumberArray = [];
    this.totalPages = totalData / pageSize;
    if (this.totalPages % 1 != 0) {
      this.totalPages = Math.trunc(this.totalPages + 1);
    }
    for (var i = 1; i <= this.totalPages; i++) {
      const limit = pageSize * i;
      const skip = limit - pageSize;
      this.pageNumberArray.push(i);
      this.pageSelection.push({ skip: skip, limit: limit });
    }
  }
}

