
export class pacienteConsentimiento {
  clinicaId='D30C2D1E-E883-4B2D-818A-6813E15046E6';
  usuarioId='b9ee1329-9f8f-4ce5-a6a6-c3d849b1af39'
  pacienteId=''
  tipoConsentimientoId=0
  cuerpo=''
  fecha=''
  hora= '';
  apoderadoNombre=''
  apoderadoDocumento=''
  apoderadoDireccion=''
  pacienteRelacionadoId=0
  medicoId=0
  estado=0
  firma=''
}

export class pacienteConsentimientoEditar {
  clinicaId='D30C2D1E-E883-4B2D-818A-6813E15046E6';
  pacienteConsentimientoId='';
  pacienteId=''
  tipoConsentimientoId=0
  cuerpo=''
  fecha=''
  hora= '';
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
  pacienteConsentimientoId: string;
  pacienteId:               string;
  consentimientoId:     string;
  cuerpo:                   string;
  fecha:                    string;
  hora:                     string;
  apoderadoNombre:          string;
  apoderadoDocumento:       string;
  apoderadoDireccion:       string;
  pacienteRelacionadoId:    number;
  medicoId:                 string;
  estado:                   number;
  firma:                    string;
}


