import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';
import { PacienteImagenData } from '../models/pacienteImagenes';

@Injectable({providedIn: 'root'})
export class PacienteImagenService {

  apiUrl = environment.apiURL;
  constructor(public http: HttpClient) { }

  obtenerPacienteImagenes():Observable<PacienteImagenData>{
    return this.http.get<PacienteImagenData>('/assets/json/pacienteImagenes.json');
  }

  // agregarPacienteConsentimiento(pacienteConsen:pacienteConsentimiento):Observable<successResponse>{
  //   return this.http.post<successResponse>(this.apiUrl + `/PacienteConsentimiento/SavePacienteConsentimiento`,pacienteConsen);
  // }

}
