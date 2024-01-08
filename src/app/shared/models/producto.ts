export class producto {
    clinicaId = 'D30C2D1E-E883-4B2D-818A-6813E15046E6';
    usuarioId = "";
    id = "";
    nombre = "";
    descripcion =  "";
    fecha ="";
    stock =  "";
  }
  export interface DataProducto {
    totalData: number;
    data: Iproducto[];
  }
  export interface Iproducto {
    id: string;
    nombre: string;
    descripcion: string;
    fecha:string;
    stock:string;
    estado:string;

  }
  export class ProductoResponse {
    
    nombre = "";
    descripcion =  "";
    fecha ="";
    stock =  "";
    

}