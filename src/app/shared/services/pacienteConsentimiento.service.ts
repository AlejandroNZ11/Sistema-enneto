import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';
import { PacienteConsentimientoData } from '../models/pacienteConsentimiento';

@Injectable({providedIn: 'root'})
export class PacienteConsentimientoService {

  apiUrl = environment.apiURL;
  constructor(public http: HttpClient) { }

  obtenerPacienteConsentimiento():Observable<PacienteConsentimientoData>{
    return this.http.get<PacienteConsentimientoData>('/assets/json/pacienteConsentimiento.json')
  }

}
