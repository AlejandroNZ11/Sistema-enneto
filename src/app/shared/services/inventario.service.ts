import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environments';
import { successResponse } from '../models/successResponse';
import { DataInventario, IInventario, inventario } from '../models/inventario'; 
@Injectable({
    providedIn: 'root'
})
export class InventarioService {

    apiUrl = environment.apiURL;
    constructor(public http: HttpClient,) { }

    obtenerInventarios(clinicaId: string, page: number, rows: number): Observable<DataInventario> {
        return this.http.get<DataInventario>(this.apiUrl + `/Inventarios/GetAllInventario?clinicaid=${clinicaId}&page=${page}&rows=${rows}`);
    }
    
    crearInventario(Inventario: inventario): Observable<successResponse> {
        return this.http.post<successResponse>(this.apiUrl + '/Inventarios/SaveInventario', Inventario).pipe(
            catchError(error => {
                Swal.fire('Error', error.error, 'warning');
                return throwError(() => error);
            })
        );
    }
    

    actualizarInventario(inventario: IInventario): Observable<successResponse> {
        return this.http.put<successResponse>(this.apiUrl + `/Inventarios/${inventario.inventarioId}`, inventario).pipe(
            catchError(error => {
                Swal.fire('Error', error.error, 'warning');
                return throwError(() => error);
            })
        );
    }

    

    
}