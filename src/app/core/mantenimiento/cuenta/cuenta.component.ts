import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { routes } from 'src/app/shared/routes/routes';
import { CuentaService } from 'src/app/shared/services/cuenta.service';
import { AgregarCuentaComponent } from './agregar-cuenta/agregar-cuenta.component';
import { EditarCuentaComponent } from './editar-cuenta/editar-cuenta.component';
import { DataCuenta, Icuenta, cuenta } from 'src/app/shared/models/cuenta';
import { environment as env } from 'src/environments/environments';
import Swal from 'sweetalert2';
import { Accion, PageSize, Paginacion, getEntityPropiedades } from 'src/app/shared/models/tabla-columna';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.scss']
})
export class CuentaComponent implements OnInit{
  public routes = routes;
  ListCuenta: Array<Icuenta> = [];
  columnas: string[] = []
  acciones: string[] = []
  cuentaSeleccionada: cuenta = new cuenta();
  dataSource!: MatTableDataSource<Icuenta>;
  pageSize = PageSize.size;
  totalData = 0;
  skip = 0;
  serialNumberArray: Array<number> = [];
  currentPage = 1;
  bsModalRef?: BsModalRef;
  limit: number = this.pageSize;
  constructor(private modalService: BsModalService, public cuentaService: CuentaService) {
  }

  ngOnInit() {
    this.columnas = getEntityPropiedades('Cuenta');
    this.acciones = ['Editar', 'Eliminar'];
  }
  private getTableData(currentPage: number, pageSize: number): void {
    this.ListCuenta = [];
    this.serialNumberArray = [];
    this.cuentaService.obtenerCuentas(env.clinicaId, currentPage, pageSize).subscribe((data: DataCuenta) => {
      this.totalData = data.totalData
      for (let index = this.skip; index < Math.min(this.limit, data.totalData); index++) {
        const serialNumber = index + 1;
        this.serialNumberArray.push(serialNumber);
      }
      this.ListCuenta = data.data;
      this.dataSource = new MatTableDataSource<Icuenta>(this.ListCuenta);
    });
  }

  onAction(accion: Accion) {
    if (accion.accion == 'Crear') {
      this.crearCuenta();
    } else if (accion.accion == 'Editar') {
      this.editarCuenta(accion.fila)
    } else if (accion.accion == 'Eliminar') {
      this.eliminarCuenta(accion.fila.cuentaPagarId)
    }
  }

  getMoreData(pag: Paginacion) {
    this.getTableData(pag.page, pag.size);
    this.currentPage = pag.page;
    this.pageSize = pag.size;
    this.skip = pag.skip;
    this.limit = pag.limit;
  }
  crearCuenta() {
    this.bsModalRef = this.modalService.show(AgregarCuentaComponent);
  
    this.bsModalRef.content.cuentaAgregada$.subscribe((cuentaAgregada: boolean) => {
      if (cuentaAgregada) {
        this.getTableData(this.currentPage, this.pageSize);
      }
    });
  }
  
  editarCuenta(cuenta: Icuenta) {
    const initialState = {
      cuentaSeleccionada: cuenta.cuentaPagarId
    };
  
    this.bsModalRef = this.modalService.show(EditarCuentaComponent, { initialState });
    const cuentaEditada$ = new Subject<boolean>();
    this.bsModalRef.content.cuentaEditada$ = cuentaEditada$;
    cuentaEditada$.subscribe((cuentaEditada: boolean) => {
      if (cuentaEditada) {
        this.getTableData(this.currentPage, this.pageSize);
      }
    });
    this.bsModalRef.onHidden?.subscribe(() => {
      cuentaEditada$.unsubscribe();   
    });
  }
  
  eliminarCuenta(cuentaId:string){
    Swal.fire({
      title: '¿Estas seguro que deseas eliminar?',
      showDenyButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if(result.isConfirmed){
        this.cuentaService.eliminarCuenta(cuentaId).subscribe(
          (response) => {
            if (response.isSuccess) {
              Swal.fire(response.message,'', 'success');
              this.getTableData(this.currentPage, this.pageSize);
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

