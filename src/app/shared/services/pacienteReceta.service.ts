import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environments';
import { PacienteConsentimientoData, pacienteConsentimiento } from '../models/pacienteConsentimiento';
import { successResponse } from '../models/successResponse';
import { PacienteRecetaData, pacienteRecetaRequest } from '../models/pacienteReceta';
import Swal from 'sweetalert2';

@Injectable({providedIn: 'root'})
export class PacienteRecetaService {

  apiUrl = environment.apiURL;
  constructor(public http: HttpClient) { }

  obtenerPacienteReceta(pacienteId:string, clinicaId:string,page:number,rows:number):Observable<PacienteRecetaData>{
    return this.http.get<PacienteRecetaData>(this.apiUrl + `/PacientesRecetas/GetAllPacienteReceta?PacienteId=${pacienteId}&ClinicaId=${clinicaId}&Page=${page}&Rows=${rows}`);
  }

  // agregarPacienteConsentimiento(pacienteConsen:pacienteConsentimiento):Observable<successResponse>{
  //   return this.http.post<successResponse>(this.apiUrl + `/PacienteConsentimiento/SavePacienteConsentimiento`,pacienteConsen);
  // }

  agregarPacienteReceta(pacienteReceta:pacienteRecetaRequest):Observable<successResponse>{
    return this.http.post<successResponse>(this.apiUrl + `/PacientesRecetas/SavePacienteReceta`,pacienteReceta).pipe(
      catchError(error => {
          Swal.fire('Error', error.error, 'warning');
          return throwError(() => error);
      })
  );
  }

  editarPacienteReceta(pacienteReceta:pacienteRecetaRequest):Observable<successResponse>{
    return this.http.put<successResponse>(this.apiUrl + `/PacientesRecetas/UpdatePacienteReceta/${pacienteReceta.pacienteId}`,pacienteReceta).pipe(
      catchError(error => {
          Swal.fire('Error', error.error, 'warning');
          return throwError(() => error);
      })
  );
  }

  eliminarPacienteReceta(pacienteRecetId:string):Observable<successResponse>{
    return this.http.delete<successResponse>(this.apiUrl + `/PacientesRecetas/DeletePacienteReceta/${pacienteRecetId}`).pipe(
      catchError(error => {
          Swal.fire('Error', error.error, 'warning');
          return throwError(() => error);
      })
  );
  }

}
