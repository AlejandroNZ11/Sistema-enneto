import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environments';
import { successResponse } from '../models/successResponse';
import { DatatipoInventario, Itipoinventario, tipoinventario } from '../models/tipoInventario';
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
    obtenerTipoInventarioList(): Observable<Itipoinventario[]> {
        return this.http.get<Itipoinventario[]>(this.apiUrl + `/TipoInventario/GetTipoInventarioList`);
    }
    
    obtenerTipoInventario( tipoinventarioId: string): Observable<Itipoinventario> {
        return this.http.get<Itipoinventario>(this.apiUrl + `/TipoInventario/GetTipoInventario/${tipoinventarioId}`);
    }
    eliminarTipoInventario( tipoinventarioId: string): Observable<successResponse> {
        return this.http.delete<successResponse>(this.apiUrl + `/TipoInventario/DeleteTipoInventario/${tipoinventarioId}`);
    }
    actualizarTipoInventario(tipoinventario: Itipoinventario): Observable<successResponse> {
        return this.http.put<successResponse>(this.apiUrl + `/TipoInventario/UpdateTipoInventario/${tipoinventario.tipoinventarioId}`, tipoinventario).pipe(
        catchError(error => {
            Swal.fire('Error', error.error, 'warning');
            return throwError(() => error);
        })
        );
    }
}