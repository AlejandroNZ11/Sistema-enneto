import { Component, OnInit } from '@angular/core';
import { environment as env } from 'src/environments/environments';
import { MatTableDataSource } from '@angular/material/table';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { routes } from 'src/app/shared/routes/routes';
import { InventarioService } from 'src/app/shared/services/inventario.service';
import { AgregarInventarioComponent } from './agregar-inventario/agregar-inventario.component';
import { DataInventario, IInventario,inventario } from 'src/app/shared/models/inventario';
import Swal from 'sweetalert2';
import { Accion, PageSize, Paginacion, getEntityPropiedades  } from 'src/app/shared/models/tabla-columna';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.scss']
})
export class InventarioComponent implements OnInit {
  public routes = routes
  Listinventario: Array<IInventario> = [];
  columnas: string[] = []
  acciones: string[] = []
  inventarioSeleccionada: inventario = new inventario();
  dataSource!: MatTableDataSource<IInventario>;
  pageSize = PageSize.size;
  totalData = 0;
  skip = 0;
  serialNumberArray: Array<number> = [];
  currentPage = 1;
  bsModalRef?: BsModalRef;
  limit: number = this.pageSize;

  constructor( 
    private modalService: BsModalService,
    public inventarioService: InventarioService,
  ) {}

  ngOnInit() {
    this.columnas = getEntityPropiedades ('Inventario');
    this.acciones = ['Editar','Eliminar'];
  }

  private getTableData(currentPage: number, pageSize: number): void {
    this.Listinventario = [];
    this.serialNumberArray = [];
    this.inventarioService.obtenerInventarios(env.clinicaId, currentPage, pageSize).subscribe((data: DataInventario) => {
      this.totalData = data.totalData
      for (let index = this.skip; index < Math.min(this.limit, data.totalData); index++) {
        const serialNumber = index + 1;
        this.serialNumberArray.push(serialNumber);
      }
      this.Listinventario = data.data;
      this.dataSource = new MatTableDataSource<IInventario>(this.Listinventario);
    });
  }

  onAction(accion: Accion) {
    if (accion.accion == 'Crear') {
      this.crearInventario();
    // } else if (accion.accion == 'Editar') {
    //   this.editarInventario(accion.fila)
    } else if (accion.accion == 'Eliminar') {
      this.eliminarInventario(accion.fila.inventarioId)
    }
  }

  getMoreData(pag: Paginacion) {
    this.getTableData(pag.page, pag.size);
    this.currentPage = pag.page;
    this.pageSize = pag.size;
    this.skip = pag.skip;
    this.limit = pag.limit;
  }

  crearInventario() {
  this.bsModalRef = this.modalService.show(AgregarInventarioComponent),
  this.bsModalRef.content.inventarioAgregada$.subscribe((inventarioAgregada: boolean) => {
    if (inventarioAgregada) {
      this.getTableData(this.currentPage, this.pageSize);
    }
  });
  }

// editarInventario(inventario: IInventario) {
//   const initialState = {
//     inventarioSeleccionada: inventario.inventarioId
//   };
//   this.bsModalRef = this.modalService.show(EditarInventarioComponent, { initialState });
//   const inventarioEditada$ = new Subject<boolean>();
//     this.bsModalRef.content.inventarioEditada$ = inventarioEditada$;
//     inventarioEditada$.subscribe((inventarioEditada: boolean) => {
//       if (inventarioEditada) {
//         this.getTableData(this.currentPage, this.pageSize);
//       }
//     });
//     this.bsModalRef.onHidden?.subscribe(() => {
//       inventarioEditada$.unsubscribe();   
//     });
//   }

  eliminarInventario(inventarioId: string) {
    Swal.fire({
      title: '¿Estas seguro que deseas eliminar?',
      showDenyButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.inventarioService.eliminarInventario(inventarioId).subscribe(
          (response) => {
            if (response.isSuccess) {
              Swal.fire(response.message, '', 'success');
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
}  
