import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DataDiagnostico, Idiagnostico, diagnostico } from 'src/app/shared/models/diagnostico';
import { routes } from 'src/app/shared/routes/routes';
import { DiagnosticoService } from 'src/app/shared/services/diagnostico.service';
import { environment as env } from 'src/environments/environments';
import Swal from 'sweetalert2';
import { CrearDiagnosticoComponent } from './crear-diagnostico/crear-diagnostico.component';
import { Sort } from '@angular/material/sort';
import { pageSelection } from 'src/app/shared/models/models';
@Component({
  selector: 'app-diagnostico',
  templateUrl: './diagnostico.component.html',
  styleUrls: ['./diagnostico.component.scss']
})
export class DiagnosticoComponent {
  public routes = routes;
  public ListDiagnostico: Array<Idiagnostico> = [];
  diagnosticoSeleccionado: diagnostico = new diagnostico();
  dataSource!: MatTableDataSource<Idiagnostico>;
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
  constructor(private modalService: BsModalService, public DiagnosticoService:DiagnosticoService) {
  }
  ngOnInit(): void {
    this.getTableData(); 
  }
  
  private getTableData(): void {
    this.ListDiagnostico = [];
    this.serialNumberArray = [];
    this.DiagnosticoService.obtenerDiagnosticos(env.clinicaId, this.currentPage, this.pageSize).subscribe((data: DataDiagnostico) => {
      this.totalData = data.totalData;
      for (let index = this.skip; index < Math.min(this.limit, data.totalData); index++) {
        const serialNumber = index + 1;
        this.serialNumberArray.push(serialNumber);
      }
      this.ListDiagnostico = data.data;
      this.dataSource = new MatTableDataSource<Idiagnostico>(this.ListDiagnostico);
      this.calculateTotalPages(this.totalData, this.pageSize);
    });
  }
  
  eliminarDiagnostico(DiagnosticoId:string){
    Swal.fire({
      title: '¿Estas seguro que deseas eliminar?',
      showDenyButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if(result.isConfirmed){
        this.DiagnosticoService.eliminarDiagnostico(DiagnosticoId).subscribe(
          (response) => {
            if (response.isSuccess) {
              Swal.fire('Correcto', 'Diagnostico eliminado en el sistema correctamente.', 'success');
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

  public searchData(value: any): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.ListDiagnostico = this.dataSource.filteredData;
  }
  
  crearDiagnostico() {
    this.bsModalRef = this.modalService.show(CrearDiagnosticoComponent),
      this.bsModalRef.onHidden?.subscribe(() => {
        this.getTableData();
      });
  }
  public sortData(sort: Sort) {
    const data = this.ListDiagnostico.slice();

    if (!sort.active || sort.direction === '') {
      this.ListDiagnostico = data;
    } else {
      this.ListDiagnostico = data.sort((a, b) => {
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