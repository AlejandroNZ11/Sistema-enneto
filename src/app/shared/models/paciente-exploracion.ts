export class pacienteExploracion{
  clinicaId = 'D30C2D1E-E883-4B2D-818A-6813E15046E6';
  pacienteId=""
  presionArterial=""
  pulso=""
  temperatura=""
  frecuenciaCardiaca=""
  frecuenciaRespiratoria=""
  peso=""
  talla=""
  masa=""
  examenClinico=""
  complementoExamen=""
  odontogramaEstomatologico=""

}

export interface DataPacienteExploracion{
  data: IPacienteExploracion[];
  totalData:number;
}

export interface IPacienteExploracion {
  pacienteExploracionId:     string;
  pacienteId:                string;
  presionArterial:           string;
  pulso:                     string;
  temperatura:               string;
  frecuenciaCardiaca:        string;
  frecuenciaRespiratoria:    string;
  peso:                      string;
  talla:                     string;
  masa:                      string;
  examenClinico:             string;
  complementoExamen:         string;
  odontogramaEstomatologico: string;
}
