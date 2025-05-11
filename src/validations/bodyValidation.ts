import e from "express";
import { z } from "zod";

const usuarioSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio."),
  lastName: z.string().min(1, "El apellido es obligatorio."),
  userName: z.string().min(3, "El usuario debe tener al menos 3 caracteres."),
  email: z.string().email("El correo electrónico no es válido."),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres."),
  birthdate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Formato de fecha inválido (YYYY-MM-DD)."),
  preference: z.array(z.string().min(1, "Cada preferencia debe ser un string no vacío.")),
});

const usuarioSchemaLogin = z.object({
  email: z.string().email("El correo electrónico no es válido."),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres."),
});

export { usuarioSchema, usuarioSchemaLogin };
