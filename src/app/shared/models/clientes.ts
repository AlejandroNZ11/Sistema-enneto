export class Clientes {
    clinicaId = '3fa85f64-5717-4562-b3fc-2c963f66afa6';
    usuarioId = "";
    tipoDocumento = 0;
    documento = "";
    nombre = "";
    direccion = "";
    contacto = "";
    telefono = "";
    email = "";
    estado = "";
}
export interface IClientes {
    clienteId: string;
    tipoDocumento: number;
    documento: string;
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
    documento = "";
    direccion = "";
    telefono = "";
    contacto = "";
    email = "";
}