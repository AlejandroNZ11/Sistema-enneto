import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, } from 'rxjs';
import { environment } from 'src/environments/environments';
import { tipoTarjeta, ITipoTarjeta, DataTipoTarjetas } from '../models/tipotarjeta';
import Swal from 'sweetalert2';
import { successResponse } from '../models/successResponse';
import { catchError, throwError } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class TipoTarjetaService {
    apiUrl = environment.apiURL;
    constructor(public http: HttpClient) { }

    obtenerTipoTarjetas(clinicaId: string, page: number, rows: number): Observable<DataTipoTarjetas> {
        return this.http.get<DataTipoTarjetas>(this.apiUrl + `/TipoTarjeta/GetAllTipoTarjeta?clinicaid=${clinicaId}&page=${page}&rows=${rows}`);
    }  
    crearTipoTarjeta(tipoTarjeta: tipoTarjeta): Observable<successResponse> {
        return this.http.post<successResponse>(`${this.apiUrl}/TipoTarjeta/SaveTipoTarjeta`, tipoTarjeta).pipe(
            catchError(error => {
                Swal.fire('Error', error.error, 'warning');
                return throwError(() => error);
            })
        );
    }
    eliminarTipoTarjeta(tipoTarjetaId: string): Observable<successResponse> {
        return this.http.delete<successResponse>(`${this.apiUrl}/TipoTarjeta/DeleteTipoTarjeta/${tipoTarjetaId}`);
    }

    actualizarTipoTarjeta(tipoTarjeta: ITipoTarjeta): Observable<successResponse> {
        return this.http.put<successResponse>(`${this.apiUrl}/TipoTarjeta/UpdateTipoTarjeta/${tipoTarjeta.tipoTarjetaId}`, tipoTarjeta).pipe(
            catchError(error => {
                Swal.fire('Error', error.error, 'warning');
                return throwError(() => error);
            })
        );
    }  
}