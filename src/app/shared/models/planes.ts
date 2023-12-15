export class Planes {
    clinicaId = 'D30C2D1E-E883-4B2D-818A-6813E15046E6';
    usuarioId = "";
    planId = "3fa85f64-5717-4562-b3fc-2c963f66afa6";
    fechaInicio!: Date;
    fechaFinContrato!: Date;
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
    maxPlan: string;
    usuMax: string;
    costoPlan: string;
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

