import { Rol } from "src/app/model/rol";
import { UsuarioService } from "../services/usuario.service";
import { UsuariosComponent } from "../usuarios/usuarios.component";

export class Usuario {
    id!: number;
    username!: string;
    email!: string;
    nombre!: string;
    apellido1!: string;
    apellido2!: string;
    password!: string;
    roles!: string;
    vehiculos!: [];
    conductores!: [];
}