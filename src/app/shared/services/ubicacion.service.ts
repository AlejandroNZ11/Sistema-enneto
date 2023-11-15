import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environments';
import { DataPais,Ipais,pais } from '../models/pais';
import { successResponse } from '../models/successResponse';
import Swal from 'sweetalert2';
import { DataDepartamento, Idepartamento } from '../models/departamento';
import { DataProvincia, Iprovincia } from '../models/provincia';
import { DataDistrito, Idistrito } from '../models/distrito';

@Injectable({
  providedIn: 'root'
})
export class UbicacionService {

  apiUrl = environment.apiURL;
  constructor(public http: HttpClient,) { }

  obtenerPaises(): Observable<Ipais[]> {
    return this.http.get<Ipais[]>(this.apiUrl + `/Paises/GetPaisList`);
  }
  crearPais(pais: pais): Observable<successResponse> {
    return this.http.post<successResponse>(this.apiUrl + '/Paises/SavePais', pais).pipe(
      catchError((error: { error: any; }) => {
        Swal.fire('Error', error.error, 'warning');
        return throwError(() => error);
      })
    );
  }
  obtenerDepartamentos(): Observable<Idepartamento[]> {
    return this.http.get<Idepartamento[]>(this.apiUrl + `/Departamentos/GetDepartamentoList`);
  }
  obtenerProvincias(departamentoId: string): Observable<Iprovincia[]> {
    return this.http.get<Iprovincia[]>(this.apiUrl + `/Provincias/GetProvinciasByDepartamento?departamentoId=${departamentoId}`);
  }
  obtenerDistritos(provinciaId: string): Observable<Idistrito[]> {
    return this.http.get<Idistrito[]>(this.apiUrl + `/Distritos/GetDistritoByProvincia?provinciaId=${provinciaId}`);
  }
}
