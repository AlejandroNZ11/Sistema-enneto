import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environments';
import { successResponse } from '../models/successResponse';
import { MedicoByDNI, MedicoByDNIResponse, MedicoEditar, MedicoListData, MedicoRequest } from '../models/medico';
@Injectable({
  providedIn: 'root'
})
export class MedicoService {
  apiUrl = environment.apiURL;
  constructor(public http: HttpClient) { }
  obtenerMedicos(clinicaId: string, page: number, rows: number,
    fechaInicio?: string, fechaFin?: string, medico?: string, especialidad?: string): Observable<MedicoListData> {
    let url = `${this.apiUrl}/Medicos/GetAllMedico?clinicaid=${clinicaId}&page=${page}&rows=${rows}`;
    if (fechaInicio) {
      url += `&fechaInicio=${fechaInicio}`;
    }
    if (fechaFin) {
      url += `&fechaFin=${fechaFin}`;
    }
    if (medico) {
      url += `&medico=${medico}`;
    }
    if (especialidad) {
      url += `&especialidad=${especialidad}`;
    }
    return this.http.get<MedicoListData>(url);
  }
  crearMedico(doctor: FormData): Observable<successResponse> {
    return this.http.post<successResponse>(this.apiUrl + '/Medicos/SaveMedico', doctor).pipe(
      catchError(error => {
        Swal.fire('Error', error.error, 'warning');
        return throwError(() => error);
      })
    );
  }
  getMedico(IdEntidad: string): Observable<MedicoByDNIResponse> {
		return this.http.get<MedicoByDNIResponse>(this.apiUrl + `/Medicos/dni/${IdEntidad}`);
	}
  obtenerMedico(medicoId: string): Observable<MedicoEditar> {
    return this.http.get<MedicoEditar>(this.apiUrl + `/Medicos/GetMedico/${medicoId}`);
  }
  eliminarMedico(medicoId: string): Observable<successResponse> {
    return this.http.delete<successResponse>(this.apiUrl + `/Medicos/DeleteMedico/${medicoId}`);
  }
  actualizarMedico(doctor: FormData, medicoId: string): Observable<successResponse> {
    return this.http.put<successResponse>(this.apiUrl + `/Medicos/UpdateMedico/${medicoId}`, doctor).pipe(
      catchError(error => {
        Swal.fire('Error', error.error, 'warning');
        return throwError(() => error);
      })
    );
  }
}
