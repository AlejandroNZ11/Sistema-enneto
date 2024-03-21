import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared-service.service';
import { ActivatedRoute } from '@angular/router';
import { pageSelection } from 'src/app/shared/models/models';
import { IcitaMedica } from 'src/app/shared/models/cita';
import { PacienteAlergiaService } from 'src/app/shared/services/paciente-alergia.service';
import { Subject, finalize } from 'rxjs';
import { DataPacienteAlergia, IPacienteAlergia } from 'src/app/shared/models/paciente-alergia';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { environment } from 'src/environments/environments';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { AlergiasService } from 'src/app/shared/services/alergias.service';
import { Ialergias } from 'src/app/shared/models/alergia';
import { AgregarRecetaComponent } from './agregar-receta/agregar-receta.component';
import { EditarRecetaComponent } from './editar-receta/editar-receta.component';
import { PacienteRecetaService } from 'src/app/shared/services/pacienteReceta.service';
import { IPacienteReceta, PacienteRecetaData } from 'src/app/shared/models/pacienteReceta';
import { PacienteService } from 'src/app/shared/services/paciente.service';
import { PacienteEditar } from 'src/app/shared/models/paciente';
@Component({
  selector: 'app-recetas',
  templateUrl: './recetas.component.html',
  styleUrls: ['./recetas.component.scss']
})
export class RecetasComponent implements OnInit{
  constructor(private sharedService:SharedService ,private route: ActivatedRoute, private pacienteAlergiaService: PacienteAlergiaService,private modalService: BsModalService, private alergiaService: AlergiasService, private pacienteRecetaService: PacienteRecetaService, private pacienteService:PacienteService ) { }


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
  dataSource!: MatTableDataSource<IPacienteReceta>;
  pacienteRecetaList: Array<IPacienteReceta> = [];
  public totalPages = 0;
  ListAlergias?: Ialergias[];
  pacienteData!: PacienteEditar;


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

    this.pacienteService.obtenerPaciente(this.pacienteId).subscribe((paciente:PacienteEditar)=>{
      this.pacienteData=paciente;
      console.log(this.pacienteData);
    })
  }


  getTableData(){
    this.isLoading = true;
    this.pacienteRecetaService.obtenerPacienteReceta()
    .pipe(
            finalize(() => this.isLoading = false)
          )
          .subscribe((data: PacienteRecetaData) => {
            console.log("Respuesta del Servidor:", data);


            this.totalData = data.totalData
        console.log(this.totalData)
        for (let index = this.skip; index < Math.min(this.limit, this.totalData); index++) {
          const serialNumber = index + 1;
          this.serialNumberArray.push(serialNumber);
        }


            this.pacienteRecetaList = data.data;
            console.log("Consulta del Paciente")
            console.log(this.pacienteRecetaList)


            this.dataSource = new MatTableDataSource<IPacienteReceta>(this.pacienteRecetaList);
            this.calculateTotalPages(this.totalData, this.pageSize);


          });
  }

  getAlergiaName(alergiaId: string){
    return this.ListAlergias?.find(alergia => alergia.alergiaId === alergiaId)!.nombre || '';
  }


  crearAlergiaPaciente() {

    const initialState ={
      edad$: this.pacienteData.edad
    }

    this.bsModalRef = this.modalService.show(AgregarRecetaComponent,{initialState, class:'modal-lg'});

    // this.bsModalRef.content.pacienteAlergiaAgregada$.subscribe((alergiaAgregada: boolean)=>{
    //   if(alergiaAgregada){
    //     this.getTableData();
    //   }
    // })
  }

  editarReceta(pacienteReceta: IPacienteReceta) {

    const initialState ={
      pacienteSeleccionado$:pacienteReceta,
      edad$: this.pacienteData.edad
    }

    this.bsModalRef = this.modalService.show(EditarRecetaComponent,{initialState,class:'modal-lg'});

    // const pacienteAlergiaEditado$ = new Subject<boolean>();

    // this.bsModalRef.content.pacienteAlergiaEditado$ = pacienteAlergiaEditado$;
    // pacienteAlergiaEditado$.subscribe((pacienteAlergiaEditado:boolean)=>{
    //   if(pacienteAlergiaEditado){
    //     this.getTableData();
    //   }
    // });
    // this.bsModalRef.onHidden?.subscribe(()=>{
    //   pacienteAlergiaEditado$.unsubscribe();
    // })

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

  eliminar(pacienteRecetaId: string){
    // Swal.fire({
    //   title: '¿Estas seguro que deseas eliminar?',
    //   showDenyButton: true,
    //   confirmButtonText: 'Eliminar',
    //   denyButtonText: `Cancelar`,
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     this.pacienteAlergiaService.eliminarPacienteAlergia(pacienteRecetaId).subscribe(
    //       (response) => {
    //         if (response.isSuccess) {
    //           Swal.fire('Correcto', 'Paciente Eliminado en el sistema correctamente.', 'success');
    //           this.getTableData();
    //           return;
    //         } else {
    //           console.error(response.message);
    //         }
    //       },
    //       (error) => {
    //         console.error(error);
    //       });
    //   } else {
    //     return;
    //   }
    // })
  }



}
