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

interface EvolucionPacienteDTO {
  fechaEvolucion: string;
  especialidad: string;
  medico: string;
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
  bsModalRef?: BsModalRef;
  listEspecialidadesCitas!: Iespecialidad[];
  nombreMedico='';

  ngOnInit(): void {

    // Cargando Data:
    this.especialidadService.obtenerListaEspecialidad().subscribe(data => { this.listEspecialidadesCitas = data; })



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
      this.eliminarEvolucionPaciente(accion.fila.marcaMaterialesId)
    }
  }

  getTableData(currentPage: number, pageSize: number):void{
    this.ListEvolucionPaciente =[];
    this.serialNumberArray = [];
    this.evolucionPacienteService.obtenerEvolucionPacienteList(env.clinicaId,currentPage,pageSize, this.pacienteId).subscribe((data: DataEvolucionPaciente)=>{
      this.totalData = data.totalData
      console.log(this.totalData)

      for (let index = this.skip; index < Math.min(this.limit, data.totalData); index++) {
        const serialNumber = index + 1;
        this.serialNumberArray.push(serialNumber);

        this.medicoService.obtenerMedico(data.data[index].medicoId).subscribe((medicoData) => {
          const evolucionPaciente: EvolucionPacienteDTO = {
            fechaEvolucion: this.formatoFecha(data.data[index].fechaEvolucion),
            especialidad: this.getEspecialidad(data.data[index].especialidadId),
            medico: medicoData.nombre,
            descripcion: data.data[index].descripcion,
            estado: data.data[index].estado,
      }
      this.ListEvolucionPacienteDto.push(evolucionPaciente)
    });
      }
      console.log("EVOLUCION PACIENTE DTO:",this.ListEvolucionPacienteDto)

      this.ListEvolucionPaciente = data.data;
      console.log(this.ListEvolucionPaciente)

    })
  }

  crearEvolucionPaciente(){
    this.bsModalRef = this.modalService.show(AgregarEvolucionPacienteComponent);

    this.bsModalRef.content.evolucionAgregada$.subscribe((evolucionAgregada: boolean)=>{
      if (evolucionAgregada) {
        this.getTableData(this.currentPage, this.pageSize);
      }

    });
  }

  editarEvolucionPaciente(parameter: any){
    console.log("evolucion paciente editada");

  }

  eliminarEvolucionPaciente(parameter: any){
    console.log("evolucion paciente eliminada");

  }

  getMoreData(pag: Paginacion) {
    this.getTableData(pag.page, pag.size);
    this.currentPage = pag.page;
    this.pageSize = pag.size;
    this.skip = pag.skip;
    this.limit = pag.limit;

  }



  getEspecialidad(especialidadId: string):string{

    return this.listEspecialidadesCitas.find(citas => citas.especialidadId === especialidadId)!.nombre || '';
  }


  formatoFecha(fecha: string): string {

    const [anio, mes, dia] = fecha.toString().split('T')[0].split('-');
    return `${dia}-${mes}-${anio}`;
  }



}
