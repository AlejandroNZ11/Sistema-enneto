
export class SucursalEmpresaResponse {
    idSucursal: number;
    codigo: string;
    nombre: string;
    direccion: string;
    esDomicilioFiscal: boolean | null;
    ubigeo: string;
    departamento: string;
    provincia: string;
    distrito: string;
    estado: number;
    ventaEmpresarial: boolean;
    habilitarVenta: boolean
}