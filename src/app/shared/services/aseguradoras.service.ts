import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environments';
import { successResponse } from '../models/successResponse';
import { DataAseguradoras, Iaseguradoras, aseguradoras } from '../models/aseguradoras';

@Injectable({
    providedIn: 'root'
})
export class AseguradorasService {

    apiUrl = environment.apiURL;
    constructor(public http: HttpClient,) { }

    obtenerAseguradoras(): Observable<Iaseguradoras[]> {
        return this.http.get<Iaseguradoras[]>(this.apiUrl + '/Aseguradoras/GetAseguradoraList');
    }
    crearAseguradora(Aseguradoras: aseguradoras): Observable<successResponse> {
        return this.http.post<successResponse>(this.apiUrl + '/Almacenes/SaveAseguradora', Aseguradoras).pipe(
            catchError(error => {
                Swal.fire('Error', error.error, 'warning');
                return throwError(() => error);
            })
        );
    }
}
