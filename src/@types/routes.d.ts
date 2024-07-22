
type TCadastro = {
  type: 'search' | 'extra_cash' | 'businnes';
  session?: boolean;
};

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      home: undefined;
      login: undefined;
      detalhes: { loteId: string, status: 'details' | 'otherInfo' };
      'registerSaler': undefined;
      'registerBuyer': undefined;
      lotes: { status: 'opens' | 'closeds', user: 'comprador' | 'vendedor' | 'comum' };
      ofertar: undefined;
      arrematar: { lote: ILotesById, typeLance: 'arrematar' | 'oferta' };
      cadastroLote: undefined;
      cadastroPropriedade: undefined;
      myLotes: undefined;
      lances: undefined;
      historico: { uf: string, tipoGado: number };
      lotesOpen: undefined;
      Lance: undefined;
      lancesRecebidos: { loteId: string }
      home: undefined
      Home: undefined
      profile: undefined
    }
  }
}
