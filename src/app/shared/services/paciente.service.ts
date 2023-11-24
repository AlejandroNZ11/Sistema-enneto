import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environments';
import { successResponse } from '../models/successResponse';
import { PacienteByDNIResponse, PacienteListData, PacienteEditar } from '../models/paciente';
@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  apiUrl = environment.apiURL;
  constructor(public http: HttpClient) { }

  obtenerPacientes(page: number, rows: number,
    fechaInicio?: string, fechaFin?: string, paciente?: string, tipoPaciente?: string): Observable<PacienteListData> {
    let url = `${this.apiUrl}/Pacientes/GetAllPaciente?page=${page}&rows=${rows}`;
    if (fechaInicio) {
      url += `&FechaInicio=${fechaInicio}`;
    }
    if (fechaFin) {
      url += `&FechaFin=${fechaFin}`;
    }
    if (paciente) {
      url += `&NombreCompleto=${paciente}`;
    }
    if (tipoPaciente) {
      url += `&TipoPacienteId=${tipoPaciente}`;
    }
    return this.http.get<PacienteListData>(url);
  }
  getPaciente(IdEntidad: string): Observable<PacienteByDNIResponse> {
    return this.http.get<PacienteByDNIResponse>(this.apiUrl + `/Pacientes/GetPacienteByDni/${IdEntidad}`);
  }
  crearPaciente(paciente: FormData): Observable<successResponse> {
    return this.http.post<successResponse>(this.apiUrl + '/Pacientes/SavePaciente', paciente).pipe(
      catchError(error => {
        Swal.fire('Error', error.error, 'warning');
        return throwError(() => error);
      })
    );
  }
  obtenerPaciente(pacienteId: string): Observable<PacienteEditar> {
    return this.http.get<PacienteEditar>(this.apiUrl + `/Pacientes/GetPaciente/${pacienteId}`);
  }
  eliminarPaciente(pacienteId: string): Observable<successResponse> {
    return this.http.delete<successResponse>(this.apiUrl + `/Pacientes/DeletePaciente/${pacienteId}`);
  }
  actualizarPaciente(paciente: FormData, pacienteId: string): Observable<successResponse> {
    return this.http.put<successResponse>(this.apiUrl + `/Pacientes/UpdatePaciente/${pacienteId}`, paciente).pipe(
      catchError(error => {
        Swal.fire('Error', error.error, 'warning');
        return throwError(() => error);
      })
    );
  }
}

