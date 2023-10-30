
export class especialidad {
  clinicaId = 'D30C2D1E-E883-4B2D-818A-6813E15046E6';
  usuarioId = "";
  nombre = "";
  descripcion = "";
}
export interface DataEspecialidad {
  totalData: number;
  data: Iespecialidad[];
}
export interface Iespecialidad {
  especialidadId: string;
  nombre: string;
  descripcion: string;
  estado: string;
}
export class especialidadResponse {
  nombre = "";
  descripcion = "";
}