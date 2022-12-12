import { Empresa } from "./empresa";
import { Rol } from "./rol";
import { Vehiculo } from "./vehiculo";

export class Usuario {
    usuarioId!: number;
    usuarioEmail!: string;
    usuarioNombre!: string;
    usuarioApellido1!: string;
    usuarioApellido2!: string;
    usuarioEnable!: boolean;
    password!: string;
    roles!: Array<Rol>;
    empresa!: Empresa;
    vehiculos!: Vehiculo[];
    conductores!: Usuario[];
}