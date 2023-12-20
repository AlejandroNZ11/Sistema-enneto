import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environments';
import { DataDiagnostico,diagnostico,Idiagnostico } from '../models/diagnostico';
import { successResponse } from '../models/successResponse';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class DiagnosticoService {

  apiUrl = environment.apiURL;
  constructor(public http: HttpClient,) { }

  obtenerDiagnosticos(clinicaId: string, page: number, rows: number): Observable<DataDiagnostico> {
    return this.http.get<DataDiagnostico>(this.apiUrl + `/PacientesDiagnosticos/GetAllPacienteDiagnostico?clinicaid=${clinicaId}&page=${page}&rows=${rows}`);
    ///api/PacientesDiagnosticos/GetAllPacienteDiagnostico ----- clinicaId
  }
  crearDiagnostico(diagnostico: diagnostico): Observable<successResponse> {
    return this.http.post<successResponse>(this.apiUrl + '/PacientesDiagnosticos/SavePacienteDiagnostico', diagnostico).pipe(
      catchError(error => {
        Swal.fire('Error', error.error, 'warning');
        return throwError(() => error);
      })
    );
  }
  ////Especialidades/SaveEspecialidad crear diagnostico  entre ''
  obtenerDiagnostico( pacienteDiagnosticoId: string): Observable<Idiagnostico> {
    return this.http.get<Idiagnostico>(this.apiUrl + `/PacientesDiagnosticos/GetPacienteDiagnostico/${pacienteDiagnosticoId}`);
  }
  eliminarDiagnostico( pacienteDiagnosticoId: string): Observable<successResponse> {
    return this.http.delete<successResponse>(this.apiUrl + `/PacientesDiagnosticos/DeletePacienteDiagnostico/${pacienteDiagnosticoId}`);
  }
  actualizarDiagnostico(diagnostico: Idiagnostico): Observable<successResponse> {
    return this.http.put<successResponse>(this.apiUrl + `/PacientesDiagnosticos/UpdatePacienteDiagnostico/${diagnostico.pacienteDiagnosticoId}`, diagnostico).pipe(
      catchError(error => {
        Swal.fire('Error', error.error, 'warning');
        return throwError(() => error);
      })
    );
  }
}