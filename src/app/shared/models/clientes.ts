export class clientes {
    clinicaId = 'D30C2D1E-E883-4B2D-818A-6813E15046E6';
    usuarioId = "";
    tipodocumento = "";
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
   tipodocumento: number;
   documento: string;
   nombre: string;
   direccion: string;
   contacto: string;
    telefono: string;
    email: string;
    estado: boolean;
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