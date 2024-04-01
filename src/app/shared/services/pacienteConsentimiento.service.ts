import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environments';
import { PacienteConsentimientoData, pacienteConsentimiento, pacienteConsentimientoEditar } from '../models/pacienteConsentimiento';
import { successResponse } from '../models/successResponse';
import Swal from 'sweetalert2';

@Injectable({providedIn: 'root'})
export class PacienteConsentimientoService {

  apiUrl = environment.apiURL;
  constructor(public http: HttpClient) { }

  // obtenerPacienteConsentimiento():Observable<PacienteConsentimientoData>{
  //   return this.http.get<PacienteConsentimientoData>('/assets/json/pacienteConsentimiento.json');
  // }

  obtenerPacienteConsentimiento(clinicaId:string, page:number, rows:number, pacienteId:string):Observable<PacienteConsentimientoData>{

    const parametros = {
      clinicaId: clinicaId,
      page: page,
      rows: rows,
      pacienteId: pacienteId
    };

    const parametrosJson = JSON.stringify(parametros);

    const request = {
      body:parametrosJson
    }

    return this.http.get<PacienteConsentimientoData>(this.apiUrl + `/PacienteConsentimiento/GetAllPacienteConsentimiento?clinicaId=${clinicaId}&page=${page}&rows=${rows}&pacienteId=${pacienteId}`);
  }

  agregarPacienteConsentimiento(pacienteConsentimiento:FormData):Observable<successResponse>{
    console.log({pacienteConsentimiento})
    return this.http.post<successResponse>(this.apiUrl + `/PacienteConsentimiento/SavePacienteConsentimiento`,pacienteConsentimiento).pipe(
      catchError(error => {
          Swal.fire('Error', error.error, 'warning');
          return throwError(() => error);
      })
  );
  }

  eliminarPacienteConsentimiento(pacienteConsentimientoId:string):Observable<successResponse>{
    return this.http.delete<successResponse>(this.apiUrl + `/PacienteConsentimiento/DeletePacienteConsentimiento/${pacienteConsentimientoId}`).pipe(
      catchError(error => {
          Swal.fire('Error', error.error, 'warning');
          return throwError(() => error);
      })
  );
  }

  editarPacienteConsentimiento(pacienteConsentimiento:pacienteConsentimientoEditar):Observable<successResponse>{
    return this.http.put<successResponse>(this.apiUrl + `/PacienteConsentimiento/UpdatePacienteConsentimiento/${pacienteConsentimiento.pacienteConsentimientoId}`,pacienteConsentimiento).pipe(
      catchError(error => {
          Swal.fire('Error', error.error, 'warning');
          return throwError(() => error);
      })
  );
  }

}
