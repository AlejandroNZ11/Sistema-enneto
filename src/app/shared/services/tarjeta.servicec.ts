import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, } from 'rxjs';
import { environment } from 'src/environments/environments';
import { tarjeta } from '../models/models';
@Injectable({
    providedIn: 'root'
})
export class TarjetaService {
    apiUrl = environment.apiURL;
    constructor(public http: HttpClient) { }

    obtenerTarjetas(clinicaId: string, page: number, rows: number): Observable<tarjeta> {
        return this.http.get<tarjeta>(this.apiUrl + `/TipoTarjeta/GetAllTipoTarjeta?clinicaid=${clinicaId}&page=${page}&rows=${rows}`);
    }    
}