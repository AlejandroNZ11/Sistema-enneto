import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';
import { DataEvolucionPaciente } from '../models/evolucionPaciente';

@Injectable({providedIn: 'root'})
export class EvolucionPacienteService {
  apiUrl = environment.apiURL;
  constructor(public http: HttpClient,) { }

  // obtenerEvolucionPacienteList():Observable<DataEvolucionPaciente>{
  //   return this.http.get<DataEvolucionPaciente>('/assets/json/evolucionPaciente.json');
  // }

  obtenerEvolucionPacienteList(clinicaId: string, page:number, rows:number, pacienteId:string):Observable<DataEvolucionPaciente>{
    return this.http.get<DataEvolucionPaciente>(this.apiUrl+`/PacientesEvoluciones/GetAllPacienteEvolucion?clinicaId=${clinicaId}&page=${page}&rows=${rows}&pacienteId=${pacienteId}`);
  }





}
