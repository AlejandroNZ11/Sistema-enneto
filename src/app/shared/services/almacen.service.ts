import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environments';
import { successResponse } from '../models/successResponse';
import { DataAlmacen, Ialmacen, almacen } from '../models/almacen';

@Injectable({
    providedIn: 'root'
})
export class AlmacenService {

    apiUrl = environment.apiURL;
    constructor(public http: HttpClient,) { }

    obtenerAlmacenes(clinicaId: string, page: number, rows: number): Observable<DataAlmacen> {
        return this.http.get<DataAlmacen>(this.apiUrl + `/Almacenes/GetAllAlmacen?clinicaid=${clinicaId}&page=${page}&rows=${rows}`);
    }
    crearAlmacen(Almacen: almacen): Observable<successResponse> {
        return this.http.post<successResponse>(this.apiUrl + '/Almacenes/SaveAlmacen', Almacen).pipe(
            catchError(error => {
                Swal.fire('Error', error.error, 'warning');
                return throwError(() => error);
            })
        );
    }
}