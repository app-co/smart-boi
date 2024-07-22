import { IUser } from "@/hooks/fetchs/interfaces";
import { schemaLogin, schemaRegisterBuyer, schemaRegisterUser } from "@/schemas";
import { z } from "zod";

export interface LoginFormValues {
  email: string;
  senha: string;
  permission?: boolean;
}

export interface User {
  usuarioId: string;
  nome: string
  email: string
  enumNivel: string
  fotoUrl: string
  tipoAcesso: {
    descricao: string;
    codTipoAcesso: number;
  }[]
  fazendas: {
    fazendaId: string;
    descricao: string;
  }[]
}

export interface RegisterFormValues { }


export interface InfoInterface {
  type: string;
  text1: string;
  text2: string;
}


export interface AuthContextData {
  signed: boolean;
  route: number;
  setRoute: (value: number) => void;
  user: Omit<IUser, "accessToken" | "errors" | "isValid"> | null;
  updateUser: (user: Omit<IUser, "accessToken" | "errors" | "isValid">) => void
  setUser: (value: Omit<IUser, "accessToken" | "errors" | "isValid"> | null) => void;
  signIn: (input: LoginFormValues) => void
  loading: boolean;
  signOut(): void;
}

export interface DeleteCustomerValues {
  usuarioId: string;
}

export interface DeleteAccountModalProps {
  open: boolean;
  onCancel: () => void;
}

export interface ForgotPasswordModalProps {
  open: boolean;
  corPrimaria: string;
  onCancel: () => void;
}

export type TRegisterBuyerUser = z.infer<typeof schemaRegisterBuyer>
export type TLogin = z.infer<typeof schemaLogin>
export type TRegisterUser = z.infer<typeof schemaRegisterUser>