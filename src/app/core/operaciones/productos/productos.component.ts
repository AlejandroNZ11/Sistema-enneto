import { Component ,OnInit} from '@angular/core';
import { ProductosService } from './productos.service';
import { BsModalRef , BsModalService} from 'ngx-bootstrap/modal';
import { routes } from 'src/app/shared/routes/routes';
import { AgregarProductosComponent } from './agregar-productos/agregar-productos.component';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent {

  constructor(public ProductosService:ProductosService,
    public bsModalRef: BsModalRef,
    private modalService:BsModalService) { }


  ngOnInit(): void {
    this.obtenerProductos(); 
  }

  valorBusqueda: string = '';
  public routes = routes;
  productos: any[] = [];
  nuevoProducto : any={
    id:'',
    nombre:'',
    descripcion:'',
    fecha:'',
    stock:'',
    estado:''
  };

  obtenerProductos() {
    this.productos = this.ProductosService.obtenerProductos1();
  }
  Cancelar() {
    this.bsModalRef.hide();
  }
  agregarProducto() {
    this.ProductosService.agregarProducto(this.nuevoProducto);
    //this.ProductosService.agregarProducto(this.nuevoProducto);
    this.nuevoProducto = { id:'',
    nombre:'',
    descripcion:'',
    fecha:'',
    stock:'',
    estado:'' };
    
    //this.nuevoProducto = {};

   
    this.obtenerProductos();
  }

  filtrarProductos() {
    if (this.valorBusqueda.trim() === '') {
      // Si el valor de búsqueda está vacío, muestra todos los datos
      this.productos = this.ProductosService.productos;
    } else {
      // Filtra los datos por nombre
      this.productos = this.ProductosService.productos.filter(
        producto => producto.nombre.toLowerCase().includes(this.valorBusqueda.toLowerCase())
      );
    }
  }
  eliminarProducto(index: number) {
    this.productos.splice(index, 1);
  }
  AgregarProductos2() {
    this.bsModalRef = this.modalService.show(AgregarProductosComponent),
    this.bsModalRef.onHidden?.subscribe(() => {
      
    });
  }
  
}