import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { DataCitaMedica, IcitaMedicaCalendario, citaMedica } from '../models/cita';
import { Observable, catchError, throwError } from 'rxjs';
import { successResponse } from '../models/successResponse';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CitaService {
  apiUrl = environment.apiURL;
  constructor(public http: HttpClient,) { }

  obtenerCitasMedicas(clinicaId: string, page: number, rows: number, fechaInicio?: string, fechaFin?: string): Observable<DataCitaMedica> {
    let url = `${this.apiUrl}/CitasMedicas/GetAllCitaMedica?clinicaid=${clinicaId}&page=${page}&rows=${rows}`;
    if (fechaInicio) {
      url += `&fechaInicio=${fechaInicio}`;
    }
    if (fechaFin) {
      url += `&fechaFin=${fechaFin}`;
    }
    return this.http.get<DataCitaMedica>(url);
  }
  obtenerCitasMedicasCalendario(fechaInicio: string, fechaFin: string, medico?: string, estado?: string, especialidad?: string): Observable<IcitaMedicaCalendario[]> {
    let url = `${this.apiUrl}/CitasMedicas/GetCitaMedicaList?FechaInicio=${fechaInicio}&FechaFin=${fechaFin}`;
    if (medico) {
      url += `&medico=${fechaInicio}`;
    }
    if (estado) {
      url += `&tipoCitado=${fechaFin}`;
    }
    if (especialidad) {
      url += `&especialidad=${fechaFin}`;
    }
    return this.http.get<IcitaMedicaCalendario[]>(url);
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
