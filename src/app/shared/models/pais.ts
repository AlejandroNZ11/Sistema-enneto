
export class pais {
    clinicaId = 'D30C2D1E-E883-4B2D-818A-6813E15046E6';
    usuarioId = "";
    iso = "";
    nombre = "";
    gentilicio = "";
    orden = "";
  }
  export interface DataPais {
    totalData: number;
    data: Ipais[];
  }
  export interface Ipais {
    paisId: string;
    iso:string;
    nombre: string;
    gentilicio: string;
    orden: string;
  }
