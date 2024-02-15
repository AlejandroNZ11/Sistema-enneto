import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environments';
import { successResponse } from '../models/successResponse';
import { tarifario, DataTarifario, Itarifario } from '../models/tarifario';
import { ItipoConcepto } from '../models/tipoConcepto';

@Injectable({
    providedIn:'root'
})
export class TarifarioService {
    apiUrl = environment.apiURL;
    constructor(public http: HttpClient,) {}

    obtenerTarifarios(clinicaId: string, page: number, rows: number): Observable<DataTarifario> {
        return this.http.get<DataTarifario>(this.apiUrl + `/Tarifarios/GetAllTarifario?clinicaid=${clinicaId}&page=${page}&rows=${rows}`);
    }
    crearTarifario(tarifario: tarifario): Observable<successResponse> {
    return this.http.post<successResponse>(this.apiUrl + '/Tarifarios/SaveTarifario', tarifario).pipe(
        catchError(error => {
            Swal.fire('Error', error.error, 'warning');
            return throwError(() => error);
        })
        );
    }
    
    obtenerTarifario( tarifarioId: string): Observable<Itarifario> {
        return this.http.get<Itarifario>(this.apiUrl + `/Tarifarios/GetTarifario/${tarifarioId}`);
    }
    eliminarTarifario( tarifarioId: string): Observable<successResponse> {
        return this.http.delete<successResponse>(this.apiUrl + `/Tarifarios/DeleteTarifario/${tarifarioId}`);
    }
    actualizarTarifario(tarifario: Itarifario): Observable<successResponse> {
        return this.http.put<successResponse>(this.apiUrl + `/Tarifarios/UpdateTarifario/${tarifario.tarifarioId}`, tarifario).pipe(
            catchError(error => {
                console.error('Error en la solicitud:', error);
                Swal.fire('Error', 'Ocurrió un error al guardar el Tipo Citado', 'warning');
                return throwError(() => error);
            })
        );
    }
}

