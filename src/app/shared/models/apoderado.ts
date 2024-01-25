export class Apoderado {
    clinicaId = '3fa85f64-5717-4562-b3fc-2c963f66afa6';
    usuarioId = '';
    tipoDocumento = 0;
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
    documento: string;
    nombre: string;
    direccion: string;
    telefono: string;
    estado: string;
}

export class apoderadoResponse {
    nombre = "";
    documento = "";
    direccion = "";
    telefono = '';
}
