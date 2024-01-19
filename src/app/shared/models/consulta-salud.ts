export interface DataConsultaSalud {
  data:      IConsultaSalud;
}

export interface IConsultaSalud {
  pacienteConsultaId:   string;
  pacienteId:           string;
  ortodoncia:           string;
  ortodonciaTexto:      string;
  medicamento:          string;
  medicamentoTexto:     string;
  alergico:             string;
  alergicoTexto:        string;
  hospitalizacion:      string;
  hospitalizacionTexto: string;
  transfusiones:        string;
  transfusionesTexto:   string;
  padecimientos:        string;
  cepillado:            string;
  cepilladoTexto:       string;
  presionArterial:      string;
  presionArterialTexto: string;
}
