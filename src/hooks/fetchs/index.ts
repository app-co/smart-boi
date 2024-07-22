import { schemaRegisterUser } from "@/schemas";
import api from "@/services/api";
import { IComissao, ICotacao, IEnderecos, IEventos, IImposto, ILance, ILanceById, ILanceEnvidado, ILanceRecebido, ILotes, ILotesById, IParceiros, ITransportadora, IUser, IUsers } from "./interfaces";
// import { TBuyer, TEndereco, TGetCotacaoFiltered, TGetEventoByDescription, TGetLanceEnviado, TLogin, TLotes, TPagination, TRegisterLance, TRegisterLote, TRegisterUser, TSaler, TValidateLance, schemaBuyer, schemaEndereco, schemaGetEventoByDescription, schemaLotesByID, schemaRegisterLance, schemaRegisterSaler, schemavalidateLance } from "./schemas";
import * as s from './schemas';
import * as t from './types';
export class UseFatch {

  async signIn(objeto: t.TLogin) {
    s.schenaLogin.parse(objeto)
    const { data } = await api.post('/Usuario/login', objeto);

    return data as IUser;
  }

  async signUp(objeto: t.TRegisterUser) {
    schemaRegisterUser.parse(objeto)
    const { data } = await api.post('/Usuario/App', objeto);

    return data as t.TRegisterUser;
  }

  async getEventosByDescricao(objeto: t.TGetEventoByDescription) {
    s.schemaGetEventoByDescription.parse(objeto)
    const { data } = await api.post('/Evento', objeto);

    return data;
  }

  async getAllEventos() {
    const { data } = await api.get('/Evento/obter-todos');

    return data as IEventos;
  }

  async getParceiros(params: t.TPagination) {
    const { data } = await api.get('/Parceiro', { params });
    return data.result as IParceiros[];
  }

  public async getLotes(params: t.TLotes) {
    const { data } = await api.get('/Lote', { params });

    return data.result as ILotes[];
  }

  async getLotesById(loteId: string) {
    s.schemaLotesByID.parse({ loteId })
    const { data } = await api.get('/Lote/byid', {
      params: {
        loteId,
      },
    });

    return data.result as ILotesById;
  }

  async registerEndereco(objeto: t.TEndereco) {
    s.schemaEndereco.parse(objeto)
    const { data } = await api.post('/Endereco', objeto);

    return data as t.TEndereco;
  }

  async getFazenda(userId: string) {
    const { data } = await api.get(`/Endereco/obter-todos?UsuarioId=${userId}`);

    return data.result as IEnderecos[];
  }

  //424.278.710-36

  async registerBuyer(objeto: t.TBuyer) {
    s.schemaBuyer.parse(objeto)

    // const formData = new FormData();
    // formData.append('foto', objeto.foto);
    // formData.append('telefone', objeto.telefone);
    // formData.append('listEnderecos', objeto.listEnderecos);
    // formData.append('usuarioAppId', objeto.usuarioAppId);
    // formData.append('deviceId', objeto.deviceId);
    // formData.append('senha', objeto.senha);
    // formData.append('cpf', objeto.cpf);
    // formData.append('email', objeto.email);
    // formData.append('nomeCompleto', objeto.nomeCompleto);

    // const response = await fetch('https://prd-smartboi-api.azurewebsites.net/api/v1/Usuario/usuario-comprador', {
    //   method: 'POST',
    //   body: formData,
    // });
    // if (!response.ok) {
    //   throw new Error(`HTTP error! status: ${response.status}`);
    // }

    // const result = await response.json();
    // return result

    const { data } = await api.post('Usuario/comprador', objeto)
    return data
  }
  async registerSaler(objeto: t.TSaler) {
    s.schemaRegisterSaler.parse(objeto)

    // const formData = new FormData();
    // formData.append('foto', objeto.foto);
    // formData.append('telefone', objeto.telefone);
    // formData.append('listEnderecos', objeto.listEnderecos);
    // formData.append('usuarioAppId', objeto.usuarioAppId);
    // formData.append('deviceId', objeto.deviceId);
    // formData.append('senha', objeto.senha);
    // formData.append('cpf', objeto.cpf);
    // formData.append('email', objeto.email);
    // formData.append('nomeCompleto', objeto.nomeCompleto);

    // const response = await fetch('https://prd-smartboi-api.azurewebsites.net/api/v1/Usuario/usuario-vendedor', {
    //   method: 'POST',
    //   body: formData,
    // });

    // if (!response.ok) {
    //   throw new Error(`HTTP error! status: ${response.status}`);
    // }

    // const result = await response.json();
    // return result

    const { data } = await api.post('Usuario/vendedor', objeto)
    return data
  }

  async registerLote(objeto: t.TRegisterLote) {
    // s.schemaRegisterLote.parse(objeto)
    const formData = new FormData();

    // formData.append('Imagens', objeto.Imagens);
    // formData.append('PesoMedio', objeto.PesoMedio);
    // formData.append('Quantidade', objeto.Quantidade);
    // formData.append('TipoOferta', objeto.TipoOferta);
    // formData.append('TipoEspecie', objeto.TipoEspecie);
    // formData.append('Sexo', objeto.Sexo);
    // formData.append('ValorPorAnimal', objeto.ValorPorAnimal);
    // formData.append('Raca', objeto.Raca);
    // formData.append('UsuarioAppId', objeto.UsuarioAppId);
    // formData.append('EventoId', objeto.EventoId);
    // formData.append('TipoCategoriaLote', objeto.TipoCategoriaLote);
    // formData.append('EnderecoFazendaId', objeto.EnderecoFazendaId);
    // formData.append('ValorPorQuilo', objeto.ValorPorQuilo);
    // // formData.append('Video', objeto.Video);
    // formData.append('DescricaoLote', objeto.DescricaoLote);
    // formData.append('TempoDeVida', objeto.TempoVida);
    // formData.append('TempoDeVenda', objeto.TempoVenda);

    // const storageToken = await AsyncStorage.getItem('smart-boi@token');

    const { data } = await api.post('/Lote', objeto)

    return data;
    // const response = await fetch('https://prd-smartboi-api.azurewebsites.net/api/v1/Lote', {
    //   method: 'POST',
    //   body: formData,
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //   }
    // });

    // const result = await response.json();
    // return result
  }

  async getLanceRecebido(usuarioId: string) {
    const { data } = await api.get('/Lote/lances-recebidos', {
      params: {
        UsuarioId: usuarioId
      }
    });

    return data.result as ILanceRecebido[];
  }
  async getLanceEnvio(params: t.TGetLanceEnviado) {
    const { data } = await api.get('Lote/lances-enviados', { params });

    return data.result as ILanceEnvidado[];
  }
  async getLanceById(params: { LoteId: string, PageSize?: number, PageNumber?: number }) {
    const { data } = await api.get('/Lote/lances-lotes', { params });

    return data.result as ILance[];
  }

  async registerLance(objeto: t.TRegisterLance) {
    s.schemaRegisterLance.parse(objeto)

    const { data } = await api.post('/Lote/lance', objeto);

    return data as ILanceById[];
  }

  async getTransportadora() {
    const { data } = await api.get('/Transportadora');

    return data.result as ITransportadora[];
  }

  async getImposto() {
    const { data } = await api.get('/Lote/Imposto');

    return data.result as IImposto;
  }

  async getComissao(params: { TipoComissao: number }) {
    const { data } = await api.get('/Lote/comissao-venda-compra', { params });

    return data.result as IComissao;
  }

  async getRepresentantes(Nome?: string) {
    const { data } = await api.get('/Usuario/obter-todos-usuarioapp', { params: Nome });

    return data.result as IUsers[];
  }

  async getFret({ LoteId, EnderecoId }: { LoteId: string, EnderecoId: string }) {
    const { data } = await api.get('/Lote/frete', {
      params: {
        LoteId,
        EnderecoId,
      }
    });

    return data.result as { frete: number };
  }

  async getCotacaoFiltered(params: t.TGetCotacaoFiltered) {
    const { data } = await api.get('/CotacaoBoi/Byid', { params });

    return data.result as ICotacao[];
  }

  async getCotacaoById({ CotacaoBoiId }: { CotacaoBoiId: string, }) {
    const { data } = await api.get('/CotacaoBoi', {
      params: {
        CotacaoBoiId,
      }
    });

    return data.result as ICotacao;
  }

  async getAllCotacao(params: t.TGetCotacaoFiltered) {
    const { data } = await api.get('/CotacaoBoi/obter-todos', { params });
    return data.result as ICotacao[];
  }

  async validateLance(objeto: t.TValidateLance) {
    s.schemavalidateLance.parse(objeto)
    const { data } = await api.put('/Lote/lance-validar', objeto);

    return data;
  }

  async updateUser(objeto: t.TUpdateUser) {
    s.schemaUpdatUser.parse(objeto)
    const { data } = await api.put('/Usuario/app', objeto);

    return data;
  }

}

