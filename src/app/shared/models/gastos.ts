export class Gastos {
    clinicaId = 'D30C2D1E-E883-4B2D-818A-6813E15046E6';
    usuarioId = "";
    fecha!:Date;
    descripcion = "";
    conceptoGastoId= "";
    bancoId= "";
    cuentaPagarId= "";
    
    monto= "";
    operacion= "";
    sedeId= "";
    responsable= "";
    observacion= "";

}

export interface Igastos {
    gastoId: string;
    fecha: Date;
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

export class GastosResponse {
    descripcion = "";
    tipoGastos = ""; 
    fecha = "";
    observacion = "";
    monto = "";
    
}

