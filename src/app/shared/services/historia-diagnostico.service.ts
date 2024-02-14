import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { DataHistoriaDiagnostico, IHistoriaDiagnostico } from '../models/historiaDiagnostico';
import { environment } from 'src/environments/environments';
import { successResponse } from '../models/successResponse';
import Swal from 'sweetalert2';

@Injectable({providedIn: 'root'})
export class HistoriaDiagnosticoService {
  apiUrl = environment.apiURL;
  constructor(public http: HttpClient,) { }

  obtenerDiagnosticoPacienteList(pacienteId: string, clinicaId:string, page:number, rows:number):Observable<DataHistoriaDiagnostico>{
    return this.http.get<DataHistoriaDiagnostico>(this.apiUrl + `/PacientesDiagnosticos/GetAllPacienteDiagnostico?pacienteId=${pacienteId}&clinicaId=${clinicaId}&page=${page}&rows=${rows}`);
  }

  agregarDiagnosticoPaciente(diagnosticoPaciente: any):Observable<successResponse>{
    return this.http.post<successResponse>(this.apiUrl + `/PacientesDiagnosticos/SavePacienteDiagnostico`,diagnosticoPaciente);
  }

  eliminarDiagnosticoPaciente(diagnosticoPacienteId: string):Observable<successResponse>{
    return this.http.delete<successResponse>(this.apiUrl + `/PacientesDiagnosticos/DeletePacienteDiagnostico/${diagnosticoPacienteId}`);
  }

  obtenerDiagnosticoPaciente(diagnosticoPacienteId: string):Observable<IHistoriaDiagnostico>{
    return this.http.get<IHistoriaDiagnostico>(this.apiUrl + `/PacientesDiagnosticos/GetPacienteDiagnostico/${diagnosticoPacienteId}`);
  }

  actualizarDiagnosticoPaciente(diagnosticoPaciente: IHistoriaDiagnostico):Observable<successResponse>{
    return this.http.put<successResponse>(this.apiUrl + `/PacientesDiagnosticos/UpdatePacienteDiagnostico/${diagnosticoPaciente.pacienteDiagnosticoId}`,diagnosticoPaciente).pipe(
      catchError(error => {
        Swal.fire('Error', error.error, 'warning');
        return throwError(() => error);
      })
    );
  }

}
