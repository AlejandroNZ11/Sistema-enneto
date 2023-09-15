
export class especialidad {
    clinicaId: string = 'D30C2D1E-E883-4B2D-818A-6813E15046E6';
    usuarioId: string = "";
    nombre: string = "";
    descripcion: string = "";
  }
  export interface DataEspecialidad {
    totalData: number;
    data: Iespecialidad[];
  }
  export interface Iespecialidad {
    especialidadId: string;
    nombre: string;
    descripcion: string;
    estado:string;
  }