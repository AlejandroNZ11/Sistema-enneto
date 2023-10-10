import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor() { }

  public productos: any[] = [
    { id: 1001, nombre: 'Ibuprofeno', descripcion: 'Dolores', fecha:'2023-09-28',stock:'100', estado: 'Disponible' },
    { id: 1002, nombre: 'Antalgina', descripcion: 'Fiebre', fecha:'2023-09-28',stock:'100', estado: 'Disponible' },
    { id: 1003, nombre: 'Simvastatina', descripcion: 'Colesterol', fecha:'2023-09-28',stock:'100', estado: 'Disponible' },
    { id: 1004, nombre: 'Aspirina', descripcion: 'General', fecha:'2023-09-28',stock:'100', estado: 'Disponible' }
  ];

  obtenerProductos1(): any[] {
    return this.productos;
  }

  agregarProducto(nuevoProducto: any) {

    this.productos.push(nuevoProducto);
  }

}
