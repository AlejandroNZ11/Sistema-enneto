import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environments';
import { successResponse } from '../models/successResponse';
import { DataPago, Ipago, Pago } from '../models/pagos';
@Injectable({
    providedIn: 'root'
})
export class PagosService {
    apiUrl = environment.apiURL;
    constructor(public http: HttpClient) { }

    obtenerPagos(clinicaId: string, page: number, rows: number): Observable<DataPago> {
        return this.http.get<DataPago>(this.apiUrl + `/Pagos/GetAllPago?clinicaid=${clinicaId}&page=${page}&rows=${rows}`);
    }
    crearPago(pagos: Pago): Observable<successResponse> {
        return this.http.post<successResponse>(this.apiUrl + '/Pagos/SavePago', pagos).pipe(
            catchError(error => {
                Swal.fire('Error', error.error, 'warning');
                return throwError(() => error);
            })
        );
    }

    obtenerPago( pagoId: string): Observable<Ipago> {
        return this.http.get<Ipago>(this.apiUrl + `/Pagos/GetPago/${pagoId}`);
    }
    eliminarPago(pagoId: string): Observable<successResponse> {
        return this.http.delete<successResponse>(this.apiUrl + `/Pagos/DeletePago/${pagoId}`);
    }
    actualizarPago(pagos: Ipago, pagoId: string): Observable<successResponse> {
        return this.http.put<successResponse>(this.apiUrl + `/Pagos/UpdatePago/${pagoId}`, pagos).pipe(
            catchError(error => {
                Swal.fire('Error', error.error, 'warning');
                return throwError(() => error);
            })
        );
    }
    
}