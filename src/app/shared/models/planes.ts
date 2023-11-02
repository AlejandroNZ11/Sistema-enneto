export class PlanesResponse {
    clinicaId = 'D30C2D1E-E883-4B2D-818A-6813E15046E6';
    usuarioId = "";
    planId = "3fa85f64-5717-4562-b3fc-2c963f66afa6";
    fechaInicio!: Date;;
    fechaFinContrato!: Date;
    maxPlan !: number;
    usuMax !: number;
    costoPlan!: number;
    estado!: number;
    nombrePlan = "";
    
}
export interface PlanesRequest {
    planId: string;
    nombrePlan: string;
    fechaInicio: Date;
    fechaFinContrato: Date;
    maxPlan: number;
    usuMax: number;
    costoPlan: number;
    estado: number;
}
export interface DataPlanes {
    data: PlanesRequest[];
    totalData: number;
}

