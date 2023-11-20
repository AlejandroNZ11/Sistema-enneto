import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';
import { DataEstadoCivil, IestadoCivil } from '../models/estadoCivil';

@Injectable({
  providedIn: 'root'
})
export class EstadoCivilService {

  apiUrl = environment.apiURL;
  constructor(public http: HttpClient,) { }

  obtenerEstadosCiviles(): Observable<IestadoCivil[]> {
    return this.http.get<IestadoCivil[]>(this.apiUrl + `/EstadosCivil/GetEstadoCivilList`);
  }
}
