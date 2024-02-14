import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared-service.service';
import { ActivatedRoute } from '@angular/router';
import { pageSelection } from 'src/app/shared/models/models';
import { IcitaMedica } from 'src/app/shared/models/cita';
import { PacienteAlergiaService } from 'src/app/shared/services/paciente-alergia.service';
import { Subject, finalize } from 'rxjs';
import { DataPacienteAlergia, IPacienteAlergia } from 'src/app/shared/models/paciente-alergia';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AgregarAlergiaPacienteComponent } from './agregar-alergia-paciente/agregar-alergia-paciente.component';
import { EditarAlergiaPacienteComponent } from './editar-alergia-paciente/editar-alergia-paciente.component';
import { environment } from 'src/environments/environments';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { AlergiasService } from 'src/app/shared/services/alergias.service';
import { Ialergias } from 'src/app/shared/models/alergia';
import { diagnostico } from '../../../../../shared/models/diagnostico';
@Component({
  selector: 'app-alergia',
  templateUrl: './alergia.component.html',
  styleUrls: ['./alergia.component.scss']
})
export class AlergiaComponent implements OnInit{
  constructor(private sharedService:SharedService ,private route: ActivatedRoute, private pacienteAlergiaService: PacienteAlergiaService,private modalService: BsModalService, private alergiaService: AlergiasService ) { }


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
  dataSource!: MatTableDataSource<IPacienteAlergia>;
  pacienteAlergiasList: Array<IPacienteAlergia> = [];
  public totalPages = 0;
  ListAlergias?: Ialergias[];

  isLoading = false;
  pacienteId = "";

  //modal
  bsModalRef?: BsModalRef;

  ngOnInit() {



    this.route.params.subscribe(params => {
      this.pacienteId = params['pacienteId'];
    })

    this.sharedService.setPacienteId(this.pacienteId);

    this.getTableData();
  }


  getTableData(){
    this.isLoading = true;
    this.pacienteAlergiaService.obtenerPacienteAlergiaList(this.pacienteId, environment.clinicaId, this.currentPage,this.pageSize)
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


            this.dataSource = new MatTableDataSource<IPacienteAlergia>(this.pacienteAlergiasList);
            this.calculateTotalPages(this.totalData, this.pageSize);


          });
  }

  getAlergiaName(alergiaId: string){
    return this.ListAlergias?.find(alergia => alergia.alergiaId === alergiaId)!.nombre || '';
  }


  crearAlergiaPaciente() {
    this.bsModalRef = this.modalService.show(AgregarAlergiaPacienteComponent);

    this.bsModalRef.content.pacienteAlergiaAgregada$.subscribe((alergiaAgregada: boolean)=>{
      if(alergiaAgregada){
        this.getTableData();
      }
    })
  }

  editar(pacienteAlergia: IPacienteAlergia) {

    const initialState ={
      pacienteAlergiaId : pacienteAlergia.pacienteAlergiaId,
      observacion:pacienteAlergia.observacion,
      alergiaId:pacienteAlergia.alergiaId

    }

    this.bsModalRef = this.modalService.show(EditarAlergiaPacienteComponent, { initialState});

    const pacienteAlergiaEditado$ = new Subject<boolean>();

    this.bsModalRef.content.pacienteAlergiaEditado$ = pacienteAlergiaEditado$;
    pacienteAlergiaEditado$.subscribe((pacienteAlergiaEditado:boolean)=>{
      if(pacienteAlergiaEditado){
        this.getTableData();
      }
    });
    this.bsModalRef.onHidden?.subscribe(()=>{
      pacienteAlergiaEditado$.unsubscribe();
    })

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

  private calculateTotalPages(totalData: number, pageSize: number): void {
    this.pageNumberArray = [];
    this.totalPages = totalData / pageSize;
    if (this.totalPages % 1 != 0) {
      this.totalPages = Math.trunc(this.totalPages + 1);
    }
    /* eslint no-var: off */
    for (var i = 1; i <= this.totalPages; i++) {
      var limit = pageSize * i;
      var skip = limit - pageSize;
      this.pageNumberArray.push(i);
      this.pageSelection.push({ skip: skip, limit: limit });
    }
  }

  eliminar(pacienteAlergiaId: string){
    Swal.fire({
      title: '¿Estas seguro que deseas eliminar?',
      showDenyButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.pacienteAlergiaService.eliminarPacienteAlergia(pacienteAlergiaId).subscribe(
          (response) => {
            if (response.isSuccess) {
              Swal.fire('Correcto', 'Paciente Eliminado en el sistema correctamente.', 'success');
              this.getTableData();
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
