import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environments';
import { successResponse } from '../models/successResponse';
import { DataCaja, Icaja, caja } from '../models/caja';
@Injectable({
    providedIn: 'root'
})
export class CajaService {

    apiUrl = environment.apiURL;
    constructor(public http: HttpClient,) { }

obtenerCajas(clinicaId: string, page: number, rows: number): Observable<DataCaja> {
    return this.http.get<DataCaja>(this.apiUrl + `/Cajas/GetAllCaja?clinicaid=${clinicaId}&page=${page}&rows=${rows}`);
}
crearCaja(caja: caja): Observable<successResponse> {
    return this.http.post<successResponse>(this.apiUrl + '/Cajas/SaveCaja', caja).pipe(
    catchError(error => {
        Swal.fire('Error', error.error, 'warning');
        return throwError(() => error);
        })
    );
}

obtenerListaCaja(): Observable<Icaja[]> {
    return this.http.get<Icaja[]>(this.apiUrl + `/Cajas/GetCajaList`);
}
obtenerCaja( cajaId: string): Observable<Icaja> {
    return this.http.get<Icaja>(this.apiUrl + `/Cajas/GetCaja/${cajaId}`);
}
eliminarCaja( cajaId: string): Observable<successResponse> {
    return this.http.delete<successResponse>(this.apiUrl + `/Cajas/DeleteCaja/${cajaId}`);
}
actualizarCaja(caja: Icaja): Observable<successResponse> {
    return this.http.put<successResponse>(this.apiUrl + `/Cajas/UpdateCaja/${caja.cajaId}`, caja).pipe(
    catchError(error => {
        Swal.fire('Error', error.error, 'warning');
        return throwError(() => error);
    })
    );
}
}