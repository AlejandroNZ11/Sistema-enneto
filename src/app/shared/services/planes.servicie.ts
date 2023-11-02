import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environments';
import { successResponse } from '../models/successResponse';
import { DataPlanes, PlanesRequest, PlanesResponse } from '../models/planes';
@Injectable({
    providedIn: 'root'
})
export class PlanesService {
    apiUrl = environment.apiURL;
    constructor(public http: HttpClient) { }

    obtenerPlanes(clinicaId: string, page: number, rows: number): Observable<DataPlanes> {
        return this.http.get<DataPlanes>(this.apiUrl + `/Plan/GetAllPlan?clinicaid=${clinicaId}&page=${page}&rows=${rows}`);
    }
    crearPlan(pagos: PlanesRequest): Observable<successResponse> {
        return this.http.post<successResponse>(this.apiUrl + '/Plan/SavePlan', pagos).pipe(
            catchError(error => {
                Swal.fire('Error', error.error, 'warning');
                return throwError(() => error);
            })
        );
    }

}