export class Apoderado {
    clinicaId = '3fa85f64-5717-4562-b3fc-2c963f66afa6';
    usuarioId = '';
    tipoDocumento = '';
    documento = '';
    nombre = '';
    direccion = '';
    telefono = '';
    estado = '';
}

export interface DataApoderado {
    totalData: number;
    data: IApoderado[];
}

export interface IApoderado {
    apoderadoId: string;
    tipoDocumento: number;
    nombre: string;
    documento: string;
    direccion: string;
    telefono: string;
    estado: boolean;
}

export class apoderadoResponse {
    nombre = "";
    documento = "";
    direccion = "";
    telefono = '';
}
