export class proveedor {
    clinicaId = 'D30C2D1E-E883-4B2D-818A-6813E15046E6';
    usuarioId = "";
    ruc = "";
    nombre = "";
    direccion =  "";
    telefono ="";
    contacto =  "";
    correo=  "";
  }
  export interface DataProveedor {
    totalData: number;
    data: Iproveedor[];
  }
  export interface Iproveedor {
    proveedorId:string;
    ruc : string;
    nombre : string;
    direccion : string;
    telefono : number;
    contacto : string;
    correo: string;

  }
  export class proveedorResponse {
    ruc ="";
    nombre = "";
    direccion = "";
    telefono="";
    contacto="";
    correo="";
  }