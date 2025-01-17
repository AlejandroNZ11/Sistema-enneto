import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environments';
import { successResponse } from '../models/successResponse';
import { DataConsentimiento, Iconsentimiento, consentimiento } from '../models/consentimiento';
@Injectable({
    providedIn: 'root'
})
export class ConsentimientoService {

    apiUrl = environment.apiURL;
    constructor(public http: HttpClient) { }

    obtenerConsentimientos(clinicaId: string, page: number, rows: number): Observable<DataConsentimiento> {
        return this.http.get<DataConsentimiento>(this.apiUrl + `/Consentimientos/GetAllConsentimiento?clinicaid=${clinicaId}&page=${page}&rows=${rows}`);
    }
    crearConsentimiento(consentimiento: consentimiento): Observable<successResponse> {
        return this.http.post<successResponse>(this.apiUrl + '/Consentimientos/SaveConsentimiento', consentimiento).pipe(
        catchError(error => {
            Swal.fire('Error', error.error, 'warning');
            return throwError(() => error);
        })
        );
    }

    obtenerConsentimiento( consentimientoId: string): Observable<Iconsentimiento> {
        return this.http.get<Iconsentimiento>(this.apiUrl + `/Consentimientos/GetConsentimiento/${consentimientoId}`);
    }
    eliminarConsentimiento( consentimientoId: string): Observable<successResponse> {
        return this.http.delete<successResponse>(this.apiUrl + `/Consentimientos/DeleteConsentimiento/${consentimientoId}`);
    }
    actualizarConsentimiento(consentimiento: Iconsentimiento): Observable<successResponse> {
        return this.http.put<successResponse>(this.apiUrl + `/Consentimientos/UpdateConsentimiento/${consentimiento.consentimientoId}`, consentimiento).pipe(
        catchError(error => {
            Swal.fire('Error', error.error, 'warning');
            return throwError(() => error);
        })
        );
    }
}
