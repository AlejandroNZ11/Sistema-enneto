import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { pageSelection } from 'src/app/shared/models/models';
import { routes } from 'src/app/shared/routes/routes';
import { AlmacenService } from 'src/app/shared/services/almacen.service';
import { DataAlmacen, Ialmacen, almacen } from 'src/app/shared/models/almacen';
import { environment as env } from 'src/environments/environments';
import { AgregarAlmacenComponent } from './agregar-almacen/agregar-almacen.component';
import { EditarAlmacenComponent } from './editar-almacen/editar-almacen.component';
import { Accion, PageSize, Paginacion, getEntityPropiedades } from 'src/app/shared/models/tabla-columna';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-almacen',
    templateUrl: './almacen.component.html',
    styleUrls: ['./almacen.component.scss']
})
export class AlmacenComponent implements OnInit {
    public routes = routes;
    ListAlmacen: Array<Ialmacen> = [];
    AlmacenSeleccionada: almacen = new almacen();
    dataSource!: MatTableDataSource<Ialmacen>;
    columnas: string[] = []
    acciones: string[] = []
    pageSize = PageSize.size;
    totalData = 0;
    skip = 0;
    serialNumberArray: Array<number> = [];
    currentPage = 1;
    bsModalRef?: BsModalRef;
    limit: number = this.pageSize;
    
    constructor(
        public almacenService: AlmacenService, 
        private modalService: BsModalService,
        ) {  }
    ngOnInit() {
        this.columnas = getEntityPropiedades('Almacen');
        this.acciones = ['Editar', 'Eliminar'];
    }
    private getTableData(currentPage: number, pageSize: number): void {
        this.ListAlmacen = [];
        this.serialNumberArray = [];
        this.almacenService.obtenerAlmacenes(env.clinicaId, currentPage, pageSize).subscribe((data: DataAlmacen) => {
            this.totalData = data.totalData
            for (let index = this.skip; index < Math.min(this.limit, data.totalData); index++) {
                const serialNumber = index + 1;
                this.serialNumberArray.push(serialNumber);
            }
            this.ListAlmacen = data.data;
            this.dataSource = new MatTableDataSource<Ialmacen>(this.ListAlmacen);
        });
    }
    onAction(accion: Accion) {
        if (accion.accion == 'Crear') {
            this.crearAlmacen();
        } else if (accion.accion == 'Editar') {
            this.editarAlmacen(accion.fila)
        } else if (accion.accion == 'Eliminar') {
            this.eliminarAlmacen(accion.fila.almacenId)
        }
    }

    getMoreData(pag: Paginacion) {
        this.getTableData(pag.page, pag.size);
        this.currentPage = pag.page;
        this.pageSize = pag.size;
        this.skip = pag.skip;
        this.limit = pag.limit;
    }
    crearAlmacen() {
        this.bsModalRef = this.modalService.show(AgregarAlmacenComponent),
        this.bsModalRef.content.almacenAgregada$.subscribe((almacenAgregada: boolean) => {
        if (almacenAgregada) {
            this.getTableData(this.currentPage, this.pageSize);
            }
        });
    }
    editarAlmacen(almacen: Ialmacen) {
        const initialState = {
        AlmacenSeleccionada: almacen.almacenId
        };
        this.bsModalRef = this.modalService.show(EditarAlmacenComponent, { initialState });
        const almacenEditada$ = new Subject<boolean>();
        this.bsModalRef.content.almacenEditada$ = almacenEditada$;
        almacenEditada$.subscribe((almacenEditada: boolean) => {
            if (almacenEditada) {
                this.getTableData(this.currentPage, this.pageSize);
            }
        });
        this.bsModalRef.onHidden?.subscribe(() => {
            almacenEditada$.unsubscribe();   
        });
    }
    eliminarAlmacen(almacenId: string) {
        Swal.fire({
            title: '¿Estas seguro que deseas eliminar?',
            showDenyButton: true,
            confirmButtonText: 'Eliminar',
            denyButtonText: `Cancelar`,
        }).then((result) => {
            if (result.isConfirmed) {
                this.almacenService.eliminarAlmacen(almacenId).subscribe(
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
            } else {
                return;
            }
        })

    }

}

