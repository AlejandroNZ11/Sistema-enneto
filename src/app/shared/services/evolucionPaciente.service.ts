import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environments';
import { DataEvolucionPaciente, IEvolucionPaciente, evolucion } from '../models/evolucionPaciente';
import { successResponse } from '../models/successResponse';
import Swal from 'sweetalert2';

@Injectable({providedIn: 'root'})
export class EvolucionPacienteService {
  apiUrl = environment.apiURL;
  constructor(public http: HttpClient,) { }

  // obtenerEvolucionPacienteList():Observable<DataEvolucionPaciente>{
  //   return this.http.get<DataEvolucionPaciente>('/assets/json/evolucionPaciente.json');
  // }

  obtenerEvolucionPacienteList(clinicaId: string, page:number, rows:number, pacienteId:string):Observable<DataEvolucionPaciente>{
    return this.http.get<DataEvolucionPaciente>(this.apiUrl+`/PacientesEvoluciones/GetAllPacienteEvolucion?clinicaId=${clinicaId}&page=${page}&rows=${rows}&pacienteId=${pacienteId}`);
  }

  agregarEvolucionPaciente(evolucion: evolucion ):Observable<successResponse>{
    return this.http.post<successResponse>(this.apiUrl+`/PacientesEvoluciones/SavePacienteEvolucion`,evolucion).pipe(
      catchError(error => {
        Swal.fire('Error', error.error, 'warning');
        return throwError(() => error);
      })
    );
  }

  eliminarEvolucionPaciente(evolucionId: string):Observable<successResponse>{
    return this.http.delete<successResponse>(this.apiUrl+ `/PacientesEvoluciones/DeletePacienteEvolucion/${evolucionId}`).pipe(
      catchError(error => {
        Swal.fire('Error', error.error, 'warning');
        return throwError(() => error);
      })
    );
  }

  obtenerEvolucionPaciente(evolucionId: string):Observable<IEvolucionPaciente>{
    return this.http.get<IEvolucionPaciente>(this.apiUrl + `/PacientesEvoluciones/GetPacienteEvolucion/${evolucionId}`);
  }

  editarEvolucionPaciente(evolucionPaciente:IEvolucionPaciente):Observable<successResponse>{
    return this.http.put<successResponse>(this.apiUrl + `/PacientesEvoluciones/UpdatePacienteEvolucion/${evolucionPaciente.pacienteEvolucionId}`,evolucionPaciente).pipe(
      catchError(error => {
        Swal.fire('Error', error.error, 'warning');
        return throwError(() => error);
      })
    );
  }


}

