import { Component ,OnInit} from '@angular/core';
import { BsModalRef , BsModalService} from 'ngx-bootstrap/modal';
import { routes } from 'src/app/shared/routes/routes';
import { AgregarProductosComponent } from './agregar-productos/agregar-productos.component';
import { OperacionesService } from 'src/app/shared/services/operaciones.service';
import { MatTableDataSource } from '@angular/material/table';
import { DataProducto, Iproducto, producto } from 'src/app/shared/models/producto';
import Swal from 'sweetalert2';
import { pageSelection } from 'src/app/shared/models/models';
import { Sort } from '@angular/material/sort';
import { environment as env } from 'src/environments/environments';
import { Accion, PageSize, Paginacion, getEntityPropiedades } from 'src/app/shared/models/tabla-columna';
import { EditarProductoComponent } from './editar-producto/editar-producto.component';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent {

  public routes = routes;
  ListProducto: Array<Iproducto> = [];
  columnas: string[] = []
  acciones: string[] = []
  productoSeleccionado: producto = new producto();
  dataSource!: MatTableDataSource<Iproducto>;
  pageSize = PageSize.size;
  totalData = 0;
  skip = 0;
  serialNumberArray: Array<number> = [];
  currentPage = 1;
  bsModalRef?: BsModalRef;
  limit: number = this.pageSize;
  constructor(private modalService: BsModalService, public OperacionesService: OperacionesService) {
  }

  ngOnInit() {
    this.columnas = getEntityPropiedades('Producto');
    this.acciones = ['Editar', 'Eliminar'];
  }
  private getTableData(currentPage: number, pageSize: number): void {
    this.ListProducto = [];
    this.serialNumberArray = [];
    this.OperacionesService.obtenerProductos(env.clinicaId, currentPage, pageSize).subscribe((data: DataProducto) => {
      this.totalData = data.totalData
      for (let index = this.skip; index < Math.min(this.limit, data.totalData); index++) {
        const serialNumber = index + 1;
        this.serialNumberArray.push(serialNumber);
      }
      this.ListProducto = data.data;
      this.dataSource = new MatTableDataSource<Iproducto>(this.ListProducto);
    });
  }

  onAction(accion: Accion) {
    if (accion.accion == 'Crear') {
      this.crearProducto();
    } else if (accion.accion == 'Editar') {
      this.editarProducto(accion.fila)
    } else if (accion.accion == 'Eliminar') {
      this.eliminarProducto(accion.fila.especialidadId)
    }
  }

  getMoreData(pag: Paginacion) {
    this.getTableData(pag.page, pag.size);
    this.currentPage = pag.page;
    this.pageSize = pag.size;
    this.skip = pag.skip;
    this.limit = pag.limit;
  }

  crearProducto() {
    this.bsModalRef = this.modalService.show(AgregarProductosComponent),
      this.bsModalRef.onHidden?.subscribe(() => {
        this.getTableData(this.currentPage, this.pageSize);
      });
  }
  editarProducto(producto: Iproducto) {
    const initialState = {
      productoSeleccionado: producto.productoId
    };
    this.bsModalRef = this.modalService.show(EditarProductoComponent, { initialState });
    this.bsModalRef.onHidden?.subscribe(() => {
      this.getTableData(this.currentPage, this.pageSize);
    });
  }
  eliminarProducto(productoId: string) {
    Swal.fire({
      title: '¿Seguro que deseas eliminar?',
      showDenyButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.OperacionesService.eliminarProducto(productoId).subscribe(
          (response) => {
            if (response.isSuccess) {
              Swal.fire('Correcto', 'El producto fue eliminado del sistema correctamente.', 'success');
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

