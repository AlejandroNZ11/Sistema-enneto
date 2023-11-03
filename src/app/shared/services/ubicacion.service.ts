import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environments';
import { DataPais,pais } from '../models/pais';
import { successResponse } from '../models/successResponse';
import Swal from 'sweetalert2';
import { DataDepartamento } from '../models/departamento';
import { DataProvincia } from '../models/provincia';
import { DataDistrito } from '../models/distrito';

@Injectable({
  providedIn: 'root'
})
export class UbicacionService {

  apiUrl = environment.apiURL;
  constructor(public http: HttpClient,) { }

  obtenerPaises(clinicaId: string, page: number, rows: number): Observable<DataPais> {
    return this.http.get<DataPais>(this.apiUrl + `/Paises/GetAllPais?clinicaid=${clinicaId}&page=${page}&rows=${rows}`);
  }
  crearPais(pais: pais): Observable<successResponse> {
    return this.http.post<successResponse>(this.apiUrl + '/Paises/SavePais', pais).pipe(
      catchError((error: { error: any; }) => {
        Swal.fire('Error', error.error, 'warning');
        return throwError(() => error);
      })
    );
  }
  obtenerDepartamentos(clinicaId: string, page: number, rows: number): Observable<DataDepartamento> {
    return this.http.get<DataDepartamento>(this.apiUrl + `/Departamentos/GetAllDepartamento?clinicaid=${clinicaId}&page=${page}&rows=${rows}`);
  }
  obtenerProvincias(clinicaId: string, page: number, rows: number): Observable<DataProvincia> {
    return this.http.get<DataProvincia>(this.apiUrl + `/Provincias/GetAllProvincias?clinicaid=${clinicaId}&page=${page}&rows=${rows}`);
  }
  obtenerDistritos(clinicaId: string, page: number, rows: number): Observable<DataDistrito> {
    return this.http.get<DataDistrito>(this.apiUrl + `/Distritos/GetAllDistritos?clinicaid=${clinicaId}&page=${page}&rows=${rows}`);
  }
}
