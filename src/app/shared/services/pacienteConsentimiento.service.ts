import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';
import { PacienteConsentimientoData, pacienteConsentimiento } from '../models/pacienteConsentimiento';
import { successResponse } from '../models/successResponse';

@Injectable({providedIn: 'root'})
export class PacienteConsentimientoService {

  apiUrl = environment.apiURL;
  constructor(public http: HttpClient) { }

  // obtenerPacienteConsentimiento():Observable<PacienteConsentimientoData>{
  //   return this.http.get<PacienteConsentimientoData>('/assets/json/pacienteConsentimiento.json');
  // }

  obtenerPacienteConsentimiento(clinicaId:string, page:number, rows:number, pacienteId:string):Observable<PacienteConsentimientoData>{

    const parametros = {
      clinicaId: clinicaId,
      page: page,
      rows: rows,
      pacienteId: pacienteId
    };

    const parametrosJson = JSON.stringify(parametros);

    return this.http.get<PacienteConsentimientoData>(this.apiUrl + `/PacienteConsentimiento/GetAllPacienteConsentimiento`,);
  }

  agregarPacienteConsentimiento(pacienteConsentimiento:FormData):Observable<successResponse>{
    console.log({pacienteConsentimiento})
    return this.http.post<successResponse>(this.apiUrl + `/PacienteConsentimiento/SavePacienteConsentimiento`,pacienteConsentimiento);
  }

}
