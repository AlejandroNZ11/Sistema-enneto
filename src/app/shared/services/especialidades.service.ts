import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataEspecialidad, especialidad, respuesta } from '../models/models';
import { Data } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadesService {

  apiUrl: string = "https://enneto-dental-dev.azurewebsites.net/api";
  constructor(public http: HttpClient,) { }

  obtenerEspecialidades(clinicaId: string,page: number, rows: number): Observable<DataEspecialidad> {
    return this.http.get<DataEspecialidad>(this.apiUrl + `/Especialidades/GetAllEspecialidad?clinicaid=${clinicaId}&page=${page}&rows=${rows}`);
  }
  crearEspecialidad(especialidad: especialidad): Observable<respuesta> {
    return this.http.post<any>(this.apiUrl + '/Especialidades/SaveEspecialidad', especialidad).pipe(
      catchError(error => {
        Swal.fire('Error', error.error, 'warning');
        return throwError(() => error);
      })
    );
  }

  actualizarEspecialidad(especialidad: any): Observable<respuesta> {
    return this.http.put<any>(this.apiUrl + `/Categorias/${especialidad.id}`, especialidad).pipe(
      catchError(error => {
        Swal.fire('Error', error.error, 'warning');
        return throwError(() => error);
      })
    );
  }
}