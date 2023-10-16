import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environments';
import { successResponse } from '../models/successResponse';
import { PagosListData, PagosRequest, PagosResponse } from '../models/pagos';
@Injectable({
    providedIn: 'root'
})
export class PagosService {
    apiUrl = environment.apiURL;
    constructor(public http: HttpClient) { }

    obtenerPagos(clinicaId: string, page: number, rows: number): Observable<PagosListData> {
        return this.http.get<PagosListData>(this.apiUrl + `/Pagos/GetAllPago?clinicaid=${clinicaId}&page=${page}&rows=${rows}`);
    }
    crearPago(pagos: PagosRequest): Observable<successResponse> {
        return this.http.post<successResponse>(this.apiUrl + '/Pagos/SavePago', pagos).pipe(
            catchError(error => {
                Swal.fire('Error', error.error, 'warning');
                return throwError(() => error);
            })
        );
    }
    eliminarPago(pagoId: string): Observable<successResponse> {
        return this.http.delete<successResponse>(this.apiUrl + `/Pagos/DeletePago/${pagoId}`);
    }
    actualizarPago(pagos: PagosResponse, pagoId: string): Observable<successResponse> {
        return this.http.put<successResponse>(this.apiUrl + `/Pagos/UpdatePago/${pagoId}`, pagos).pipe(
            catchError(error => {
                Swal.fire('Error', error.error, 'warning');
                return throwError(() => error);
            })
        );
    }
    
}