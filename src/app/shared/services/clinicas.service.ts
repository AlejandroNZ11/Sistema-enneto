import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environments';
import { successResponse } from '../models/successResponse';
import { DataClinicas, Iclinicas, Clinicas } from '../models/clinicas';
@Injectable({
    providedIn: 'root'
})
export class ClinicasService {
    apiUrl = environment.apiURL;
    constructor(public http: HttpClient) { }

    obtenerClinicas(clinicaId: string, page: number, rows: number): Observable<DataClinicas> {
        return this.http.get<DataClinicas>(this.apiUrl + `/Clinicas/GetAllClinica?clinicaid=${clinicaId}&page=${page}&rows=${rows}`);
    }
    crearClinica(clinicas:Clinicas): Observable<successResponse> {
        return this.http.post<successResponse>(this.apiUrl + `/Clinicas/SaveClinica`, clinicas).pipe(
            catchError(error => {
                Swal.fire('Error', error.error, 'warning');
                return throwError(() => error);
            })
        );
    }
    obtenerClinica(clinicaId:string): Observable<Iclinicas> {
        return this.http.get<Iclinicas>(this.apiUrl + `/Clinicas/GetClinica/${clinicaId}`);
    }
    eliminarClinica(clinicaId:string): Observable<successResponse> {
        return this.http.delete<successResponse>(this.apiUrl + `/Clinicas/DeleteClinica/${clinicaId}`);
    }
    actualizarClinica(clinicas: Iclinicas): Observable<successResponse> {
        return this.http.put<successResponse>(this.apiUrl + `/Clinicas/UpdateClinica/${clinicas.clinicaId}`,clinicas).pipe(
            catchError(error => {
                Swal.fire('Error', error.error, 'warning');
                return throwError(() => error);
            })
        );
    }
}