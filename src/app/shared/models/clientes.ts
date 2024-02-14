export class Clientes {
    clinicaId = '3fa85f64-5717-4562-b3fc-2c963f66afa6';
    usuarioId = "";
    tipoDocumentoIdentidadId = 0;
    numeroDocumento = "";
    nombre = "";
    direccion = "";
    contacto = "";
    telefono = "";
    email = "";
    estado = "";
}
export interface IClientes {
    clienteId: string;
    tipoDocumentoIdentidadId: number;
    numeroDocumento: string;
    nombre: string;
    direccion: string;
    contacto: string;
    telefono: string;
    email: string;
    estado: string;
}
export interface DataClientes {
    totalData: number;
    data: IClientes[];
}

export class ClienteResponse {
    nombre = "";
    numeroDocumento = "";
    direccion = "";
    telefono = "";
    contacto = "";
    email = "";
}