import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  email: z.string().min(1, "Campo obrigatório.").email("Email inválido."),
  password: z.string().min(1, "Campo obrigatório."),
});

export const loginSchema = zodResolver(schema);

export type LoginSchema = z.infer<typeof schema>;