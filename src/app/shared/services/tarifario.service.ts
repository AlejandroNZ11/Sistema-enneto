import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environments';
import { successResponse } from '../models/successResponse';
import { tarifario, DataTarifario, Itarifario } from '../models/tarifario';

@Injectable({
    providedIn:'root'
})
export class TarifarioService {
    apiUrl = environment.apiURL;
    constructor(public http: HttpClient,) {}

    obtenerTarifarios(clinicaId: string, page: number, rows: number): Observable<DataTarifario> {
        return this.http.get<DataTarifario>(this.apiUrl + `/Especialidades/GetAllEspecialidad?clinicaid=${clinicaId}&page=${page}&rows=${rows}`);
    }
    crearTarifario(tarifario: tarifario): Observable<successResponse> {
    return this.http.post<successResponse>(this.apiUrl + '/Especialidades/SaveEspecialidad', tarifario).pipe(
        catchError(error => {
            Swal.fire('Error', error.error, 'warning');
            return throwError(() => error);
        })
        );
    }
    
    obtenerTarifario( tarifarioId: string): Observable<Itarifario> {
        return this.http.get<Itarifario>(this.apiUrl + `/Especialidades/GetEspecialidad/${tarifarioId}`);
    }
    eliminarTarifario( tarifarioId: string): Observable<successResponse> {
        return this.http.delete<successResponse>(this.apiUrl + `/Especialidades/DeleteEspecialidad/${tarifarioId}`);
    }
    actualizarTarifario(tarifario: Itarifario): Observable<successResponse> {
    return this.http.put<successResponse>(this.apiUrl + `/Especialidades/UpdateEspecialidad/${tarifario.tarifarioId}`, tarifario).pipe(
        catchError(error => {
            Swal.fire('Error', error.error, 'warning');
            return throwError(() => error);
        })
        );
    }






}

