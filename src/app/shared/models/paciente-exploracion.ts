export interface DataPacienteExploracion{
  data: IPacienteExploracion;
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
