export class consentimiento {
    clinicaId = 'D30C2D1E-E883-4B2D-818A-6813E15046E6';
    usuarioId = "";
    descripcion = "";
}

export interface DataConsentimiento {
    totalData: number;
    data: Iconsentimiento[];
}

export interface Iconsentimiento {
    consentimientoId : string;
    nombre: string;
    observacion: string;
}

export class consentimientoResponse {
    nombre = "";
    observacion = "";
}