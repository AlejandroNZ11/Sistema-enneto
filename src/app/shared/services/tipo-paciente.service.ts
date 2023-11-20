import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { DataTipoPaciente, ItipoPaciente } from '../models/tipoPaciente';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoPacienteService {

  apiUrl = environment.apiURL;
  constructor(public http: HttpClient,) { }

  obtenerTipoPacientes(): Observable<ItipoPaciente[]> {
    return this.http.get<ItipoPaciente[]>(this.apiUrl + `/TiposPaciente/GetTipoPacienteList`);
  }
}
