import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared-service.service';
import { ActivatedRoute } from '@angular/router';
import { pageSelection } from 'src/app/shared/models/models';
import { IcitaMedica } from 'src/app/shared/models/cita';
import { PacienteAlergiaService } from 'src/app/shared/services/paciente-alergia.service';
import { finalize } from 'rxjs';
import { DataPacienteAlergia, IPacienteAlergia } from 'src/app/shared/models/paciente-alergia';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AgregarAlergiaPacienteComponent } from './agregar-alergia-paciente/agregar-alergia-paciente.component';
import { EditarAlergiaPacienteComponent } from './editar-alergia-paciente/editar-alergia-paciente.component';

@Component({
  selector: 'app-alergia',
  templateUrl: './alergia.component.html',
  styleUrls: ['./alergia.component.scss']
})
export class AlergiaComponent implements OnInit{
  constructor(private sharedService:SharedService ,private route: ActivatedRoute, private pacienteAlergiaService: PacienteAlergiaService,private modalService: BsModalService, ) { }


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

  pacienteAlergiasList: Array<IPacienteAlergia> = [];

  isLoading = false;
  pacienteId = "";

  //modal
  bsModalRef?: BsModalRef;

  ngOnInit() {


    this.route.params.subscribe(params => {
      this.pacienteId = params['pacienteId'];
    })

    this.sharedService.setPacienteId(this.pacienteId);

    this.obtenerConsultaPaciente();
  }

  obtenerConsultaPaciente(){
    this.pacienteAlergiaService.obtenerPacienteExploracion(this.pacienteId)
    .pipe(
            finalize(() => this.isLoading = false)
          )
          .subscribe((data: DataPacienteAlergia) => {
            console.log("Respuesta del Servidor:", data);


            this.totalData = data.totalData
        console.log(this.totalData)
        for (let index = this.skip; index < Math.min(this.limit, this.totalData); index++) {
          const serialNumber = index + 1;
          this.serialNumberArray.push(serialNumber);
        }


            this.pacienteAlergiasList = data.data;
            console.log("Consulta del Paciente")
            console.log(this.pacienteAlergiasList)


          });
  }

  crearAlergiaPaciente() {
    this.bsModalRef = this.modalService.show(AgregarAlergiaPacienteComponent)
  }

  editarAlmacen(alergiaId: string) {
    const initialState = {
    alergiaSeleccionada: alergiaId
    };
    this.bsModalRef = this.modalService.show(EditarAlergiaPacienteComponent, { initialState});

}

  public getMoreData(event: string): void {
    if (event == 'next') {
      this.currentPage++;
      this.pageIndex = this.currentPage - 1;
      this.limit += this.pageSize;
      this.skip = this.pageSize * this.pageIndex;
      this.obtenerConsultaPaciente();
    } else if (event == 'previous') {
      this.currentPage--;
      this.pageIndex = this.currentPage - 1;
      this.limit -= this.pageSize;
      this.skip = this.pageSize * this.pageIndex;
      this.obtenerConsultaPaciente();
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
    this.obtenerConsultaPaciente();
  }

}
