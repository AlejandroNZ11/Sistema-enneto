import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environments';
import { successResponse } from '../models/successResponse';
import { PacienteListData, PacienteRequest, PacienteResponse } from '../models/paciente';
@Injectable({
    providedIn: 'root'
})
export class PacienteService {
    apiUrl = environment.apiURL;
    constructor(public http: HttpClient) { }
    
    obtenerPacientes(clinicaId: string, page: number, rows: number): Observable<PacienteListData> {
        return this.http.get<PacienteListData>(this.apiUrl + `/Pacientes/GetAllPaciente?clinicaid=${clinicaId}&page=${page}&rows=${rows}`);
    }
    crearPaciente(paciente: FormData): Observable<successResponse> {
        return this.http.post<successResponse>(this.apiUrl + '/Pacientes/SavePaciente', paciente).pipe(
            catchError(error => {
                Swal.fire('Error', error.error, 'warning');
                return throwError(() => error);
            })
        );
    }
    obtenerPaciente(pacienteId: string): Observable<PacienteResponse> {
        return this.http.get<PacienteResponse>(this.apiUrl + `/Pacientes/GetPaciente/${pacienteId}`);
    }
    eliminarPaciente(pacienteId: string): Observable<successResponse> {
        return this.http.delete<successResponse>(this.apiUrl + `/Pacientes/DeletePaciente/${pacienteId}`);
    }
}

