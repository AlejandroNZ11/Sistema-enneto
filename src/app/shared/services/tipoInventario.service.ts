import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environments';
import { successResponse } from '../models/successResponse';
import { DatatipoInventario, Itiponiventario, tipoinventario } from '../models/tipoInventario';
@Injectable({
    providedIn: 'root'
})
export class TipoInventarioService {

    apiUrl = environment.apiURL;
    constructor(public http: HttpClient,) { }

    obtenerTipoInventarios(clinicaId: string, page: number, rows: number): Observable<DatatipoInventario> {
        return this.http.get<DatatipoInventario>(this.apiUrl + `/TipoInventario/GetAllTipoInventario?clinicaid=${clinicaId}&page=${page}&rows=${rows}`);
    }

    crearTipoInventario(Tipoinventario: tipoinventario): Observable<successResponse> {
        return this.http.post<successResponse>(this.apiUrl + '/TipoInventario/SaveTipoInventario', Tipoinventario).pipe(
            catchError(error => {
                Swal.fire('Error', error.error, 'warning');
                return throwError(() => error);
            })
        );
    }




}