import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';
import { PacienteConsentimientoData, pacienteConsentimiento } from '../models/pacienteConsentimiento';
import { successResponse } from '../models/successResponse';
import { PacienteRecetaData } from '../models/pacienteReceta';

@Injectable({providedIn: 'root'})
export class PacienteConsentimientoService {

  apiUrl = environment.apiURL;
  constructor(public http: HttpClient) { }

  obtenerPacienteConsentimiento():Observable<PacienteRecetaData>{
    return this.http.get<PacienteRecetaData>('/assets/json/pacienteConsentimiento.json');
  }

  // agregarPacienteConsentimiento(pacienteConsen:pacienteConsentimiento):Observable<successResponse>{
  //   return this.http.post<successResponse>(this.apiUrl + `/PacienteConsentimiento/SavePacienteConsentimiento`,pacienteConsen);
  // }

}
