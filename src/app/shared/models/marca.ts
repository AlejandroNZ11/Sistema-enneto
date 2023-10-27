export class marca {
    clinicaId = "3fa85f64-5717-4562-b3fc-2c963f66afa6";
    usuarioId = "";
    nombre = "";
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