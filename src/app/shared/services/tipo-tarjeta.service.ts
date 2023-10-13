import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, } from 'rxjs';
import { environment } from 'src/environments/environments';
import { tipoTarjeta, ITipoTarjeta, DataTipoTarjetas } from '../models/tipotarjeta';
@Injectable({
    providedIn: 'root'
})
export class TipoTarjetaService {
    apiUrl = environment.apiURL;
    constructor(public http: HttpClient) { }

    obtenerTarjetas(clinicaId: string, page: number, rows: number): Observable<DataTipoTarjetas> {
        return this.http.get<DataTipoTarjetas>(this.apiUrl + `/TipoTarjeta/GetAllTipoTarjeta?clinicaid=${clinicaId}&page=${page}&rows=${rows}`);
    }    
}