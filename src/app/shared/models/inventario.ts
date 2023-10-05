export class inventario{
    CodigoBarra = '';
    NombreAlmacen = '';
    NombreProducto = '';
    TipoInventarioId = '';
    PrecioEntrada = '';
    PrecioSalida = '';
    Unidad = '';
    Stock = '';
    FechaRegistro!: Date;
    Estado = '';
    ClinicaId = 'D30C2D1E-E883-4B2D-818A-6813E15046E6';
    UsuarioId = '';
}
export interface DataInventario {
    totalData: number;
    data: IInventario[];
}
export interface IInventario {
    inventarioId: string;
    nombre: string;
    descripcion: string;
    estado: string;
}