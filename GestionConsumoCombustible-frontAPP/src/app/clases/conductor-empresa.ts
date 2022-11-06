import { Usuario } from "./usuario";

export class ConductorEmpresa {
    conductorId?: number;
    usuarioId!: Usuario;
    conductorAlias?: string;
    conductorNombre?: string;
    conductorApellido1?: string;
    conductorApellido2?: string;
    conductorPassword?: string;
}