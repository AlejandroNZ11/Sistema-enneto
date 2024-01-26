import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';
import { Enfermedad } from '../models/enfermedad';

@Injectable({providedIn: 'root'})
export class EnfermedadService {

  apiUrl = environment.apiURL;
  constructor(public http: HttpClient,) { }

  obtenerEnfermedadesList():Observable<Enfermedad[]>{
    return this.http.get<Enfermedad[]>(this.apiUrl+`/Enfermedad/GetEnfermedadList`);
  }



}
