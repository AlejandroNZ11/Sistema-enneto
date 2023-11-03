export class distrito {
    clinicaId = 'D30C2D1E-E883-4B2D-818A-6813E15046E6';
    usuarioId = "";
    nombre = "";
    provinciaId="";
  }
  export interface DataDistrito {
    totalData: number;
    data: Idistrito[];
  }
  export interface Idistrito{
    distritoId: string;
    nombre: string;
    provinciaId: string;
    estado: string;
  }
