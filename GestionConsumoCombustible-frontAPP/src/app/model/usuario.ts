import { Empresa } from "./empresa";
import { Rol } from "./rol";

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
    vehiculos!: [];
    conductores!: [];
}