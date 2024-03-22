import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environments';
import { successResponse } from '../models/successResponse';
import { cajaAC } from '../models/cajaAC';

@Injectable({
    providedIn: 'root'
})

export class CajaACService {

    apiUrl = environment.apiURL;
    constructor(public http: HttpClient,) { }
abrirCaja(caja: cajaAC): Observable<successResponse> {
    return this.http.post<successResponse>(this.apiUrl + '/CajasApertura/SaveCajaApertura', caja).pipe(
    catchError(error => {
        Swal.fire('Error', error.error, 'warning');
        return throwError(() => error);
        })
    );
}

aperturarCaja(caja: cajaAC): successResponse {
    return {
        isSuccess: true,
        message: "Registro guardado correctamente"
    }
}



}