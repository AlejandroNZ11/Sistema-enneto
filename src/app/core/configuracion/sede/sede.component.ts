import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { pageSelection } from 'src/app/shared/models/models';
import { routes } from 'src/app/shared/routes/routes';
import { SedeService } from 'src/app/shared/services/sede.service';
import { AgregarSedeComponent } from './agregar-sede/agregar-sede.component';
import { EditarSedeComponent } from './editar-sede/editar-sede.component';
import { DataSede, Isede, sede } from 'src/app/shared/models/sede';
import { environment as env } from 'src/environments/environments';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sede',
  templateUrl: './sede.component.html',
  styleUrls: ['./sede.component.scss']
})

export class SedeComponent implements OnInit{
  public routes = routes;
  public ListSede: Array<Isede> = [];
  sedeSeleccionada: sede = new sede();
  dataSource!: MatTableDataSource<Isede>;
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
  bsModalRef?: BsModalRef;
  constructor(private modalService: BsModalService, public sedeService: SedeService) {
  }
  ngOnInit() {
    this.getTableData();
  }
  private getTableData(): void {
    this.ListSede = [];
    this.serialNumberArray = [];
    this.sedeService.obtenerSedes(env.clinicaId,this.currentPage, this.pageSize).subscribe((data: DataSede) => {
      this.totalData = data.totalData
      for (let index = this.skip; index < Math.min(this.limit, data.totalData); index++) {
        const serialNumber = index + 1;
        this.serialNumberArray.push(serialNumber);
      }
      this.ListSede = data.data;
      this.dataSource = new MatTableDataSource<Isede>(this.ListSede);
      this.calculateTotalPages(this.totalData, this.pageSize);
    });
  }
  public searchData(value: any): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.ListSede = this.dataSource.filteredData;
  }
  public sortData(sort: Sort) {
    const data = this.ListSede.slice();

    if (!sort.active || sort.direction === '') {
      this.ListSede = data;
    } else {
      this.ListSede = data.sort((a, b) => {
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
  crearSede() {
    this.bsModalRef = this.modalService.show(AgregarSedeComponent),
      this.bsModalRef.onHidden?.subscribe(() => {
        this.getTableData();
      });
  }
  editarSede(sede: Isede) {
    this.bsModalRef = this.modalService.show(EditarSedeComponent);
    this.bsModalRef.content.sedeSeleccionada = sede.sedeId;
    this.bsModalRef.onHidden?.subscribe(() => {
      this.getTableData();
    });
  }
  eliminarSede(sedeId:string){
    Swal.fire({
      title: '¿Estas seguro que deseas eliminar?',
      showDenyButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if(result.isConfirmed){
        this.sedeService.eliminarSede(sedeId).subscribe(
          (response) => {
            if (response.isSuccess) {
              Swal.fire('Correcto', 'Sede Eliminada en el sistema correctamente.', 'success');
              this.getTableData();
              return;
            } else {
              console.error(response.message);
            }
          },
          (error) => {
            console.error(error);
          });
      }else{
        return;
      }
    })
    
  }
}
