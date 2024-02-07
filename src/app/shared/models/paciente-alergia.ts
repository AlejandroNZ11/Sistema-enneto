export class pacienteAlergia{
  clinicaId= 'D30C2D1E-E883-4B2D-818A-6813E15046E6';
  usuarioId='';
  pacienteId='';
  alergiaId='';
  observacion='';
  estado=1;

}

export class updatePacienteAlergia{
  clinicaId= "D30C2D1E-E883-4B2D-818A-6813E15046E6";
  usuarioId= "" ;
  pacienteAlergiaId?= "";
  alergiaId?= "";
  observacion?= "";
  estado= 1
}


export interface DataPacienteAlergia{
  data: IPacienteAlergia[];
  totalData: number
}

export interface IPacienteAlergia {
  pacienteAlergiaId: string,
  pacienteId: string,
  alergiaId: string,
  observacion: string,
  estado: string
}
