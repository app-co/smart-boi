import { z } from "zod";

export const schenaRegisterUser = z.object({
  email: z.string({ message: '* obrigatório' }).email(),
  senha: z.string({ message: '* obrigatório' }).min(6, 'no mínimo 6 dígidos'),
  nomeCompleto: z.string({ message: '* obrigatório' }),
  telefone: z.string({ message: '* obrigatório' }),
  cpf: z.string({ message: '* obrigatório' }),
  deviceId: z.string({ message: '* obrigatório' }),
})

export const schenaLogin = z.object({
  email: z.string({ message: '* obrigatório' }).email(),
  senha: z.string({ message: '* obrigatório' }).min(6, 'no mínimo 6 dígidos'),
})

export const schemaGetEventoByDescription = z.object({
  descricao: z.string({ message: '* obrigatório' }),
})

export const schemaEndereco = z.object({
  nomeFazenda: z.string({ message: '* obrigatório' }),
  inscricaoEstadual: z.string({ message: '* obrigatório' }),
  cep: z.string({ message: '* obrigatório' }),
  uf: z.string({ message: '*' }),
  cidade: z.string({ message: '* obrigatório' }),
  destanciaMunicipio: z.string({ message: '* obrigatório' }),
  linkLocalizacao: z.string({ message: '* obrigatório' }),
  roteiroCaminho: z.string({ message: '* obrigatório' }),
  tipoFazenda: z.number({ message: '* obrigatório' }),
  UsuarioId: z.string({ message: '* obrigatório' })
})

export const schemaPargination = z.object({
  pageSize: z.number().optional(),
  pageNumber: z.number().optional(),
})

export const schemaLotes = z.object({
  statusLote: z.number(),
  pageSize: z.number().optional(),
  pageNumber: z.number().optional(),
  usuarioId: z.string().optional(),
})

export const schemaLotesByID = z.object({
  loteId: z.string()
})

const file = z.object({
  fileName: z.string().optional(),
  uri: z.string(),
  type: z.string(),
})

export const schemaRegisterLote = z.object({
  Imagens: z.array(z.object({ imagem: z.string() })),
  PesoMedio: z.string().optional(),
  ValorPorAnimal: z.string().optional(),
  Quantidade: z.string(),
  TipoOferta: z.string(),
  TipoEspecie: z.string(),
  Sexo: z.string(),
  Raca: z.string(),
  UsuarioAppId: z.string(),
  EventoId: z.string(),
  TipoCategoriaLote: z.string(),
  EnderecoFazendaId: z.string(),
  ValorPorQuilo: z.string(),
  Video: z.string().optional().nullable(),
  DescricaoLote: z.string(),
  TempoDeVida: z.string(),
  TempoDeVenda: z.string(),
})
// export const schemaRegisterLote = z.object({
//   Imagens: z.array(z.object({ imagem: z.string() })),
//   PesoMedio: z.number(),
//   Quantidade: z.number(),
//   TipoOferta: z.number(),
//   TipoEspecie: z.number(),
//   Sexo: z.number(),
//   ValorPorAnimal: z.number(),
//   Raca: z.string(),
//   UsuarioAppId: z.string(),
//   EventoId: z.string(),
//   TipoCategoriaLote: z.number(),
//   EnderecoFazendaId: z.array(z.string()),
//   ValorPorQuilo: z.number(),
//   Video: z.string(),
//   DescricaoLote: z.string(),
//   TempoDeVida: z.number(),
//   TempoDeVenda: z.number(),
// })

export const schemaBuyer = z.object({
  // foto: z.string(),
  // telefone: z.string(),
  listEnderecos: z.array(z.string()),
  usuarioAppId: z.string(),
  // deviceId: z.string(),
  // senha: z.string().optional(),
  // cpf: z.string(),
  // email: z.string(),
  // nomeCompleto: z.string(),
})

export const schemaRegisterSaler = z.object({
  // foto: z.string(),
  // telefone: z.string(),
  listEnderecos: z.array(z.string()),
  usuarioAppId: z.string(),
  // deviceId: z.string(),
  // senha: z.string().optional(),
  // cpf: z.string(),
  // email: z.string(),
  // nomeCompleto: z.string(),
})



export const schemaRegisterLance = z.object({
  loteId: z.string(),
  valorImposto: z.number(),
  valorFrete: z.number(),
  comissaoPaga: z.number(),
  valorLance: z.number().nullable(),
  precoAnimal: z.number(),
  valorFinalAnimal: z.number(),
  valorFinalKg: z.number(),
  precoLote: z.number(),
  qtdCabeca: z.number(),
  arrematar: z.boolean(),
  tipoImposto: z.number(),
  tipoEntrega: z.number(),
  enderecoId: z.string().optional(),
  usuarioCompradorId: z.string(),
  usuarioRepresentanteId: z.string(),
})

export const schemaGetLanceEnviado = z.object({
  UsuarioId: z.string(),
  DataLance: z.date(),
  cidade: z.string(),
  Uf: z.string(),
  StatusLote: z.number(),
  PageSize: z.number(),
  PageNumber: z.number(),
})

export const schemaGetCotacaoFiltered = z.object({
  Estado: z.string(),
  TipoGado: z.string(),
}).merge(schemaPargination)

export const schemavalidateLance = z.object({
  loteId: z.string(),
  usuarioVendedorId: z.string(),
  statusLote: z.number(),
})

export const schemaUpdatUser = z.object({
  usuarioAppId: z.string(),
  email: z.string(),
  senah: z.string().optional(),
  nomeCompleto: z.string(),
  foto: z.string().optional(),
})

