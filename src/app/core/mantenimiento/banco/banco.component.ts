import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { pageSelection } from 'src/app/shared/models/models';
import { routes } from 'src/app/shared/routes/routes';
import { BancosService } from 'src/app/shared/services/bancos.service';
import { AgregarBancoComponent } from './agregar-banco/agregar-banco.component';
import { EditarBancoComponent } from './editar-banco/editar-banco.component';
import { DataBancos, Ibancos, banco } from 'src/app/shared/models/bancos';
import { environment as env } from 'src/environments/environments';
import Swal from 'sweetalert2';
import { Accion, PageSize, Paginacion, getEntityPropiedades } from 'src/app/shared/models/tabla-columna';

@Component({
  selector: 'app-banco',
  templateUrl: './banco.component.html',
  styleUrls: ['./banco.component.scss']
})

export class BancoComponent implements OnInit{
  public routes = routes;
  Listbanco: Array<Ibancos> = [];
  columnas: string[] = []
  acciones: string[] = []
  bancoSeleccionada: banco = new banco();
  dataSource!: MatTableDataSource<Ibancos>;
  pageSize = PageSize.size;
  totalData = 0;
  skip = 0;
  serialNumberArray: Array<number> = [];
  currentPage = 1;
  bsModalRef?: BsModalRef;
  limit: number = this.pageSize;
  constructor(private modalService: BsModalService, public bancoService: BancosService) {
  }
  ngOnInit() {
    this.columnas = getEntityPropiedades('Banco');
    this.acciones = ['Editar', 'Eliminar'];
  }
  private getTableData(currentPage: number, pageSize: number): void {
    this.Listbanco = [];
    this.serialNumberArray = [];
    this.bancoService.obtenerBancos(env.clinicaId, currentPage, pageSize).subscribe((data: DataBancos) => {
      this.totalData = data.totalData
      for (let index = this.skip; index < Math.min(this.limit, data.totalData); index++) {
        const serialNumber = index + 1;
        this.serialNumberArray.push(serialNumber);
      }
      this.Listbanco = data.data;
      this.dataSource = new MatTableDataSource<Ibancos>(this.Listbanco);
    });
  }
  onAction(accion: Accion) {
    if (accion.accion == 'Crear') {
      this.crearBanco();
    } else if (accion.accion == 'Editar') {
      this.editarBanco(accion.fila)
    } else if (accion.accion == 'Eliminar') {
      this.eliminarBanco(accion.fila.bancoId)
    }
  }

  getMoreData(pag: Paginacion) {
    this.getTableData(pag.page, pag.size);
    this.currentPage = pag.page;
    this.pageSize = pag.size;
    this.skip = pag.skip;
    this.limit = pag.limit;
  }

  crearBanco() {
    this.bsModalRef = this.modalService.show(AgregarBancoComponent),
      this.bsModalRef.onHidden?.subscribe(() => {
        this.getTableData(this.currentPage, this.pageSize);
      });
  }
  editarBanco(banco: Ibancos) {
    this.bsModalRef = this.modalService.show(EditarBancoComponent);
    this.bsModalRef.content.bancoSeleccionada = banco.bancoId;
    this.bsModalRef.onHidden?.subscribe(() => {
      this.getTableData(this.currentPage, this.pageSize);
    });
  }
  eliminarBanco(bancoId:string){
    Swal.fire({
      title: '¿Estas seguro que deseas eliminar?',
      showDenyButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if(result.isConfirmed){
        this.bancoService.eliminarBanco(bancoId).subscribe(
          (response) => {
            if (response.isSuccess) {
              Swal.fire('Correcto', 'Banco Eliminado en el sistema correctamente.', 'success');
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

