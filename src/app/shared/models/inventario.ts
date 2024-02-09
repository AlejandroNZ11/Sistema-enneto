export class inventario{
    ClinicaId = '3fa85f64-5717-4562-b3fc-2c963f66afa6';
    UsuarioId = '';
    CodigoBarra = '';
    NombreAlmacen = '';
    NombreProducto = '';
    PrecioEntrada!: number;
    PrecioSalida!: number;
    Unidad = '';
    Stock!: number;
    FechaRegistro!: Date;
    tipoinventarioId?: string[];
    estado!: number;
    
}
export interface DataInventario {
    totalData: number;
    data: IInventario[];
}
export interface IInventario {
    inventarioId: string;
    CodigoBarra: string;
    NombreAlmacen: string;
    NombreProducto: string;
    tipoInventarioId: string;
    precioEntrada: number;
    precioSalida: number;
    unidad: string;
    stock: number;
    fechaRegistro: Date;
    estado: string;
}

export class inventarioResponse {
    codigoBarra="";
    nombreAlmacen="";
    nombreProducto="";
    tipoInventarioId="";
    precioEntrada="";
    precioSalida="";
    unidad="";
    stock="";
    fechaRegistro="";
}