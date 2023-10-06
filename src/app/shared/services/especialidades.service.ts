import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environments';
import { successResponse } from '../models/successResponse';
import { DataEspecialidad, Iespecialidad, especialidad } from '../models/especialidades';
@Injectable({
  providedIn: 'root'
})
export class EspecialidadesService {

  apiUrl = environment.apiURL;
  constructor(public http: HttpClient,) { }

  obtenerEspecialidades(clinicaId: string, page: number, rows: number): Observable<DataEspecialidad> {
    return this.http.get<DataEspecialidad>(this.apiUrl + `/Especialidades/GetAllEspecialidad?clinicaid=${clinicaId}&page=${page}&rows=${rows}`);
  }
  crearEspecialidad(especialidad: especialidad): Observable<successResponse> {
    return this.http.post<successResponse>(this.apiUrl + '/Especialidades/SaveEspecialidad', especialidad).pipe(
      catchError(error => {
        Swal.fire('Error', error.error, 'warning');
        return throwError(() => error);
      })
    );
  }
  obtenerEspecialidad( especialidadId: string): Observable<Iespecialidad> {
    return this.http.get<Iespecialidad>(this.apiUrl + `/Especialidades/GetEspecialidad/${especialidadId}`);
  }
  eliminarEspecialidad( especialidadId: string): Observable<successResponse> {
    return this.http.delete<successResponse>(this.apiUrl + `/Especialidades/DeleteEspecialidad/${especialidadId}`);
  }
  actualizarEspecialidad(especialidad: Iespecialidad): Observable<successResponse> {
    return this.http.put<successResponse>(this.apiUrl + `/Especialidades/${especialidad.especialidadId}`, especialidad).pipe(
      catchError(error => {
        Swal.fire('Error', error.error, 'warning');
        return throwError(() => error);
      })
    );
  }
}