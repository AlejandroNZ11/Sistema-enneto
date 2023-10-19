
export class sede {
    clinicaId = 'D30C2D1E-E883-4B2D-818A-6813E15046E6';
    usuarioId = "";
    nombre = "";
    descripcion = "";
  }
  export interface DataSede {
    totalData: number;
    data: Isede[];
  }
  export interface Isede {
    sedeId: string;
    nombre: string;
    descripcion: string;
    estado:string ;
  }