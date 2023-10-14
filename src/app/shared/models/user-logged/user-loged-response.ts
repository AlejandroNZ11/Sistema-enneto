import { EmpresaResponse } from '../empresa/empresa-response';
import { SucursalResponse } from '../sucursal/sucursal-response';
import { Flags } from './flags';
import { UserLoggedConfiguration } from './user-logged-configuration';

export class UserLogedResponse {
	empresas!: EmpresaResponse[];
	cambioDelDia!: boolean;
	tipoCambio!: CambioDelDia;
	configuration!: UserLoggedConfiguration;
	sucursales!: SucursalResponse[];
	currents!: BranchWareHouse;
	opciones!: Flags;
  usuario!: UsuarioData;
  grupoCorporativoId!: string | null;
}

export class CambioDelDia {
	compra!: number;
	venta!: number;
}

export class BranchWareHouse {
	currentWareHouse!: number;
	currentWareHouseName!: string;
	currentBranchName!: string;
	currentBranch!: number;
}

export interface UsuarioData {
	nombres: string;
	cargo: string;
	personalId: number;
  ventaCiegas: boolean;
  esVendedor: boolean;
}
