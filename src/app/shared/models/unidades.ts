
export class unidad {
    clinicaId = 'D30C2D1E-E883-4B2D-818A-6813E15046E6';
    usuarioId = "";
    nombre = ""; 
    descripcion= "";
    siglas="";
    estado="";
  }
  export interface DataUnidad {
    totalData: number;
    data: Iunidad[];
  }
  export interface Iunidad {
    unidadId: string;
    nombre: string;
    siglas: string;
    descripcion: string;
    estado: string;
  }

  export class UnidadResponse {
    nombre = ""; 
    descripcion= "";
    siglas=""; 
}