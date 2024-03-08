
export class pacienteConsentimiento {
  clinicaId='D30C2D1E-E883-4B2D-818A-6813E15046E6';
  usuarioId=''
  pacienteId=''
  tipoConsentimientoId=0
  cuerpo=''
  fecha=''
  hora: Hora = { ticks: 0 };
  apoderadoNombre=''
  apoderadoDocumento=''
  apoderadoDireccion=''
  pacienteRelacionadoId=0
  medicoId=0
  estado=0
  firma=''
}

export interface PacienteConsentimientoData {
  data: IPacienteConsentimiento[];
  totalData: number;
}
export interface IPacienteConsentimiento {
  clinicaId:                string;
  usuarioId:                string;
  pacienteConsentimientoId: string;
  pacienteId:               string;
  tipoConsentimientoId:     number;
  cuerpo:                   string;
  fecha:                    string;
  hora:                     Hora;
  apoderadoNombre:          string;
  apoderadoDocumento:       string;
  apoderadoDireccion:       string;
  pacienteRelacionadoId:    number;
  medicoId:                 number;
  estado:                   number;
  firma:                    string;
}

export interface Hora {
  ticks: number;
}
