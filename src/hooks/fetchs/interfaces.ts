export interface IEventos {
  result: {
    id: string;
    descricao: string;
  }[];
  errors: any[];
  isValid: boolean;
}

export interface IUser {
  accessToken: string;
  nome: string;
  email: string;
  telefone: string
  cpf: string
  usuarioId: string;
  enumNivel: string;
  fotoUrl: string;
  tipoAcesso: TipoAcesso[];
  fazendas: Fazenda[];
  errors: any[];
  isValid: boolean;
  urlVideoHome: string;
}

interface Fazenda {
  enderecoId: string;
  nomeFazenda: string;
  inscricaoEstadual: string;
  cep: string;
  uf: string;
  cidade: string;
  distanciaMunicipio: string;
  linkLocalizacao: string;
  roteiroCaminho: string;
  tipoFazenda: number;
}

interface TipoAcesso {
  descricao: string;
  codTipoAcesso: number;
}

export interface IEnderecoFazenda {
  id: string;
  errors: any[];
  isValid: boolean;
}

export interface IParceiros {
  descricao: string;
  urlImagem: string;
}

export interface ILotes {
  loteId: string;
  raca: string;
  descricaoLote: string;
  urlImagens: {
    id: string
    urlImagem: string
  }[];
  qtdOfertas: null;
  quantidade: number;
  sexo: number;
  tipoEspecie: number;
  tipoCategoriaLote: number;
  tipoOferta: number;
  tempoDeVenda: string;
  tempoDeVida: string;
  cidade: string;
  uf: string;
  distanciaMunicipio: string;
  dataCriacao: string;
  statusLote: number
}


export interface ILotesById {
  loteId: string;
  raca: string;
  nomeEvento: string;
  localizacao: string;
  idadeMedia: string;
  descricaoLote: string;
  urlImagens: any[];
  quantidade: string;
  qtdOferta: null;
  pesoMedio: number;
  valorPorQuilo: number;
  valorPorAnimal: number;
  urlVideo: null;
  sexo: string;
  tipoEspecie: string;
  tipoCategoriaLote: string;
  usuarioAppId: string;
  quantidadeAnimal: number;
  outrasInformacoes: OutrasInformacoes;
  tipoOferta: number

}

interface OutrasInformacoes {
  periodoLote: string;
  visualizacoes: number;
  lances: number;
}

export interface IEnderecos {
  idEndereco: string
  nomeFazenda: string
}

export interface IAccessUser {
  id: string;
  descricao: string;
  codTipoAcesso: number;

}

export interface ILance {
  idLance: string;
  dataLance: string;
  descLote: string;
  endereco: string;
  idade: string;
  sexo: string;
  qtdPeso: string;
  statusLote: null;
}

export interface ITransportadora {
  id: string;
  nomeTransportadora: string;
}
export interface ILanceById {
  valorLance: number;
  qtdCabeca: number;
  arrematar: boolean;
  nomeLote: string;
  cidadeUf: string;
  nomeUsuarioLance: string;
}

export interface ILanceEnvidado {
  idLance: string;
  dataLance: string;
  descLote: string;
  endereco: string;
  idade: string;
  sexo: string;
  qtdPeso: string;
  statusLote: null;
  urlImagem: string;
}

export interface IImposto {
  valor: number;
  porcentagem: number;
  estado: string;
  usuarioCriadorId: string;
}

export interface IComissao {
  porcentagem: number;
  tipoComissao: number;
  usuarioCriadorId: string;
}

export interface IUsers {
  usuarioAppId: string;
  nomeUsuario: string;
}

export interface ICotacao {
  cotacaoBoiId: string;
  valor: number;
  porcentagem: number;
  cidade: string;
  estado: string;
  dataCotacao: string;
  tipoGado: number;
}

export interface ILanceRecebido {
  valorLance: number
  qtdCabeca: number
  arrematar: boolean
  nomeLote: string
  cidadeUf: string
  nomeUsuarioLance: string
}