export class marca {
    clinicaId = 'D30C2D1E-E883-4B2D-818A-6813E15046E6';
    usuarioId = "";
    nombre = "";
    descripcion="";
    estado="";
  }
  export interface DataMarca {
    totalData: number;
    data: Imarca[];
  }
  export interface Imarca {
    marcaMaterialesId: string;
    nombre: string;
    estado:string;
  }
