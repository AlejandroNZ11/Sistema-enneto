import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environments';
import { successResponse } from '../models/successResponse';
import { DataClientes, IClientes, Clientes } from '../models/clientes';

@Injectable({
    providedIn: 'root'
})
export class ClientesService {
    apiUrl = environment.apiURL;

    constructor(private http: HttpClient) {}

    obtenerClientes(clinicaId: string, page: number, rows: number): Observable<DataClientes> {
    return this.http.get<DataClientes>(`${this.apiUrl}/Clientes/GetAllCliente?clinicaid=${clinicaId}&page=${page}&rows=${rows}`);
    }

    crearClientes(clientes: Clientes): Observable<successResponse> {
    return this.http.post<successResponse>(`${this.apiUrl}/Clientes/SaveCliente`, clientes).pipe(
        catchError(error => {
        console.error('Error en la solicitud:', error);
        Swal.fire('Error', 'Ocurrió un error al guardar el cliente', 'warning');
        return throwError(() => error);
        })
    );
    }

    obtenerCliente(clienteId: string): Observable<IClientes> {
    return this.http.get<IClientes>(`${this.apiUrl}/Clientes/GetCliente/${clienteId}`);
    }

    actualizarCliente(clientes: IClientes): Observable<successResponse> {
    return this.http.put<successResponse>(`${this.apiUrl}/Clientes/UpdateCliente/${clientes.clienteId}`, clientes).pipe(
        catchError(error => {
        Swal.fire('Error', error.error, 'warning');
        return throwError(() => error);
        })
    );
    }

    eliminarCliente(clienteId: string): Observable<successResponse> {
    return this.http.delete<successResponse>(`${this.apiUrl}/Clientes/DeleteCliente/${clienteId}`).pipe(
        catchError(error => {
        console.error('Error en la solicitud:', error);
        Swal.fire('Error', 'Ocurrió un error al eliminar el cliente', 'warning');
        return throwError(() => error);
        })
    );
    }
}
