import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { DataCitaMedica, IcitaMedica, IcitaMedicaCalendario, citaMedica } from '../models/cita';
import { Observable, catchError, throwError } from 'rxjs';
import { successResponse } from '../models/successResponse';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CitaService {
  apiUrl = environment.apiURL;
  constructor(public http: HttpClient,) { }

  obtenerCitasMedicas(clinicaId: string, page: number, rows: number, pacienteId?: string ,fechaInicio?: string, fechaFin?: string): Observable<DataCitaMedica> {
    let url = `${this.apiUrl}/CitasMedicas/GetAllCitaMedica?clinicaid=${clinicaId}&page=${page}&rows=${rows}`;
    if (fechaInicio) {
      url += `&fechaInicio=${fechaInicio}`;
    }
    if (fechaFin) {
      url += `&fechaFin=${fechaFin}`;
    }
    if (pacienteId){
      url += `&pacienteId=${pacienteId}`;
    }
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
    if (medico != 'TODOS' && medico) {
      url += `&Medico=${medico}`;
    }
    if (estado != 'TODOS' && estado) {
      url += `&TipoCitadoId=${estado}`;
    }
    if (especialidad != 'TODOS' && especialidad) {
      url += `&EspecialidadId=${especialidad}`;
    }
    if (paciente) {
      url += `&PacienteId=${paciente}`;
    }
    return this.http.get<IcitaMedicaCalendario>(url);
  }
  crearCitaMedica(cita: citaMedica): Observable<successResponse> {
    return this.http.post<successResponse>(this.apiUrl + '/CitasMedicas/SaveCitaMedica', cita).pipe(
      catchError(error => {
        Swal.fire('Error', error.error, 'warning');
        return throwError(() => error);
      })
    );
  }
}
