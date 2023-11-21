import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environments';
import { successResponse } from '../models/successResponse';
import { DataClientes, IClientes, clientes } from '../models/clientes';
@Injectable({
    providedIn: 'root'
})
export class ClientesService {
    apiUrl = environment.apiURL;
    constructor(public http: HttpClient,) { }

    obtenerClientes(clinicaId: string, page: number, rows: number): Observable<DataClientes> {
        return this.http.get<DataClientes>(this.apiUrl + `/Clientes/GetAllCliente?clinicaid=${clinicaId}&page=${page}&rows=${rows}`);
    }
    crearClientes(clientes: clientes): Observable<successResponse> {
        return this.http.post<successResponse>(this.apiUrl + '/Clientes/SaveCliente', clientes).pipe(
            catchError(error => {
                Swal.fire('Error', error.error, 'warning');
                return throwError(() => error);
            })
        );
    }

    actualizarCliente(clientes: IClientes): Observable<successResponse> {
        return this.http.put<successResponse>(this.apiUrl + `/Clientes/${clientes.clienteId}`, clientes).pipe(
            catchError(error => {
                Swal.fire('Error', error.error, 'warning');
                return throwError(() => error);
            })
        );
    }
    obtenerCliente(clienteId: string): Observable<IClientes> {
        return this.http.get<IClientes>(this.apiUrl + `/Clientes/GetCliente/${clienteId}`);
    }
    eliminarCliente(clienteId: string): Observable<successResponse> {
        return this.http.delete<successResponse>(this.apiUrl + `/Clientes/DeleteCliente/${clienteId}`);
    }


}
