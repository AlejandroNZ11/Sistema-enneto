import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared-service.service';
import { ActivatedRoute } from '@angular/router';
import { pageSelection } from 'src/app/shared/models/models';
import { IcitaMedica } from 'src/app/shared/models/cita';

@Component({
  selector: 'app-alergia',
  templateUrl: './alergia.component.html',
  styleUrls: ['./alergia.component.scss']
})
export class AlergiaComponent implements OnInit{
  constructor(private sharedService:SharedService ,private route: ActivatedRoute ) { }


  public serialNumberArray: Array<number> = [];
  public totalData = 0;
  public currentPage = 1;
  public pageIndex = 0;
  public pageSize = 10;
  public limit: number = this.pageSize;
  public skip = 0;
  public pageNumberArray: Array<number> = [];
  public pageSelection: Array<pageSelection> = [];
  public citasList: Array<IcitaMedica> = [];
  citasListPaciente: Array<string> = [];

  pacienteId = "";

  ngOnInit() {


    this.route.params.subscribe(params => {
      this.pacienteId = params['pacienteId'];
    })

    this.sharedService.setPacienteId(this.pacienteId);
  }

  obtenerCitasSinFiltro(){
    return;
  }


  public getMoreData(event: string): void {
    if (event == 'next') {
      this.currentPage++;
      this.pageIndex = this.currentPage - 1;
      this.limit += this.pageSize;
      this.skip = this.pageSize * this.pageIndex;
      this.obtenerCitasSinFiltro();
    } else if (event == 'previous') {
      this.currentPage--;
      this.pageIndex = this.currentPage - 1;
      this.limit -= this.pageSize;
      this.skip = this.pageSize * this.pageIndex;
      this.obtenerCitasSinFiltro();
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
    this.obtenerCitasSinFiltro();
  }

}
