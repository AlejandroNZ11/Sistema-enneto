import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { DataGradoInstruccion, IgradoInstruccion } from '../models/estudio';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GradoInstruccionService {

  apiUrl = environment.apiURL;
  constructor(public http: HttpClient,) { }

  obtenerGradoInstruccion(): Observable<IgradoInstruccion[]> {
    return this.http.get<IgradoInstruccion[]>(this.apiUrl + `/Estudios/GetEstudioList`);
  }
}
