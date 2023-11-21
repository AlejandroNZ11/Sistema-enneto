import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { routes } from 'src/app/shared/routes/routes';
import { ClientesService } from 'src/app/shared/services/clientes.service';
import { DataClientes,clientes,IClientes} from 'src/app/shared/models/clientes';
import { environment as env } from 'src/environments/environments';
import Swal from 'sweetalert2';
import { Accion, PageSize, Paginacion, getEntityPropiedades } from 'src/app/shared/models/tabla-columna';
import { AgregarClienteComponent } from './agregar-cliente/agregar-cliente.component';
import { EditarClienteComponent } from './editar-cliente/editar-cliente.component';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {
  public routes = routes;
  ListClientes: Array<IClientes> = [];
  columnas: string[] = []
  acciones: string[] = []
  clienteSeleccionado: clientes = new clientes();
  dataSource!: MatTableDataSource<IClientes>;
  pageSize = PageSize.size;
  totalData = 0;
  skip = 0;
  serialNumberArray: Array<number> = [];
  currentPage = 1;
  bsModalRef?: BsModalRef;
  limit: number = this.pageSize;
  constructor(private modalService: BsModalService, public clientesService: ClientesService) {
  }

  ngOnInit() {
    this.columnas = getEntityPropiedades('Clientes');
    this.acciones = ['Editar', 'Eliminar'];
  }
  private getTableData(currentPage: number, pageSize: number): void {
    this.ListClientes = [];
    this.serialNumberArray = [];
    this.clientesService.obtenerClientes(env.clinicaId, currentPage, pageSize).subscribe((data: DataClientes) => {
      this.totalData = data.totalData
      for (let index = this.skip; index < Math.min(this.limit, data.totalData); index++) {
        const serialNumber = index + 1;
        this.serialNumberArray.push(serialNumber);
      }
      this.ListClientes = data.data;
      this.dataSource = new MatTableDataSource<IClientes>(this.ListClientes);
    });
  }

  onAction(accion: Accion) {
    if (accion.accion == 'Crear') {
      this.crearCliente();
    } else if (accion.accion == 'Editar') {
      this.editarCliente(accion.fila)
    } else if (accion.accion == 'Eliminar') {
      this.eliminarCliente(accion.fila.clienteId)
    }
  }

  getMoreData(pag: Paginacion) {
    this.getTableData(pag.page, pag.size);
    this.currentPage = pag.page;
    this.pageSize = pag.size;
    this.skip = pag.skip;
    this.limit = pag.limit;
  }

  crearCliente() {
    this.bsModalRef = this.modalService.show(AgregarClienteComponent),
      this.bsModalRef.onHidden?.subscribe(() => {
        this.getTableData(this.currentPage, this.pageSize);
      });
  }
  editarCliente(Clientes: IClientes) {
    const initialState = {
      clienteSeleccionado: Clientes.clienteId
    };
    this.bsModalRef = this.modalService.show(EditarClienteComponent, { initialState });
    this.bsModalRef.onHidden?.subscribe(() => {
      this.getTableData(this.currentPage, this.pageSize);
    });
  }
  eliminarCliente(clienteId: string) {
    Swal.fire({
      title: '¿Estas seguro que deseas eliminar?',
      showDenyButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.clientesService.eliminarCliente(clienteId).subscribe(
          (response) => {
            if (response.isSuccess) {
              Swal.fire('Correcto', 'Cliente Eliminado en el sistema correctamente.', 'success');
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
