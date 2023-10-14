import { DefaultsValues } from './defaults';

export interface UserLoggedConfiguration {
	nombreImpuesto: string;
	valorImpuesto: number;
	monedaBase: number;
	incluyeInventario: boolean;
	validezCotizacion: number;
	precioIncluyeImpuesto: boolean;
	precioUnico: boolean;
	eliminarFooterEmails: boolean;
	enviarCorreoCredencialesPropias: boolean;
	monedaBaseSimbolo: string;
	grupoCorporativoId: string | null;

	defaults: DefaultsValues;
	multiplesMonedas: boolean;
	cotizacionSinIgv: boolean;
}
