export class Usuario {
    clinicaId = '3fa85f64-5717-4562-b3fc-2c963f66afa6'
    usuarioId = "";
    apellido = "";
    nombre = "";
    telefono = "";
    direccion = "";
    email = "";
    tipoDocumentoId = "";
    documento = "";
    foto = "";
    rolId = "";
    loginUsuario = "";
    passwordUsuario = "";
    fechaRegistro: Date | string = "";
}

export interface DataUsuario {
    totalData: number;
    data: IUsuario[];
}

export interface IUsuario {
    usuarioId: string;
    apellido: string;
    nombre: string;
    telefono: string;
    direccion: string;
    email: string;
    tipoDocumentoId: string;
    documento: string;
    foto: string;
    rolId: string;
    loginUsuario: string;
    passwordUsuario: string;
    fechaRegistro: string;
    estado: string;
}

export class usuarioResponse {
    apellido = "";
    nombre = "";
    telefono = "";
    direccion = "";
    email = "";
    tipoDocumentoId = "";
    documento = "";
    foto = "";
    rolId = "";
    loginUsuario = "";
    passwordUsuario = "";
    fechaRegistro = "";
}
