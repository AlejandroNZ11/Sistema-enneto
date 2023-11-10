import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environments';
import { successResponse } from '../models/successResponse';
import { DataPlanes, IPlanes, Planes } from '../models/planes';
@Injectable({
    providedIn: 'root'
})
export class PlanesService {
    apiUrl = environment.apiURL;
    constructor(public http: HttpClient) { }

    obtenerPlanes(clinicaId: string, page: number, rows: number): Observable<DataPlanes> {
        return this.http.get<DataPlanes>(this.apiUrl + `/Plan/GetAllPlan?clinicaid=${clinicaId}&page=${page}&rows=${rows}`);
    }
    crearPlan(planes: Planes): Observable<successResponse> {
        return this.http.post<successResponse>(this.apiUrl + '/Plan/SavePlan', planes).pipe(
            catchError(error => {
                Swal.fire('Error', error.error, 'warning');
                return throwError(() => error);
            })
        );
    }
    obtenerPlan(planId: string): Observable<IPlanes> {
        return this.http.get<IPlanes>(this.apiUrl + `/Plan/GetPlan/${planId}`);
    }
    eliminarPlan(planId: string): Observable<successResponse> {
        return this.http.delete<successResponse>(this.apiUrl + `/Plan/DeletePlan/${planId}`);
    }
    actualizarPlan(planes: IPlanes): Observable<successResponse> {
        return this.http.put<successResponse>(this.apiUrl + `/Plan/UpdatePlan/${planes.planId}`, planes).pipe(
            catchError(error => {
                Swal.fire('Error', error.error, 'warning');
                return throwError(() => error);
            })
        );
    }
}