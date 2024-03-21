

export class pacienteRecetaRequest {
  clinicaId='D30C2D1E-E883-4B2D-818A-6813E15046E6';
  usuarioId=''
  pacienteId=''
  fecha=''
  // hora: Hora = { ticks: 0 };
  hora=0
  asunto=''
  receta=''
  medicoId=''
  codigoEnfermedad01=''
  codigoEnfermedad02=''
  codigoEnfermedad03=''
  indicaciones=''
  estado=0
}

export interface PacienteRecetaData{
  data: IPacienteReceta[];
  totalData: number
}

export interface IPacienteReceta {
  pacienteRecetaId:   string;
  pacienteId:         string;
  fecha:              string;
  // hora:               { [key: string]: number };
  hora:number;
  asunto:             string;
  receta:             string;
  medicoId:           string;
  codigoEnfermedad01: string;
  nombreEnfermedad01:string;
  codigoEnfermedad02: string;
  nombreEnfermedad02:string;
  codigoEnfermedad03: string;
  indicaciones:       string;
  estado:             number;
}

// export interface Hora {
//   ticks: number;
// }
