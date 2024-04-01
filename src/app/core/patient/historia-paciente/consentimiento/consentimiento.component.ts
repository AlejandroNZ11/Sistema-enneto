import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../services/shared-service.service';
import { PacienteConsentimientoService } from 'src/app/shared/services/pacienteConsentimiento.service';
import { Subject, finalize } from 'rxjs';
import { IPacienteConsentimiento, PacienteConsentimientoData } from 'src/app/shared/models/pacienteConsentimiento';
import { MatTableDataSource } from '@angular/material/table';
import { pageSelection } from 'src/app/shared/models/models';
import { Sort } from '@angular/material/sort';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AgregarConsentimientoPacienteComponent } from './agregar-consentimiento-paciente/agregar-consentimiento-paciente.component';
import { EditarConsentimientoPacienteComponent } from './editar-consentimiento-paciente/editar-consentimiento-paciente.component';
import { environment } from 'src/environments/environments';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-consentimiento',
  templateUrl: './consentimiento.component.html',
  styleUrls: ['./consentimiento.component.scss']
})
export class ConsentimientoComponent implements OnInit {

  constructor(private route: ActivatedRoute, public sharedService: SharedService,private pacienteConsentimientoService:PacienteConsentimientoService, private modalService: BsModalService){}

  public pacienteConsentimientoList: Array<IPacienteConsentimiento> = [];

  pacienteId="";
  consentimientoList:string[]=['aaaaa','bbbbb','ccccc'];
  isLoading = false;
  public totalData = 0;
  public skip = 0;
  public pageSize = 10;
  public currentPage = 1;
  public limit: number = this.pageSize;
  public serialNumberArray: Array<number> = [];
  dataSourceAPI!: MatTableDataSource<IPacienteConsentimiento>;
  public pageNumberArray: Array<number> = [];
  public totalPages = 0;
  public pageSelection: Array<pageSelection> = [];
  public pageIndex = 0;
  bsModalRef?: BsModalRef;



  ngOnInit(): void {


    this.route.params.subscribe(params => {
     this.pacienteId = params['pacienteId'];
   })
   console.log(this.pacienteId)
   this.sharedService.setPacienteId(this.pacienteId);

   this.obtenerDatosPacientesSinFiltro();

 }

 private obtenerDatosPacientesSinFiltro():void{
  this.pacienteConsentimientoList =[];
  this.serialNumberArray = [];


  this.pacienteConsentimientoService.obtenerPacienteConsentimiento(environment.clinicaId, this.currentPage,this.pageSize,this.pacienteId)
   .pipe(
    finalize(()=>this.isLoading = false)
   )
   .subscribe((data:PacienteConsentimientoData)=>{

        this.totalData = data.totalData;
        for (let index = this.skip; index < Math.min(this.limit, data.totalData); index++) {
          const serialNumber = index + 1;
          this.serialNumberArray.push(serialNumber);
        }
        console.log(data.data)
        this.pacienteConsentimientoList = data.data;
        this.dataSourceAPI = new MatTableDataSource<IPacienteConsentimiento>(this.pacienteConsentimientoList);
        this.calculateTotalPages(this.totalData, this.pageSize);
        console.log('Lista de pacientes Historia General:', this.pacienteConsentimientoList);

   })
}


  crearConsentimientoPaciente(){
    this.bsModalRef = this.modalService.show(AgregarConsentimientoPacienteComponent,{class:'modal-lg'});

    const consentimientoPacienteAgregado$ = new Subject<boolean>();

    this.bsModalRef.content.consentimientoPacienteAgregado$ = consentimientoPacienteAgregado$;
    consentimientoPacienteAgregado$.subscribe((consentimientoPacienteAgregado: boolean)=>{
      if (consentimientoPacienteAgregado) {
        this.obtenerDatosPacientesSinFiltro();
      }

    });
    this.bsModalRef.onHidden?.subscribe(()=>{
      consentimientoPacienteAgregado$.unsubscribe();
    })

  }

  editarConsentimientoPaciente(consentimientoPaciente: IPacienteConsentimiento){
    const initialState = {
    consentimientoSeleccionado: consentimientoPaciente
    };

    this.bsModalRef = this.modalService.show(EditarConsentimientoPacienteComponent, {initialState, class:'modal-lg'})

    const consentimientoPacienteEditado$ = new Subject<boolean>();
    this.bsModalRef.content.consentimientoPacienteEditado$ = consentimientoPacienteEditado$;
    consentimientoPacienteEditado$.subscribe((consentimientoEditado: boolean) => {
      if (consentimientoEditado) {
        this.obtenerDatosPacientesSinFiltro();

      }
    });
    this.bsModalRef.onHidden?.subscribe(()=>{
      consentimientoPacienteEditado$.unsubscribe();
    })


  }

  eliminarConsentimiento(pacienteConsentimientoId:string){
    Swal.fire({
      title: '¿Estas seguro que deseas eliminar?',
      showDenyButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.pacienteConsentimientoService.eliminarPacienteConsentimiento(pacienteConsentimientoId).subscribe(
          (response) => {
            if (response.isSuccess) {
              Swal.fire(response.message,'', 'success');
              this.obtenerDatosPacientesSinFiltro();
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

 public sortData(sort: Sort) {
  const data = this.pacienteConsentimientoList.slice();

  if (!sort.active || sort.direction === '') {
    this.pacienteConsentimientoList = data;
  } else {
    this.pacienteConsentimientoList = data.sort((a, b) => {
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
    this.obtenerDatosPacientesSinFiltro();
  } else if (event == 'previous') {
    this.currentPage--;
    this.pageIndex = this.currentPage - 1;
    this.limit -= this.pageSize;
    this.skip = this.pageSize * this.pageIndex;
    this.obtenerDatosPacientesSinFiltro();
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
  this.obtenerDatosPacientesSinFiltro();
}





}
