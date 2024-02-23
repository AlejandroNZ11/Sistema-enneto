export class Planes {
    clinicaId = "3fa85f64-5717-4562-b3fc-2c963f66afa6";
    usuarioId = "";
    planId = "3fa85f64-5717-4562-b3fc-2c963f66afa6";
    fechaInicio!: string;
    fechaFinContrato!: string;
    nombrePlan = "";
    maxPlan = "";
    usuMax = "";
    costoPlan = "";
    estado!:number;
    
}
export interface IPlanes {
    planId: string;
    nombrePlan: string;
    fechaInicio: Date;
    fechaFinContrato: Date;
    maxPlan: number;
    usuMax: number;
    costoPlan: number;
    estado: string;
}
export interface DataPlanes {
    data: IPlanes[];
    totalData: number;
}

export class PlanesResponse {
    nombrePlan = "";
    fechaInicio = "";
    fechaFinContrato = "";
    costoPlan = "";  
    maxPlan = "";
    usuMax = "";
}

