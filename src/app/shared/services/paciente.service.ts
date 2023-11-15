import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environments';
import { successResponse } from '../models/successResponse';
import { PacienteByDNIResponse, PacienteListData, PacienteRequest, PacienteList } from '../models/paciente';
@Injectable({
    providedIn: 'root'
})
export class PacienteService {
    apiUrl = environment.apiURL;
    constructor(public http: HttpClient) { }
    
    obtenerPacientes(clinicaId: string, page: number, rows: number,
        fechaInicio?: string, fechaFin?: string, paciente?: string, tipoPaciente?: string): Observable<PacienteListData> {
        let url = `${this.apiUrl}/Pacientes/GetAllPaciente?clinicaid=${clinicaId}&page=${page}&rows=${rows}`;
        if (fechaInicio) {
          url += `&fechaInicio=${fechaInicio}`;
        }
        if (fechaFin) {
          url += `&fechaFin=${fechaFin}`;
        }
        if (paciente) {
          url += `&paciente=${paciente}`;
        }
        if (tipoPaciente) {
          url += `&tipoPaciente${tipoPaciente}`;
        }
        return this.http.get<PacienteListData>(url);
      }
    getPaciente(IdEntidad: string): Observable<PacienteByDNIResponse> {
		let url = `?IdEntidad=${IdEntidad}`;
		return this.http.get<PacienteByDNIResponse>(this.apiUrl + `/Pacientes/dni/${IdEntidad}`);
	}
    crearPaciente(paciente: FormData): Observable<successResponse> {
        return this.http.post<successResponse>(this.apiUrl + '/Pacientes/SavePaciente', paciente).pipe(
            catchError(error => {
                Swal.fire('Error', error.error, 'warning');
                return throwError(() => error);
            })
        );
    }
    obtenerPaciente(pacienteId: string): Observable<PacienteList> {
        return this.http.get<PacienteList>(this.apiUrl + `/Pacientes/GetPaciente/${pacienteId}`);
    }
    eliminarPaciente(pacienteId: string): Observable<successResponse> {
        return this.http.delete<successResponse>(this.apiUrl + `/Pacientes/DeletePaciente/${pacienteId}`);
    }
}

