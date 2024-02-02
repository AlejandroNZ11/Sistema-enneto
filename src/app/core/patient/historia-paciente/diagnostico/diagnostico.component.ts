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
import { environment } from 'src/environments/environments';
import Swal from 'sweetalert2';
import { Subject, finalize } from 'rxjs';

interface DiagnosticoDTO {
  pacienteDiagnosticoId: string;
  diagnostico: string;
  fecha: string;
  codigoEnfermedad: string;
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
  ListDiagnosticoPacienteDtoOutput:Array<DiagnosticoDTO> =[];
  mySkip =0;
  isLoading = false;
  enfermedadList:Array<Enfermedad> = [];

  ngOnInit(): void {
    this.columnas = getEntityPropiedades('HistoriaDiagnostico')
    this.acciones = ['Editar', 'Eliminar'];
    this.enfermedadService.obtenerEnfermedadesList().subscribe(data => {this.enfermedadList = data;  console.log(this.enfermedadList)})


    this.route.params.subscribe(params => {
      this.pacienteId = params['pacienteId'];
    })
    console.log(this.pacienteId)

    this.sharedService.setPacienteId(this.pacienteId);
  }
  private getTableData(currentPage: number, pageSize: number): void {

    this.ListDiagnosticoPaciente = [];
    this.serialNumberArray = [];
    this.ListDiagnosticoPacienteDTO =[];
    this.ListDiagnosticoPacienteDtoOutput=[];
    this.mySkip=0;

    this.historiaDiagnosticoService.obtenerDiagnosticoPacienteList(this.pacienteId, environment.clinicaId, currentPage,pageSize)
    .pipe(
      finalize(() => this.isLoading = false)
    ).subscribe((data: DataHistoriaDiagnostico) => {
      this.totalData = data.totalData
      console.log(data.data)
      console.log(this.totalData)
      console.log(this.skip)
      console.log(this.limit)
      for (let index = this.skip; index < Math.min(this.limit, data.totalData); index++) {
        const serialNumber = index + 1;
        this.serialNumberArray.push(serialNumber);
        console.log("dentro del for:",index);
        console.log(data.data[this.mySkip].fecha)
        // Filtrar solo los valores necesarios y crear instancias de DiagnosticoDTO
      const diagnosticoDTO: DiagnosticoDTO = {
        pacienteDiagnosticoId: data.data[this.mySkip].pacienteDiagnosticoId,
        diagnostico:'null',
        // diagnostico: this.getDiagnostico(data.data[index].codigoEnfermedad),

        fecha: this.formatoFecha(data.data[this.mySkip].fecha),
        codigoEnfermedad: data.data[this.mySkip].enfermedadId
      };
      this.ListDiagnosticoPacienteDTO.push(diagnosticoDTO);

      this.mySkip++;
      }

      this.dataSource = new MatTableDataSource<DiagnosticoDTO>(this.ListDiagnosticoPacienteDtoOutput);

      this.ListDiagnosticoPacienteDtoOutput= this.ListDiagnosticoPacienteDTO;
    });
  }

  getDiagnostico(codEnfermendadId:string):string{
    console.log(this.enfermedadList)
    console.log(codEnfermendadId)
    return this.enfermedadList.find(enfermedad => enfermedad.enfermedadId === codEnfermendadId)!.descripcion || '';
  }

  formatoFecha(fecha: string): string {

    const [anio, mes, dia] = fecha.toString().split('T')[0].split('-');
    return `${dia}-${mes}-${anio}`;
  }


  onAction(accion: Accion) {
    if (accion.accion == 'Crear') {
      this.crearDiagnosticoPaciente();
    } else if (accion.accion == 'Editar') {
      this.editarDiagnosticoPaciente(accion.fila)
    } else if (accion.accion == 'Eliminar') {
      this.eliminarDiagnosticoPaciente(accion.fila.pacienteDiagnosticoId)
    }
  }

  crearDiagnosticoPaciente(){

    this.bsModalRef = this.modalService.show(AgregarDiagnosticoPacienteComponent);

    this.bsModalRef.content.diagnosticoAgregado$.subscribe((categoriaAgregada: boolean) => {
      if (categoriaAgregada) {
        this.getTableData(this.currentPage, this.pageSize);
      }
    });

  }

  editarDiagnosticoPaciente(diagnostico: IHistoriaDagnostico){
    const initialState = {
      diagnosticoSeleccionado: diagnostico.pacienteDiagnosticoId
    };
    this.bsModalRef = this.modalService.show(EditarDiagnosticoPacienteComponent, { initialState });

    const diagnosticoEditado$ = new Subject<boolean>();

    this.bsModalRef.content.diagnosticoEditado$ = diagnosticoEditado$;
    diagnosticoEditado$.subscribe((diagnosticoEditado: boolean)=>{
      if(diagnosticoEditado){
        this.getTableData(this.currentPage, this.pageSize);
      }
    });
    this.bsModalRef.onHidden?.subscribe(()=>{
      diagnosticoEditado$.unsubscribe();
    })
  }

  eliminarDiagnosticoPaciente(diagnosticoPacienteId: string){
    Swal.fire({
      title: '¿Estas seguro que deseas eliminar?',
      showDenyButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if(result.isConfirmed){
        this.historiaDiagnosticoService.eliminarDiagnosticoPaciente(diagnosticoPacienteId).subscribe(
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
}
