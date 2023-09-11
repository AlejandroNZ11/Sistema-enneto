import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/data/data.service';
import { routes } from 'src/app/shared/routes/routes';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from "@angular/material/table";
import { pageSelection, apiResultFormat, DoctorRequest, DoctorResponse, DoctorListData} from 'src/app/shared/models/models';
import { DoctorService } from 'src/app/shared/services/doctor.service';
interface dataGuid {
  value: string;
  guid: string;
}
@Component({
  selector: 'app-doctors-list',
  templateUrl: './doctors-list.component.html',
  styleUrls: ['./doctors-list.component.scss']
})
export class DoctorsListComponent implements OnInit{
  public routes = routes;
  public doctorsList: Array<DoctorResponse> = [];
  dataSource!: MatTableDataSource<DoctorResponse>;
  doctorseleccionado: DoctorRequest = new DoctorRequest();
  public showFilter = false;
  public searchDataValueNombre = '';
  public searchDataValueEspecialidad = '';
  public fechaDesde = '';
  public fechaHasta = '';
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
  especialidad_LISTA: dataGuid[] = [
    { value: 'Ortodoncia', guid: '6b9e5b30-9b94-4f78-a090-6e01d5b16201' },
    { value: 'Odontopediatría', guid: '8a0a6a3e-7315-45d7-a54d-c6473c5f8d17' },
    { value: 'Implantología', guid: '69121893-3AFC-4F92-85F3-40BB5E7C7E29' },
    { value: 'General', guid: 'CB77CCE6-C2CB-471B-BDD4-5DAC8C93B756' },
    { value: 'Endodoncia', guid: '4B900A74-E2D9-4837-B9A4-9E828752716E' },
    { value: 'Cirugia bocal y Maxilofacial', guid: 'AEDC617C-D035-4213-B55A-DAE5CDFCA366' },
  ];
  constructor(public data : DataService,public doctorService: DoctorService){

  }
  ngOnInit() {
    this.getTableData();
  }
  private getTableData(): void {
    this.doctorsList = [];
    this.serialNumberArray = [];
    this.doctorService.obtenerDoctores("D30C2D1E-E883-4B2D-818A-6813E15046E6",this.currentPage, this.pageSize).subscribe((data: DoctorListData) => {
      this.totalData = data.totalData;
      for (let index = this.skip; index < Math.min(this.limit, data.totalData); index++) {
        const serialNumber = index + 1;
        this.serialNumberArray.push(serialNumber);
      }
      this.doctorsList = data.data;
      this.dataSource = new MatTableDataSource<DoctorResponse>(this.doctorsList);
      this.calculateTotalPages(this.totalData, this.pageSize);
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public searchData(value: any): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.doctorsList = this.dataSource.filteredData;
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
    this.doctorsList = this.dataSource.filteredData;
  }

  public sortData(sort: Sort) {
    const data = this.doctorsList.slice();
    if (!sort.active || sort.direction === '') {
      this.doctorsList = data;
    } else {
      this.doctorsList = data.sort((a, b) => {
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
      const limit = pageSize * i;
      const skip = limit - pageSize;
      this.pageNumberArray.push(i);
      this.pageSelection.push({ skip: skip, limit: limit });
    }
  }
}
