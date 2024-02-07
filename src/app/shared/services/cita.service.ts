import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { DataCitaMedica, DataCitaMedicaPaciente, DataControlCitaMedica, IcitaMedica, IcitaMedicaCalendario, IcontrolCitaMedica, citaMedica } from '../models/cita';
import { Observable, catchError, throwError } from 'rxjs';
import { successResponse } from '../models/successResponse';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CitaService {
  apiUrl = environment.apiURL;
  constructor(public http: HttpClient,) { }

  obtenerCitasMedicas(clinicaId: string, page: number, rows: number, pacienteId?: string, fechaInicio?: string, fechaFin?: string): Observable<DataCitaMedica> {
    let url = `${this.apiUrl}/CitasMedicas/GetAllCitaMedica?clinicaid=${clinicaId}&page=${page}&rows=${rows}`;
    if (fechaInicio) {
      url += `&fechaInicio=${fechaInicio}`;
    }
    if (fechaFin) {
      url += `&fechaFin=${fechaFin}`;
    }
    if (pacienteId) {
      url += `&pacienteId=${pacienteId}`;
    }
    console.log("Service: " + pacienteId)
    return this.http.get<DataCitaMedica>(url);
  }
  obtenerCitaMedica(citaMedicaId: string): Observable<IcitaMedica> {
    const url = `${this.apiUrl}/CitasMedicas/GetCitaMedica/${citaMedicaId}`;
    return this.http.get<IcitaMedica>(url);
  }
  actualizarPaciente(cita: IcitaMedica, citaMedicaId: string): Observable<successResponse> {
    return this.http.put<successResponse>(this.apiUrl + `/CitasMedicas/UpdateCitaMedica/${citaMedicaId}`, cita).pipe(
      catchError(error => {
        Swal.fire('Error', error.error, 'warning');
        return throwError(() => error);
      })
    );
  }
  obtenerCitasMedicasCalendario(fechaInicio: string, fechaFin: string, medico?: string, estado?: string, especialidad?: string, paciente?: string): Observable<IcitaMedicaCalendario> {
    let url = `${this.apiUrl}/CitasMedicas/GetCitaMedicaList?FechaInicio=${fechaInicio}&FechaFin=${fechaFin}`;
    if (medico != 'todos' && medico) {
      url += `&Medico=${medico}`;
    }
    if (estado != 'todos' && estado) {
      url += `&TipoCitadoId=${estado}`;
    }
    if (especialidad != 'todos' && especialidad) {
      url += `&EspecialidadId=${especialidad}`;
    }
    if (paciente != 'todos' && paciente) {
      url += `&PacienteId=${paciente}`;
    }
    return this.http.get<IcitaMedicaCalendario>(url);
  }
  obtenerControlCitasMedicas(page: number, rows: number,fechaInicio: string, fechaFin: string, sede?: string, estado?: string, historia?: string, paciente?: string): Observable<DataControlCitaMedica> {
    let url = `${this.apiUrl}/CitasMedicas/GetCitaMedicaList?page=${page}&rows=${rows}&FechaInicio=${fechaInicio}&FechaFin=${fechaFin}`;
    if (sede != 'todos' && sede) {
      url += `&Sede=${sede}`;
    }
    if (estado != 'todos' && estado) {
      url += `&TipoCitadoId=${estado}`;
    }
    if (historia != 'todos' && historia) {
      url += `&Historia=${historia}`;
    }
    if (paciente != 'todos' && paciente) {
      url += `&PacienteId=${paciente}`;
    }
    return this.http.get<DataControlCitaMedica>(url);
  }
  crearCitaMedica(cita: citaMedica): Observable<successResponse> {
    return this.http.post<successResponse>(this.apiUrl + '/CitasMedicas/SaveCitaMedica', cita).pipe(
      catchError(error => {
        Swal.fire('Error', error.error, 'warning');
        return throwError(() => error);
      })
    );
  }

  obtenerCitasMedicasPaciente(clinicaId: string, page: number, rows: number, pacienteId?: string, fechaInicio?: string, fechaFin?: string): Observable<DataCitaMedicaPaciente> {
    let url = `${this.apiUrl}/CitasMedicas/GetCitaMedicaList?clinicaid=${clinicaId}&page=${page}&rows=${rows}`;
    if (fechaInicio) {
      url += `&fechaInicio=${fechaInicio}`;
    }
    if (fechaFin) {
      url += `&fechaFin=${fechaFin}`;
    }
    if (pacienteId) {
      url += `&pacienteId=${pacienteId}`;
    }
    console.log("Service: " + pacienteId)
    return this.http.get<DataCitaMedicaPaciente>(url);
  }
}
