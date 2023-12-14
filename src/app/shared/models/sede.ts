
export class sede {
    clinicaId = 'D30C2D1E-E883-4B2D-818A-6813E15046E6';
    usuarioId = "";
    nombre = "";
  }
  export interface DataSede {
    totalData: number;
    data: Isede[];
  }
  export interface Isede {
    sedeId: string;
    codigo: string;
    nombre: string;
    direccion: string;
    ubigeo: string;
    estado:string ;
    descripcion:string;
  }

  export class sedeResponse {
    nombre = "";
  }