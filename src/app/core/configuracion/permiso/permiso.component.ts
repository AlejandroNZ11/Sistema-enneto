import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { pageSelection } from 'src/app/shared/models/models';
import { routes } from 'src/app/shared/routes/routes';
import { PermisoService } from 'src/app/shared/services/permiso.service';
import { AgregarPermisoComponent } from './agregar-permiso/agregar-permiso.component';
import { EditarPermisoComponent } from './editar-permiso/editar-permiso.component';
import { DataPermiso, IPermiso, Permiso } from 'src/app/shared/models/permiso';
import { environment as env } from 'src/environments/environments';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-permiso',
  templateUrl: './permiso.component.html',
  styleUrls: ['./permiso.component.scss']
})
export class PermisoComponent implements OnInit {
  public routes = routes;
  public listPermisos: Array<IPermiso> = [];
  permisoSeleccionado: Permiso = new Permiso();
  dataSource!: MatTableDataSource<IPermiso>;
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
  public isLoading = false;

  public rolId = '';
  public menuId = '';

  constructor(private modalService: BsModalService, public permisoService: PermisoService) {
  }

  ngOnInit() {
    this.getTableData();
  }
  refreshData() {
    this.getTableData();
  }

  private getTableData(): void {
    this.isLoading = true;
    this.listPermisos = [];
    this.serialNumberArray = [];
    this.permisoService.obtenerPermisos(env.clinicaId, this.currentPage, this.pageSize).subscribe((data: DataPermiso) => {
      this.totalData = data.totalData;
      for (let index = this.skip; index < Math.min(this.limit, data.totalData); index++) {
        const serialNumber = index + 1;
        this.serialNumberArray.push(serialNumber);
      }
      this.isLoading = false;
      this.listPermisos = data.data;
      this.dataSource = new MatTableDataSource<IPermiso>(this.listPermisos);
      this.calculateTotalPages(this.totalData, this.pageSize);
    });
  }


  public searchData(value: string): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.listPermisos = this.dataSource.filteredData;
  }

  public sortData(sort: Sort) {
    const data = this.listPermisos.slice();
    if (!sort.active || sort.direction === '') {
      this.listPermisos = data;
    } else {
      this.listPermisos = data.sort((a, b) => {
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
    for (let i = 1; i <= this.totalPages; i++) {
      const limit = pageSize * i;
      const skip = limit - pageSize;
      this.pageNumberArray.push(i);
      this.pageSelection.push({ skip: skip, limit: limit });
    }
  }

  crearPermiso() {
    this.bsModalRef = this.modalService.show(AgregarPermisoComponent);
    this.bsModalRef.onHidden?.subscribe(() => {
      this.getTableData();
    });
  }

  editarPermiso(permiso: IPermiso) {
    this.bsModalRef = this.modalService.show(EditarPermisoComponent);
    this.bsModalRef.content.permisoSeleccionado = permiso.permisoId;
    this.bsModalRef.onHidden?.subscribe(() => {
      this.getTableData();
    });
  }

  eliminarPermiso(permisoId: string) {
    Swal.fire({
      title: '¿Estás seguro que deseas eliminar?',
      showDenyButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.permisoService.eliminarPermiso(permisoId).subscribe(
          (response) => {
            if (response.isSuccess) {
              Swal.fire('Correcto', 'Permiso eliminado en el sistema correctamente.', 'success');
              this.getTableData();
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
    });
  }
}
