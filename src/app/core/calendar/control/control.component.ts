/* eslint-disable @typescript-eslint/no-explicit-any */

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { finalize } from 'rxjs';
import { DataService } from 'src/app/shared/data/data.service';
import { DataControlCitaMedica, IcontrolCitaMedica } from 'src/app/shared/models/cita';
import { pageSelection, } from 'src/app/shared/models/models';
import { PacienteList } from 'src/app/shared/models/paciente';
import { ItipoCitado } from 'src/app/shared/models/tipoCitado';
import { InternalSucursal } from 'src/app/shared/models/user-logged/internal/internal-sucursal';
import { routes } from 'src/app/shared/routes/routes';
import { CitaService } from 'src/app/shared/services/cita.service';
import { PacienteService } from 'src/app/shared/services/paciente.service';
import { TipoCitadoService } from 'src/app/shared/services/tipo-citado.service';
import { UserLoggedService } from 'src/app/shared/services/user-logged.service';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss']
})
export class ControlComponent implements OnInit {
  public routes = routes;
  public citasList: Array<IcontrolCitaMedica> = [];
  dataSource!: MatTableDataSource<IcontrolCitaMedica>;
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
  @ViewChild('multiUserSearch') multiPacienteSearchInput !: ElementRef;
  pacienteSeleccionado!: string;
  listPacientesFiltrados!: PacienteList[]
  listPacientes!: PacienteList[];
  sedes!: InternalSucursal[];
  historiaSeleccionada = 'todos';
  sedeSeleccionada = 'todos';
  listEstados!: ItipoCitado[];
  estadoSeleccionado = 'todos';
  fechaInicio = new Date();
  fechaFin = new Date();
  isLoading = false;
  mostrarOpciones = false;
  constructor(public data: DataService, public pacienteService: PacienteService, public userService: UserLoggedService, public tipoCitadoService: TipoCitadoService, public citaMedicaService: CitaService) { }
  buscarPacientes() {
    const searchInput = this.multiPacienteSearchInput.nativeElement.value
      ? this.multiPacienteSearchInput.nativeElement.value.toLowerCase()
      : '';
    this.mostrarOpciones = searchInput.length >= 3;
    if (this.mostrarOpciones) {
      if (!this.listPacientesFiltrados) {
        this.listPacientesFiltrados = [...this.listPacientes];
      }
      this.listPacientes = this.listPacientesFiltrados.filter((paciente) => {
        const nombres = paciente.nombres.toLowerCase();
        const apellidos = paciente.apellidos.toLowerCase();
        if (!searchInput) {
          return true;
        }
        return nombres.includes(searchInput) || apellidos.includes(searchInput);
      });
    }
  }
  ngOnInit() {
    this.pacienteService.obtenerPacientesNombre().subscribe(data => { this.listPacientes = data; })
    this.tipoCitadoService.obtenerListaTipoCitado().subscribe(data => { this.listEstados = data; })
    this.sedes = this.userService.sucursales;
    this.obtenerCitasMedicas();
  }

  obtenerCitasMedicas() {
    this.citasList = [];
    this.serialNumberArray = [];
    this.isLoading = true;
    const inicio = this.fechaInicio.toISOString().split('T')[0]
    const fin = this.fechaFin.toISOString().split('T')[0]
    this.citaMedicaService.obtenerControlCitasMedicas(this.currentPage, this.pageSize, inicio, fin, this.sedeSeleccionada, this.estadoSeleccionado, this.historiaSeleccionada, this.pacienteSeleccionado).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe((data: DataControlCitaMedica) => {
      this.totalData = data.totalData;
      for (let index = this.skip; index < Math.min(this.limit, data.totalData); index++) {
        const serialNumber = index + 1;
        this.serialNumberArray.push(serialNumber);
      }
      this.citasList = data.data;
      this.dataSource = new MatTableDataSource<IcontrolCitaMedica>(this.citasList);
      this.calculateTotalPages(this.totalData, this.pageSize);
    })
  }

  formatoFecha(fecha: string): string {
    const [anio, mes, dia] = fecha.toString().split('T')[0].split('-');
    return `${dia}/${mes}/${anio}`;
  }
  formatoHora(hora: string): string {
    return hora.toString().split('T')[1]
  }
  lightenOrDarkenColor(hex: string) {
    /*     let r = parseInt(hex.substring(1, 3), 16);
        let g = parseInt(hex.substring(3, 5), 16);
        let b = parseInt(hex.substring(5, 7), 16);
        const brightness = (r * 0.299 + g * 0.587 + b * 0.114) / 255;
        let result;
        if (brightness > 0.5) {
          r = Math.round(r * (1 - 0.4));
          g = Math.round(g * (1 - 0.4));
          b = Math.round(b * (1 - 0.4));
          result = "#" + ((r << 16) | (g << 8) | b).toString(16).padStart(6, "0");
        } else {
          r = Math.round(r + (255 - r) * 0.75);
          g = Math.round(g + (255 - g) * 0.75);
          b = Math.round(b + (255 - b) * 0.75);
          result = "#" + ((r << 16) | (g << 8) | b).toString(16).padStart(6, "0");
        }
        return result; */
    return hex;
  }

  exportarExcel() {

  }


  public sortData(sort: Sort) {
    const data = this.citasList.slice();
    if (!sort.active || sort.direction === '') {
      this.citasList = data;
    } else {
      this.citasList = data.sort((a, b) => {
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
      this.obtenerCitasMedicas();
    } else if (event == 'previous') {
      this.currentPage--;
      this.pageIndex = this.currentPage - 1;
      this.limit -= this.pageSize;
      this.skip = this.pageSize * this.pageIndex;
      this.obtenerCitasMedicas();
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
    this.obtenerCitasMedicas();
  }

  public PageSize(): void {
    this.pageSelection = [];
    this.limit = this.pageSize;
    this.skip = 0;
    this.currentPage = 1;
    this.obtenerCitasMedicas();
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
