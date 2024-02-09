export class tipoCitado {
  clinicaId = 'D30C2D1E-E883-4B2D-818A-6813E15046E6';
  usuarioId = "";
  nombre = "";
  color = "";
}
export interface ItipoCitado {
  tipoCitadoId: string;
  nombre: string;
  color: string;
  estado: string;
}
export interface DataTipoCitado {
  totalData: number;
  data: ItipoCitado[];
}

export class tipoCitadoResponse {
  nombre = "";
}