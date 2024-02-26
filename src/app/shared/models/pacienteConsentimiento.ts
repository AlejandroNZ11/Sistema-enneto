
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
