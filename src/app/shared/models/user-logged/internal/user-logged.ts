import { UserLogedResponse } from '../user-loged-response';
import { Empresa } from './empresa';
import { InternalSucursal } from './internal-sucursal';

export interface UserLogged extends Omit<UserLogedResponse, 'sucursales'> {
	empresas: Empresa[];
	sucursales: InternalSucursal[];
}
