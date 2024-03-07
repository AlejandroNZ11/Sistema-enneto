import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataEvolucionPaciente, IEvolucionPaciente } from 'src/app/shared/models/evolucionPaciente';
import { Accion, PageSize, Paginacion, getEntityPropiedades } from 'src/app/shared/models/tabla-columna';
import { EvolucionPacienteService } from 'src/app/shared/services/evolucionPaciente.service';
import { SharedService } from '../services/shared-service.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AgregarEvolucionPacienteComponent } from './agregar-evolucion-paciente/agregar-evolucion-paciente.component';
import { environment as env } from 'src/environments/environments';
import { EspecialidadesService } from 'src/app/shared/services/especialidades.service';
import { Iespecialidad } from 'src/app/shared/models/especialidades';
import { MedicoService } from 'src/app/shared/services/medico.service';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { EditarEvolucionPacienteComponent } from './editar-evolucion-paciente/editar-evolucion-paciente.component';
import { Subject } from 'rxjs';

interface EvolucionPacienteDTO {
  pacienteEvolucionId:string;
  fechaEvolucion: string;
  especialidad?: string;
  medico?: string;
  descripcion: string;
  estado:number;
}

@Component({
  selector: 'app-evolucion',
  templateUrl: './evolucion.component.html',
  styleUrls: ['./evolucion.component.scss']
})
export class EvolucionComponent implements OnInit{

  constructor(public evolucionPacienteService: EvolucionPacienteService, private route: ActivatedRoute, public sharedService: SharedService, private modalService: BsModalService, public especialidadService: EspecialidadesService, public medicoService: MedicoService){}

  pacienteId="";

  totalData = 0;
  serialNumberArray: Array<number> = [];
  columnas: string[] = []
  acciones: string[] = []
  currentPage = 1;
  pageSize = PageSize.size;
  skip = 0;
  limit: number = this.pageSize;
  ListEvolucionPaciente: Array<IEvolucionPaciente> = [];
  ListEvolucionPacienteDto: Array<EvolucionPacienteDTO> = [];
  ListEvolucionPacienteDtoOutput: Array<EvolucionPacienteDTO> = [];

  dataSource!: MatTableDataSource<EvolucionPacienteDTO>;
  bsModalRef?: BsModalRef;
  listEspecialidadesCitas!: Iespecialidad[];
  nombreMedico='';
  mySkip =0;



  ngOnInit(): void {

     this.columnas = getEntityPropiedades('EvolucionPaciente')
     this.acciones = ['Editar', 'Eliminar'];

     this.route.params.subscribe(params => {
      this.pacienteId = params['pacienteId'];
    })
    console.log(this.pacienteId)
    this.sharedService.setPacienteId(this.pacienteId);

  }


  onAction(accion: Accion) {
    if (accion.accion == 'Crear') {
      this.crearEvolucionPaciente();
    } else if (accion.accion == 'Editar') {
      this.editarEvolucionPaciente(accion.fila)
    } else if (accion.accion == 'Eliminar') {
      this.eliminarEvolucionPaciente(accion.fila.pacienteEvolucionId)
    }
  }

  getTableData(currentPage: number, pageSize: number):void{
    this.ListEvolucionPaciente =[];
    this.serialNumberArray = [];
    this.ListEvolucionPacienteDto =[];
    this.ListEvolucionPacienteDtoOutput =[];
    this.mySkip=0;

    this.evolucionPacienteService.obtenerEvolucionPacienteList(env.clinicaId,currentPage,pageSize, this.pacienteId).subscribe((data: DataEvolucionPaciente)=>{
      this.totalData = data.totalData

      console.log(data.data)
      for (let index = this.skip; index < Math.min(this.limit, data.totalData); index++) {
        const serialNumber = index + 1;
        this.serialNumberArray.push(serialNumber);




          const evolucionPaciente: EvolucionPacienteDTO = {
            pacienteEvolucionId: data.data[this.mySkip].pacienteEvolucionId,
            fechaEvolucion: this.formatoFecha(data.data[this.mySkip].fechaEvolucion),
            especialidad: data.data[this.mySkip].especialidadNombre,
            medico: data.data[this.mySkip].medicoNombre,
            descripcion: data.data[this.mySkip].descripcion,
            estado: data.data[this.mySkip].estado,
          };
          this.ListEvolucionPacienteDto.push(evolucionPaciente);

        this.mySkip++;
      }

      this.dataSource = new MatTableDataSource<EvolucionPacienteDTO>(this.ListEvolucionPacienteDtoOutput)

      this.ListEvolucionPacienteDtoOutput = this.ListEvolucionPacienteDto;
      this.ListEvolucionPaciente = data.data;
      console.log(this.ListEvolucionPacienteDtoOutput)

    })
  }

  crearEvolucionPaciente(){
    this.bsModalRef = this.modalService.show(AgregarEvolucionPacienteComponent);
    const evolucionAgregada$ = new Subject<boolean>();

    this.bsModalRef.content.evolucionAgregada$ = evolucionAgregada$
    evolucionAgregada$.subscribe((evolucionAgregada: boolean)=>{
      if (evolucionAgregada) {
        this.getTableData(this.currentPage, this.pageSize);
      }

    });
    this.bsModalRef.onHidden?.subscribe(()=>{
      evolucionAgregada$.unsubscribe();
    })
  }

  editarEvolucionPaciente(evolucion: EvolucionPacienteDTO){

    const initialState = {
      evolucionSeleccionada: evolucion.pacienteEvolucionId
    };

    this.bsModalRef = this.modalService.show(EditarEvolucionPacienteComponent, {initialState});

    const evolucionEditada$ = new Subject<boolean>();

    this.bsModalRef.content.evolucionEditada$ = evolucionEditada$;
    evolucionEditada$.subscribe((evolucionEditada: boolean)=>{
      if(evolucionEditada){
        console.log("get table data")
        this.getTableData(this.currentPage, this.pageSize);
      }
    });
    this.bsModalRef.onHidden?.subscribe(()=>{
      evolucionEditada$.unsubscribe();
    })
  }

  eliminarEvolucionPaciente(evolucionPacienteId: string){

    Swal.fire({
      title: '¿Estas seguro que deseas eliminar?',
      showDenyButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if(result.isConfirmed){
        this.evolucionPacienteService.eliminarEvolucionPaciente(evolucionPacienteId).subscribe(
          (response) => {
            if (response.isSuccess) {
              Swal.fire(response.message, '', 'success');
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

  getMoreData(pag: Paginacion) {
    this.getTableData(pag.page, pag.size);

    this.currentPage = pag.page;
    this.pageSize = pag.size;
    this.skip = pag.skip;
    this.limit = pag.limit;

  }



  formatoFecha(fecha: string): string {

    const [anio, mes, dia] = fecha.toString().split('T')[0].split('-');
    return `${dia}-${mes}-${anio}`;
  }



}
