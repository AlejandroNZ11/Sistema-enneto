import { Component } from '@angular/core';
import {routes } from 'src/app/shared/routes/routes';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ProductosService } from '../productos.service';


@Component({
  selector: 'app-agregar-productos',
  templateUrl: './agregar-productos.component.html',
  styleUrls: ['./agregar-productos.component.scss']
})
export class AgregarProductosComponent {
  constructor(public bsModalRef: BsModalRef,private ProductosService: ProductosService) { }
  public routes = routes;
  productos: any[] = [];

  Cancelar() {
    this.bsModalRef.hide();
  }
  agregarProducto()
  {
    
  }
}