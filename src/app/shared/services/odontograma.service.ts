import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { DataOdontogramaPaciente, IodontogramaPaciente, IodontogramaPacienteList } from '../models/odontrograma';
import { environment } from 'src/environments/environments';
import { HallazgoData, hallazgoRequest } from '../models/hallazgoOdontograma';
import { successResponse } from '../models/successResponse';
import Swal from 'sweetalert2';

@Injectable({providedIn: 'root'})
export class OdontogramaService {

  apiUrl = environment.apiURL;


  constructor(public http: HttpClient) { }

  obtenerOdontogramaPacienteList():Observable<DataOdontogramaPaciente>{
    return this.http.get<DataOdontogramaPaciente>('/assets/json/pacienteOdontograma.json');
  }

  obtenerOdontogramaPacienteListAPI(pacienteId:string):Observable<IodontogramaPacienteList[]>{
    return this.http.get<IodontogramaPacienteList[]>(`${this.apiUrl}/PacientesOdontogramas/GetAllPacienteOdontograma?pacienteId=${pacienteId}`);
  }

  obtenerHallazgos(clinicaId:string, page:number,rows:number):Observable<HallazgoData>{
    return this.http.get<HallazgoData>(`${this.apiUrl}/Hallazgos/GetAllHallazgo?clinicaId=${clinicaId}&page=${page}&rows=${rows}`)
  }

  agregarOdontogramaPaciente(hallazgoRequest:hallazgoRequest):Observable<successResponse>{
    return this.http.post<successResponse>(this.apiUrl + `/PacientesOdontogramas/SavePacienteOdontograma`,hallazgoRequest).pipe(
      catchError(error => {
        Swal.fire('Error',error.error,'warning');
        return throwError(()=>error);
      })
    )
  }

  eliminarHallazgoPaciente(hallazgoPacienteId:string):Observable<successResponse>{
    return this.http.delete<successResponse>(this.apiUrl + `/PacientesOdontogramas/DeletePacienteOdontograma/${hallazgoPacienteId}`).pipe(
      catchError(error => {
        Swal.fire('Error',error.error,'warning');
        return throwError(()=>error);
      })
    )
  }

}
