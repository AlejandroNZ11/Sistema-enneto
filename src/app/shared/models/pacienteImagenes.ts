



export class pacienteImagen{
  pacienteId='';
  fecha='';
  nombre='';
  notas='';
}



export interface PacienteImagenData{
  data: IPacienteImagen[];
  totalData: number
}

export interface IPacienteImagen {
  fecha:string;
  nombre:string;
  notas:string;
}
