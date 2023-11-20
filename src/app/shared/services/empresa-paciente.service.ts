import { Injectable } from '@angular/core';
import { Iempresa } from '../models/empresa';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmpresaPacienteService {

  apiUrl = environment.apiURL;
  constructor(public http: HttpClient,) { }

  obtenerEmpresasPacientes(): Observable<Iempresa[]> {
    return this.http.get<Iempresa[]>(this.apiUrl + `/Empresas/GetEmpresaList`);
  }
}
