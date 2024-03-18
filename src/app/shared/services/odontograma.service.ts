import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { DataOdontogramaPaciente, IodontogramaPaciente, IodontogramaPacienteList } from '../models/odontrograma';
import { environment } from 'src/environments/environments';
import { HallazgoData, IHallazgo, hallazgoRequest } from '../models/hallazgoOdontograma';
import { successResponse } from '../models/successResponse';
import Swal from 'sweetalert2';

@Injectable({providedIn: 'root'})
export class OdontogramaService {

  apiUrl = environment.apiURL;


  constructor(public http: HttpClient) { }

  obtenerOdontogramaPacienteList():Observable<DataOdontogramaPaciente>{
    return this.http.get<DataOdontogramaPaciente>('/assets/json/pacienteOdontograma.json');
  }

  obtenerOdontogramaPacienteListAPI(pacienteId:string,tipo:string):Observable<IodontogramaPacienteList[]>{
    return this.http.get<IodontogramaPacienteList[]>(`${this.apiUrl}/PacientesOdontogramas/GetAllPacienteOdontograma?pacienteId=${pacienteId}&tipo=${tipo}`);
  }

  obtenerHallazgos():Observable<IHallazgo[]>{
    return this.http.get<IHallazgo[]>(`${this.apiUrl}/Hallazgos/GetHallazgoList`)
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
