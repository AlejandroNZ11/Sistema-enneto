export class provincia {
    clinicaId = 'D30C2D1E-E883-4B2D-818A-6813E15046E6';
    usuarioId = "";
    nombre = "";
    departamentoId="";
  }
  export interface DataProvincia {
    totalData: number;
    data: Iprovincia[];
  }
  export interface Iprovincia{
    provinciaId: string;
    nombre: string;
    departamentoId: string;
    estado: string;
  }
