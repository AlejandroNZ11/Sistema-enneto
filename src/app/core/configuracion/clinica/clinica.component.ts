import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { pageSelection } from 'src/app/shared/models/models';
import { routes } from 'src/app/shared/routes/routes';
import { ClinicasService } from 'src/app/shared/services/clinicas.service';
import { DataClinicas, Clinicas, Iclinicas } from 'src/app/shared/models/clinicas';
import { AgregrarClinicaComponent } from './agregrar-clinica/agregrar-clinica.component';
import { EditarClinicaComponent } from './editar-clinica/editar-clinica.component';
import { environment as env } from 'src/environments/environments';
import Swal from 'sweetalert2';
import { Accion, PageSize, Paginacion, getEntityPropiedades } from 'src/app/shared/models/tabla-columna';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-clinica',
  templateUrl: './clinica.component.html',
  styleUrls: ['./clinica.component.scss']
})
export class ClinicaComponent implements OnInit {
  public routes= routes;
  ListClinicas: Array<Iclinicas> = [];
  columnas: string[] = []
  acciones: string[] = []
  clinicaSeleccionado: Clinicas = new Clinicas();
  dataSource!:MatTableDataSource<Iclinicas>;
  pageSize = PageSize.size;
  totalData = 0;
  skip = 0;
  serialNumberArray: Array<number> = [];
  currentPage = 1;
  bsModalRef?: BsModalRef;
  limit: number = this.pageSize;
  constructor(private modalService: BsModalService, public clinicasService: ClinicasService ){
  }

  ngOnInit() {
    this.columnas = getEntityPropiedades('Clinicas');
    this.acciones = ['Editar', 'Eliminar'];
  }

  private getTableData(currentPage: number, pageSize: number): void {
    this.ListClinicas = [];
    this.serialNumberArray = [];
    this.clinicasService.obtenerClinicas(env.clinicaId, currentPage, pageSize).subscribe((data: DataClinicas) => {
      this.totalData = data.totalData
      for (let index = this.skip; index < Math.min(this.limit, data.totalData); index++) {
        const serialNumber = index + 1;
        this.serialNumberArray.push(serialNumber);
      }
      this.ListClinicas = data.data;
      this.dataSource = new MatTableDataSource<Iclinicas>(this.ListClinicas);
    });
  }

  getMoreData(pag: Paginacion) {
    this.getTableData(pag.page, pag.size);
    this.currentPage = pag.page;
    this.pageSize = pag.size;
    this.skip = pag.skip;
    this.limit = pag.limit;
  }


  
}
