import { Component } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { pageSelection } from 'src/app/shared/models/models';
import { DataProveedor, Iproveedor, proveedor } from 'src/app/shared/models/proveedor';
import { routes } from 'src/app/shared/routes/routes';
import { ProveedorService } from 'src/app/shared/services/proveedor.service';
import { AgregarProveedorComponent } from './agregar-proveedor/agregar-proveedor.component';
import Swal from 'sweetalert2';
import { environment as env } from 'src/environments/environments';
import { Accion, PageSize, Paginacion, getEntityPropiedades } from 'src/app/shared/models/tabla-columna';
import { EditarProveedorComponent } from './editar-proveedor/editar-proveedor.component';
@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.scss']
})
export class ProveedorComponent {
  public routes = routes;
  ListProveedor: Array<Iproveedor> = [];
  columnas: string[] = []
  acciones: string[] = []
  proveedorSeleccionado: proveedor = new proveedor();
  dataSource!: MatTableDataSource<Iproveedor>;
  pageSize = PageSize.size;
  totalData = 0;
  skip = 0;
  serialNumberArray: Array<number> = [];
  currentPage = 1;
  bsModalRef?: BsModalRef;
  limit: number = this.pageSize;
  constructor(private modalService: BsModalService, public ProveedorService: ProveedorService) {
  }
  ngOnInit(): void {
    this.columnas = getEntityPropiedades('Proveedor');
    this.acciones = ['Editar', 'Eliminar'];
  }
  
  private getTableData(currentPage: number, pageSize: number): void {
    this.ListProveedor = [];
    this.serialNumberArray = [];
    this.ProveedorService.obtenerProveedores(env.clinicaId, currentPage, pageSize).subscribe((data: DataProveedor) => {
      this.totalData = data.totalData
      for (let index = this.skip; index < Math.min(this.limit, data.totalData); index++) {
        const serialNumber = index + 1;
        this.serialNumberArray.push(serialNumber);
      }
      this.ListProveedor = data.data;
      this.dataSource = new MatTableDataSource<Iproveedor>(this.ListProveedor);
    });
  }
  eliminarProveedor(proveedorId: string) {
    Swal.fire({
      title: '¿Seguro que deseas eliminar?',
      showDenyButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.ProveedorService.eliminarProveedor(proveedorId).subscribe(
          (response) => {
            if (response.isSuccess) {
              Swal.fire('Correcto', 'El proveedor fue eliminado correctamente del sistema', 'success');
              this.getTableData(this.currentPage, this.pageSize);
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

  crearProveedor() {
    this.bsModalRef = this.modalService.show(AgregarProveedorComponent),
      this.bsModalRef.onHidden?.subscribe(() => {
        this.getTableData(this.currentPage, this.pageSize);
      });
  }
  onAction(accion: Accion) {
    if (accion.accion == 'Crear') {
      this.crearProveedor();
    } else if (accion.accion == 'Editar') {
      this.editarProveedor(accion.fila)
    }  else if (accion.accion == 'Eliminar') {
      this.eliminarProveedor(accion.fila.diagnosticoId)
    }
      else if (accion.accion == 'Refresh') {
      this.refreshData();
    }
  }

  refreshData() {
    this.getTableData(this.currentPage, this.pageSize);
  }
  getMoreData(pag: Paginacion) {
    this.getTableData(pag.page, pag.size);
    this.currentPage = pag.page;
    this.pageSize = pag.size;
    this.skip = pag.skip;
    this.limit = pag.limit;
  }
  editarProveedor(proveedor: Iproveedor) {
    const initialState = {
      proveedorSeleccionado: proveedor.ruc
    };
    this.bsModalRef = this.modalService.show(EditarProveedorComponent, { initialState });
    this.bsModalRef.onHidden?.subscribe(() => {
      this.getTableData(this.currentPage, this.pageSize);
    });
  }
  public searchData(value: any): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.ListProveedor = this.dataSource.filteredData;
  }
  
  
  public sortData(sort: Sort) {
    const data = this.ListProveedor.slice();

    if (!sort.active || sort.direction === '') {
      this.ListProveedor = data;
    } else {
      this.ListProveedor = data.sort((a, b) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const aValue = (a as any)[sort.active];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const bValue = (b as any)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }



}

