export class Gastos {
    clinicaId = 'D30C2D1E-E883-4B2D-818A-6813E15046E6';
    usuarioId = "";
    fecha= "";
    descripcion = "";
    conceptoGastoId= "";
    bancoId= "";
    cuentaPagarId= "";
    estado="";
    monto= "";
    operacion= "";
    sedeId= "";
    responsable= "";
    observacion= "";

}

export interface Igastos {
    gastoId: string;
    fecha:  string;
    descripcion: string;
    conceptoGastoId: string;
    bancoId: string;
    cuentaPagarId: string;
    monto: number;
    operacion: string;
    sedeId: string;
    responsable: string;
    observacion: string;
    estado: string;
}

export interface DataGastos {
    totalData: number;
    data: Igastos[];
}


export interface DataControlGasto {
    totalData: number;
    data: IcontrolGasto[];
}

export interface IcontrolGasto {
    gastoId: string;
    fecha:  string;
    descripcion: string;
    tipoGasto: string;
    bancoId: string;
    cuentaPagarId: string;
    monto: number;
    operacion: string;
    sedeId: string;
    responsable: string;
    observacion: string;
    estado: number;
}





export class GastosResponse {
    descripcion = "";
    tipoGasto = ""
    fecha = "";
    observacion = "";
    operacion = "";
    responsable = "";
    monto = "";
}

