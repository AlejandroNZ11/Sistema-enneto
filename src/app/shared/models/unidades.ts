
export class unidad {
    clinicaId = '3fa85f64-5717-4562-b3fc-2c963f66afa6';
    usuarioId = "";
    nombre = ""; 
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
    estado:string;
  }