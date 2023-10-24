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

@Component({
    selector: 'app-almacen',
    templateUrl: './almacen.component.html',
    styleUrls: ['./almacen.component.scss']
})
export class AlmacenComponent implements OnInit {
    public routes = routes;
    public ListAlmacen: Array<Ialmacen> = [];
    AlmacenSeleccionada: almacen = new almacen();
    dataSource!: MatTableDataSource<Ialmacen>;
    public showFilter = false;
    public BuscarDatosValue = '';
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
    constructor(public almacenService: AlmacenService, private modalService: BsModalService,) {
    }
    ngOnInit() {
        this.getTableData();
    }
    private getTableData(): void {
        this.ListAlmacen = [];
        this.serialNumberArray = [];
        this.almacenService.obtenerAlmacenes(env.clinicaId, this.currentPage, this.pageSize).subscribe((data: DataAlmacen) => {
            this.totalData = data.totalData
            for (let index = this.skip; index < Math.min(this.limit, data.totalData); index++) {
                const serialNumber = index + 1;
                this.serialNumberArray.push(serialNumber);
            }
            this.ListAlmacen = data.data;
            this.dataSource = new MatTableDataSource<Ialmacen>(this.ListAlmacen);
            this.calculateTotalPages(this.totalData, this.pageSize);
        });
    }
    public BuscarDatos(value: any): void {
        this.dataSource.filter = value.trim().toLowerCase();
        this.ListAlmacen = this.dataSource.filteredData;
    }
    public sortData(sort: Sort) {
        const data = this.ListAlmacen.slice();

        if (!sort.active || sort.direction === '') {
            this.ListAlmacen = data;
        } else {
            this.ListAlmacen = data.sort((a, b) => {
                const aValue = (a as any)[sort.active];
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
    crearAlmacen() {
        this.bsModalRef = this.modalService.show(AgregarAlmacenComponent),
            this.bsModalRef.onHidden?.subscribe(() => {
                this.getTableData();
            });
    }
}
