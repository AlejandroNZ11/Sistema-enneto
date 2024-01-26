import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DataHistoriaDiagnostico, IHistoriaDagnostico } from 'src/app/shared/models/historiaDiagnostico';
import { Accion, PageSize, Paginacion, getEntityPropiedades } from 'src/app/shared/models/tabla-columna';
import { HistoriaDiagnosticoService } from 'src/app/shared/services/historia-diagnostico.service';
import { AgregarDiagnosticoPacienteComponent } from './agregar-diagnostico-paciente/agregar-diagnostico-paciente.component';
import { EditarDiagnosticoPacienteComponent } from './editar-diagnostico-paciente/editar-diagnostico-paciente.component';
import { EnfermedadService } from 'src/app/shared/services/enfermedad.service';
import { Enfermedad } from 'src/app/shared/models/enfermedad';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../services/shared-service.service';

interface DiagnosticoDTO {
  diagnostico: string;
  fecha: string;
  codigoEnfermedad01: string;
}
@Component({
  selector: 'app-diagnostico',
  templateUrl: './diagnostico.component.html',
  styleUrls: ['./diagnostico.component.scss']
})
export class DiagnosticoComponent implements OnInit{

  constructor(private modalService: BsModalService, public historiaDiagnosticoService: HistoriaDiagnosticoService, public enfermedadService:EnfermedadService,private route: ActivatedRoute, public sharedService: SharedService) {
  }
  pacienteId = "";
  serialNumberArray: Array<number> = [];
  skip = 0;
  pageSize = PageSize.size;
  totalData = 0;
  limit: number = this.pageSize;
  dataSource!: MatTableDataSource<DiagnosticoDTO>;
  ListDiagnosticoPaciente: Array<IHistoriaDagnostico> = [];
  columnas: string[] = []
  acciones: string[] = []
  currentPage = 1;
  bsModalRef?: BsModalRef;
  ListDiagnosticoPacienteDTO:Array<DiagnosticoDTO> =[];


  enfermedadList:Array<Enfermedad> = [];

  ngOnInit(): void {
    this.columnas = getEntityPropiedades('HistoriaDiagnostico')
    this.acciones = ['Editar', 'Eliminar'];
    this.enfermedadService.obtenerEnfermedadesList().subscribe(data => {this.enfermedadList = data;})


    this.route.params.subscribe(params => {
      this.pacienteId = params['pacienteId'];
    })
    console.log(this.pacienteId)

    this.sharedService.setPacienteId(this.pacienteId);
  }
  private getTableData(currentPage?: number, pageSize?: number): void {
    this.ListDiagnosticoPaciente = [];
    this.serialNumberArray = [];
    this.historiaDiagnosticoService.obtenerDiagnosticoPaciente().subscribe((data: DataHistoriaDiagnostico) => {
      this.totalData = data.totalData
      console.log(this.totalData)
      for (let index = this.skip; index < Math.min(this.limit, data.totalData); index++) {
        const serialNumber = index + 1;
        this.serialNumberArray.push(serialNumber);

        // Filtrar solo los valores necesarios y crear instancias de DiagnosticoDTO
      const diagnosticoDTO: DiagnosticoDTO = {
        diagnostico: data.data[index].pacienteDiagnosticoId,
        fecha: data.data[index].fecha,
        codigoEnfermedad01: data.data[index].codigoEnfermedad01
      };
      this.ListDiagnosticoPacienteDTO.push(diagnosticoDTO);
      }
      this.ListDiagnosticoPaciente = data.data;

      console.log(this.ListDiagnosticoPaciente)
      this.dataSource = new MatTableDataSource<DiagnosticoDTO>(this.ListDiagnosticoPacienteDTO);
    });
  }

  onAction(accion: Accion) {
    if (accion.accion == 'Crear') {
      this.crearDiagnosticoPaciente();
    } else if (accion.accion == 'Editar') {
      this.editarDiagnosticoPaciente(accion.fila)
    } else if (accion.accion == 'Eliminar') {
      this.eliminarDiagnosticoPaciente(accion.fila.marcaMaterialesId)
    }
  }

  crearDiagnosticoPaciente(){

    this.bsModalRef = this.modalService.show(AgregarDiagnosticoPacienteComponent);

    this.bsModalRef.content.categoriaAgregada$.subscribe((categoriaAgregada: boolean) => {
      if (categoriaAgregada) {
        this.getTableData(this.currentPage, this.pageSize);
      }
    });

  }

  editarDiagnosticoPaciente(diagnostico: IHistoriaDagnostico){
    const initialState = {
      enfermedadSeleccionada: diagnostico.pacienteId
    };
    this.bsModalRef = this.modalService.show(EditarDiagnosticoPacienteComponent, { initialState });
  }

  eliminarDiagnosticoPaciente(diagnosticoId: string){
    console.log(diagnosticoId)
  }

  getMoreData(pag: Paginacion) {
    this.getTableData(pag.page, pag.size);
    this.currentPage = pag.page;
    this.pageSize = pag.size;
    this.skip = pag.skip;
    this.limit = pag.limit;
  }
}
