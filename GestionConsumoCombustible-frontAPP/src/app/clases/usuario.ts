import { TipoUsuario } from "./tipo-usuario";

export class Usuario {
    usuarioId?: number;
    usuarioEmail?: string;
    usuarioNombre?: string;
    usuarioApellido1?: string;
    usuarioApellido2?: string;
    usuarioPassword?: string;
    usuarioTipo!: TipoUsuario;
}