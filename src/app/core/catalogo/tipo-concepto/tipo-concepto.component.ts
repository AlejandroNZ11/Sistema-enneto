import { Component, OnInit } from '@angular/core';
import { pageSelection, } from 'src/app/shared/models/models';
import { EditarTipoConceptoComponent } from './editar-tipo-concepto/editar-tipo-concepto.component';
import { AgregarTipoConceptoComponent } from './agregar-tipo-concepto/agregar-tipo-concepto.component';
import { Sort } from '@angular/material/sort';
import { TipoConceptoService } from 'src/app/shared/services/tipo-concepto.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MatTableDataSource } from '@angular/material/table';
import { routes } from 'src/app/shared/routes/routes';
import { DataTipoConcepto, ItipoConcepto, tipoConcepto } from 'src/app/shared/models/tipoConcepto';

@Component({
  selector: 'app-tipo-concepto',
  templateUrl: './tipo-concepto.component.html',
  styleUrls: ['./tipo-concepto.component.scss']
})
export class TipoConceptoComponent implements OnInit{
  public routes = routes;
  public ListTipoConceptos: Array<ItipoConcepto> = [];
  tipoConceptoSeleccionado: tipoConcepto = new tipoConcepto();
  dataSource!: MatTableDataSource<ItipoConcepto>;
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
  constructor(private modalService: BsModalService, public tipoConceptoService: TipoConceptoService) {
  }
  ngOnInit() {
    this.getTableData();
  }
  private getTableData(): void {
    this.ListTipoConceptos = [];
    this.serialNumberArray = [];
    this.tipoConceptoService.obtenerTiposConceptos("D30C2D1E-E883-4B2D-818A-6813E15046E6",this.currentPage, this.pageSize).subscribe((data: DataTipoConcepto) => {
      this.totalData = data.totalData
      for (let index = this.skip; index < Math.min(this.limit, data.totalData); index++) {
        const serialNumber = index + 1;
        this.serialNumberArray.push(serialNumber);
      }
      this.ListTipoConceptos = data.data;
      this.dataSource = new MatTableDataSource<ItipoConcepto>(this.ListTipoConceptos);
      this.calculateTotalPages(this.totalData, this.pageSize);
    });
  }
  public searchData(value: any): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.ListTipoConceptos = this.dataSource.filteredData;
  }
  public sortData(sort: Sort) {
    const data = this.ListTipoConceptos.slice();

    if (!sort.active || sort.direction === '') {
      this.ListTipoConceptos = data;
    } else {
      this.ListTipoConceptos = data.sort((a, b) => {
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
    /* eslint no-var: off */
    for (var i = 1; i <= this.totalPages; i++) {
      const limit = pageSize * i;
      const skip = limit - pageSize;
      this.pageNumberArray.push(i);
      this.pageSelection.push({ skip: skip, limit: limit });
    }
  }
  crearTipoConcepto() {
    this.bsModalRef = this.modalService.show(AgregarTipoConceptoComponent),
      this.bsModalRef.onHidden?.subscribe(() => {
        this.getTableData();
      });
  }
  editarTipoConcepto(tipoConcepto: tipoConcepto) {
    this.bsModalRef = this.modalService.show(EditarTipoConceptoComponent);
    this.bsModalRef.content.especialidadSeleccionada = tipoConcepto.descripcion;
    this.bsModalRef.onHidden?.subscribe(() => {
      this.getTableData();
    });
  }
}



