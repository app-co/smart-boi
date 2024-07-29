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
  usuarioId: z.string({ message: '* campo obrigatório' }).optional(),
})

export const schemaLotesByID = z.object({
  loteId: z.string({ message: '* campo obrigatório' })
})

const file = z.object({
  fileName: z.string({ message: '* campo obrigatório' }).optional(),
  uri: z.string({ message: '* campo obrigatório' }),
  type: z.string({ message: '* campo obrigatório' }),
})

export const schemaRegisterLote = z.object({
  Imagens: z.array(z.object({ imagem: z.string({ message: '* campo obrigatório' }) })),
  PesoMedio: z.string({ message: '* campo obrigatório' }).optional(),
  ValorPorAnimal: z.string({ message: '* campo obrigatório' }).optional(),
  Quantidade: z.string({ message: '* campo obrigatório' }),
  TipoOferta: z.string({ message: '* campo obrigatório' }),
  TipoEspecie: z.string({ message: '* campo obrigatório' }),
  Sexo: z.string({ message: '* campo obrigatório' }),
  Raca: z.string({ message: '* campo obrigatório' }),
  UsuarioAppId: z.string({ message: '* campo obrigatório' }),
  EventoId: z.string({ message: '* campo obrigatório' }),
  TipoCategoriaLote: z.string({ message: '* campo obrigatório' }),
  EnderecoFazendaId: z.string({ message: '* campo obrigatório' }),
  ValorPorQuilo: z.string({ message: '* campo obrigatório' }),
  Video: z.string({ message: '* campo obrigatório' }).optional().nullable(),
  DescricaoLote: z.string({ message: '* campo obrigatório' }),
  TempoDeVida: z.string({ message: '* campo obrigatório' }),
  TempoDeVenda: z.string({ message: '* campo obrigatório' }),
})
// export const schemaRegisterLote = z.object({
//   Imagens: z.array(z.object({ imagem: z.string({message:'* campo obrigatório'}) })),
//   PesoMedio: z.number(),
//   Quantidade: z.number(),
//   TipoOferta: z.number(),
//   TipoEspecie: z.number(),
//   Sexo: z.number(),
//   ValorPorAnimal: z.number(),
//   Raca: z.string({message:'* campo obrigatório'}),
//   UsuarioAppId: z.string({message:'* campo obrigatório'}),
//   EventoId: z.string({message:'* campo obrigatório'}),
//   TipoCategoriaLote: z.number(),
//   EnderecoFazendaId: z.array(z.string({message:'* campo obrigatório'})),
//   ValorPorQuilo: z.number(),
//   Video: z.string({message:'* campo obrigatório'}),
//   DescricaoLote: z.string({message:'* campo obrigatório'}),
//   TempoDeVida: z.number(),
//   TempoDeVenda: z.number(),
// })

export const schemaBuyer = z.object({
  // foto: z.string({message:'* campo obrigatório'}),
  // telefone: z.string({message:'* campo obrigatório'}),
  listEnderecos: z.array(z.string({ message: '* campo obrigatório' })),
  usuarioAppId: z.string({ message: '* campo obrigatório' }),
  // deviceId: z.string({message:'* campo obrigatório'}),
  // senha: z.string({message:'* campo obrigatório'}).optional(),
  // cpf: z.string({message:'* campo obrigatório'}),
  // email: z.string({message:'* campo obrigatório'}),
  // nomeCompleto: z.string({message:'* campo obrigatório'}),
})

export const schemaRegisterSaler = z.object({
  // foto: z.string({message:'* campo obrigatório'}),
  // telefone: z.string({message:'* campo obrigatório'}),
  listEnderecos: z.array(z.string({ message: '* campo obrigatório' })),
  usuarioAppId: z.string({ message: '* campo obrigatório' }),
  // deviceId: z.string({message:'* campo obrigatório'}),
  // senha: z.string({message:'* campo obrigatório'}).optional(),
  // cpf: z.string({message:'* campo obrigatório'}),
  // email: z.string({message:'* campo obrigatório'}),
  // nomeCompleto: z.string({message:'* campo obrigatório'}),
})



export const schemaRegisterLance = z.object({
  loteId: z.string({ message: '* campo obrigatório' }),
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
  enderecoId: z.string({ message: '* campo obrigatório' }).optional(),
  usuarioCompradorId: z.string({ message: '* campo obrigatório' }),
  usuarioRepresentanteId: z.string({ message: '* campo obrigatório' }),
})

export const schemaGetLanceEnviado = z.object({
  UsuarioId: z.string({ message: '* campo obrigatório' }),
  DataLance: z.date(),
  cidade: z.string({ message: '* campo obrigatório' }),
  Uf: z.string({ message: '* campo obrigatório' }),
  StatusLote: z.number(),
  PageSize: z.number(),
  PageNumber: z.number(),
})

export const schemaGetCotacaoFiltered = z.object({
  Estado: z.string({ message: '* campo obrigatório' }),
  TipoGado: z.string({ message: '* campo obrigatório' }),
}).merge(schemaPargination)

export const schemavalidateLance = z.object({
  loteId: z.string({ message: '* campo obrigatório' }),
  usuarioVendedorId: z.string({ message: '* campo obrigatório' }),
  statusLote: z.number(),
})

export const schemaUpdatUser = z.object({
  usuarioAppId: z.string({ message: '* campo obrigatório' }),
  email: z.string({ message: '* campo obrigatório' }),
  senah: z.string({ message: '* campo obrigatório' }).optional(),
  nomeCompleto: z.string({ message: '* campo obrigatório' }),
  foto: z.string({ message: '* campo obrigatório' }).optional(),
})

