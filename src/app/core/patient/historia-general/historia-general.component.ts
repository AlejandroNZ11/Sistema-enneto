import { Component, OnInit } from '@angular/core';
import { routes } from 'src/app/shared/routes/routes';
import { MatTableDataSource } from "@angular/material/table";
import { pageSelection, apiResultFormat, patientsList } from 'src/app/shared/models/models';
import { Sort } from '@angular/material/sort';
import { DataService } from 'src/app/shared/data/data.service';
import { Router } from '@angular/router';
import { PacienteService } from 'src/app/shared/services/paciente.service';
import { finalize } from 'rxjs';
import { PacienteList, PacienteListData } from 'src/app/shared/models/paciente';
import { UbicacionService } from 'src/app/shared/services/ubicacion.service';
import { Idepartamento } from 'src/app/shared/models/departamento';
import { IgradoInstruccion } from 'src/app/shared/models/estudio';
import { GradoInstruccionService } from 'src/app/shared/services/grado-instruccion.service';

@Component({
  selector: 'app-historia-general',
  templateUrl: './historia-general.component.html',
  styleUrls: ['./historia-general.component.scss']
})
export class HistoriaGeneralComponent implements OnInit {
  public routes = routes;

  // variable test
  public patientsList: Array<patientsList> = [];
   // variable API
  public patientsListAPI: Array<PacienteList> = [];

  // variable test
  dataSource!: MatTableDataSource<patientsList>;
  // variable API
  dataSourceAPI!: MatTableDataSource<PacienteList>;


  public showFilter = false;
  public searchDataValue = '';
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
  public fechaDesde = '';
  public fechaHasta = '';

  isLoading = false;
  departamento!: string;

  public paciente = '';
  public tipoPaciente = '';

  constructor(public data: DataService, private router: Router, public pacienteService: PacienteService, public ubicacionService: UbicacionService, public gradoInstService: GradoInstruccionService) {
  }

  departamentos!: Idepartamento[];
  gradosInstruccion!: IgradoInstruccion[];

  ngOnInit() {

    // Cargar departamentos
    this.ubicacionService.obtenerDepartamentos().subscribe(data => { this.departamentos = data; })

    this.gradoInstService.obtenerGradoInstruccion().subscribe(data => { this.gradosInstruccion = data; })
    this.getTableData();
    this.obtenerDatosPacientesSinFiltro();
  }

  // Traer lista de pacientes
  private obtenerDatosPacientesSinFiltro(): void {
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
        this.patientsListAPI = data.data;
        this.dataSourceAPI = new MatTableDataSource<PacienteList>(this.patientsListAPI);
        this.calculateTotalPages(this.totalData, this.pageSize);
        console.log('Lista de pacientes Historia General:', this.patientsListAPI);
      });
  }

  getGradoInstruccion(gradoId: string){
    return this.gradosInstruccion.find(grad => grad.estudioId === gradoId)?.descripcion || '';
  }

  getDepartamento(ubigeo: string): string {
    const departamentoId = ubigeo.substring(0, 2);
    return this.departamentos.find(dep => dep.departamentoId === departamentoId)?.nombre || '';
  }

  // Ubicacion del paciente
  cargarUbicacion(departamento: string, provincia: string) {
    this.departamento = this.departamentos.find(dep => dep.departamentoId === departamento)!.nombre;
  }


  formatoFecha(fecha: string): string {
    const [anio, mes, dia] = fecha.toString().split('T')[0].split('-');
    return `${dia}-${mes}-${anio}`;
  }


  obtenerDatosPacientesConFiltro(): void {
    this.patientsList = [];
    this.serialNumberArray = [];
    this.isLoading = true;
    let fechaInicioFormateado = undefined
    let fechaFinFormateado = undefined
    let paciente = undefined
    let tipoPaciente = undefined
    if (this.fechaDesde) {
      fechaInicioFormateado = new Date(this.fechaDesde).toISOString().split('T')[0];
      console.log({fechaInicioFormateado})
    }
    if (this.fechaHasta) {
      fechaFinFormateado = new Date(this.fechaHasta).toISOString().split('T')[0];
      console.log({fechaFinFormateado})
    }
    if (this.paciente) {
      paciente = this.paciente;
      console.log(paciente)

    }
    if (this.tipoPaciente != '--TODOS--') {
      tipoPaciente = this.tipoPaciente;
    }

    // if(this.paciente || this.fechaDesde & this.fechaHasta){}

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
        this.patientsListAPI = data.data;

        this.dataSourceAPI = new MatTableDataSource<PacienteList>(this.patientsListAPI);
        this.calculateTotalPages(this.totalData, this.pageSize);
      });
  }



  // Método data Json
  private getTableData(): void {
    this.patientsList = [];
    this.serialNumberArray = [];

    this.data.getPatientsList().subscribe((data: apiResultFormat) => {
      this.totalData = data.totalData;
      data.data.map((res: patientsList, index: number) => {
        const serialNumber = index + 1;
        if (index >= this.skip && serialNumber <= this.limit) {

          this.patientsList.push(res);
          this.serialNumberArray.push(serialNumber);
        }
      });
      this.dataSource = new MatTableDataSource<patientsList>(this.patientsList);
      this.calculateTotalPages(this.totalData, this.pageSize);
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public searchData(value: any): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.patientsList = this.dataSource.filteredData;
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
      this.getTableData();
    } else if (event == 'previous') {
      this.currentPage--;
      this.pageIndex = this.currentPage - 1;
      this.limit -= this.pageSize;
      this.skip = this.pageSize * this.pageIndex;
      this.getTableData();
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
    this.getTableData();
  }

  public PageSize(): void {
    this.pageSelection = [];
    this.limit = this.pageSize;
    this.skip = 0;
    this.currentPage = 1;
    this.getTableData();
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
  public aplicarFiltro(): void {
    const desde = new Date(this.fechaDesde);
    const hasta = new Date(this.fechaHasta);
    this.dataSource.filterPredicate = (data, filter) => {
      if (!desde || !hasta) {
        return true; // No se aplican filtros si alguno de los campos está vacío
      }
      const fechaRegistro = data.fechaRegistro;
      // Compara la fecha de registro con el rango seleccionado
      return fechaRegistro >= desde && fechaRegistro <= hasta;
    };
    this.dataSource.filter = 'apply';
    this.patientsList = this.dataSource.filteredData;
  }
}
