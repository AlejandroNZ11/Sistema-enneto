import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from 'src/app/shared/data/data.service';
import { pageSelection } from 'src/app/shared/models/models';
import { routes } from 'src/app/shared/routes/routes';
import { MarcaService } from 'src/app/shared/services/marca.service';
import { AgregarMarcaComponent } from './agregar-marca/agregar-marca.component';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import Swal from 'sweetalert2';
import { DataMarca, Imarca, marca } from 'src/app/shared/models/marca';

@Component({
  selector: 'app-marca',
  templateUrl: './marca.component.html',
  styleUrls: ['./marca.component.scss']
})


export class MarcaComponent implements OnInit {
  public routes = routes;
  public ListMarca: Array<Imarca> = [];
  marcaSeleccionada: marca = new marca();
  dataSource!: MatTableDataSource<Imarca>;
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
  loading = true;

  constructor(private modalService: BsModalService, public marcaService: MarcaService, ) {
  }
  ngOnInit() {
    
    this.getTableData();
  }
  private getTableData(): void {
    this.ListMarca= [];
    this.serialNumberArray = [];
    this.marcaService.obtenerMarca("D30C2D1E-E883-4B2D-818A-6813E15046E6",this.currentPage, this.pageSize).subscribe((data: DataMarca) => {
      this.loading = false;
      this.totalData = data.totalData
      for (let index = this.skip; index < Math.min(this.limit, data.totalData); index++) {
        const serialNumber = index + 1;
        this.serialNumberArray.push(serialNumber);
      }
      this.ListMarca = data.data;
      this.dataSource = new MatTableDataSource<Imarca>(this.ListMarca);
      this.calculateTotalPages(this.totalData, this.pageSize);
    });
  }
  public searchData(value: any): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.ListMarca = this.dataSource.filteredData;
  }
  public sortData(sort: Sort) {
    const data = this.ListMarca.slice();

    if (!sort.active || sort.direction === '') {
      this.ListMarca = data;
    } else {
      this.ListMarca = data.sort((a, b) => {
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
  crearMarca() {
    this.bsModalRef = this.modalService.show(AgregarMarcaComponent),
      this.bsModalRef.onHidden?.subscribe(() => {
        this.getTableData();
      });
  }
 
}

