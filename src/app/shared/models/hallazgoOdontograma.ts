
export class hallazgoRequest{
  clinicaid='D30C2D1E-E883-4B2D-818A-6813E15046E6';
  pacienteId ='';
  tipo ='';
  hallazgos:string[]=[];
  categoria='';
  estado=1;
  marcas='';
  numeroDiente=0;
  dienteFinal=0;
  sigla='';
  especificacion='';
  idUsuario='b9ee1329-9f8f-4ce5-a6a6-c3d849b1af39';
}


export interface HallazgoData{
  data:IHallazgo[];
  totalData:number;
}

export interface IHallazgo {

  hallazgoId:string;
  nombre:string;
  siglas:string;
  tipo:string;
  siglasHallazgo:siglasHallazgo[];
}

export interface siglasHallazgo{
  nombreHallazgo:string;
  sigla:string;
  nombre:string;
}


export interface THallazgo{
  id:number;
  nombre:string;
  tipo:string;
  siglas?:string[];
}
