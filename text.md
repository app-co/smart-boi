Criacao de Transportadora


Post = >/api/v1/Transportadora
curl -X 'POST' \
  'https://localhost:5001/api/v1/Transportadora' \
  -H 'accept: */*' \
  -H 'Content-Type: multipart/form-data' \
  -F 'EmailResponsavel=joao.silveira@boibravo.com.br' \
  -F 'CNPJ=78966422000103' \
  -F 'ValorFrete=425' \
  -F 'NomeResponsavel=João Silveira' \
  -F 'CpfResponsavel=89566556004' \
  -F 'Endereco=Rua das Pastagens, 123, Fazendinha, Cidade Verde, Estado do Sertão' \
  -F 'Telefone=5512345677' \
  -F 'UsuarioCriadorId=fc31830d-71ce-41e2-8b9c-d209fe23e457' \
  -F 'NomeEmpresa=Transp. Boi Queto Ltda.' \
  -F 'FotoCapa=@logo-text-01.png;type=image/png' \
  -F 'TelefoneResponsavel=559876-5433' \
  -F 'TipoFrete=1' \
  -F 'TipoVeiculo=1' \
  -F 'Email=contato@boibravo.com.br'
  
  
GetALL => /api/v1/Transportadora/obter-todos

{
  "result": [
    {
      "id": "ab5ccae0-8883-4572-9c56-eec6452202ef",
      "nomeTransportadora": "Transp. Boi Bravo Ltda."
    }
  ],
  "errors": [],
  "isValid": true
}



Criacao de Lance

Post => /api/v1/Lote/lance

Obejto de envio:
{
  "valorImposto": 2500,
  "valorFrete": 7500,
  "comissaoPaga": 0,
  "valorLance": 45000,
  "precoAnimal": 2250,
  "valorFinalAnimal": 2250,
  "valorFinalKg": 45000,
  "precoLote": 45000,
  "qtdCabeca": 20,
  "arrematar": false,
  "tipoImposto": 1,
  "tipoEntrega": 1,
  "transportadoraId": "ab5ccae0-8883-4572-9c56-eec6452202ef",
  "loteId": "d2f4a60d-4d62-4c0e-80d8-2a8e0fb9ad7e",
  "usuarioCompradorId": "10161454-b885-4708-b3bf-da74368ad7f2",
  "usuarioRepresentanteId": "c36a0a7b-2c61-4da3-a615-b782fc7dad75"
}


GetPaginado de Lances por Lote
=> /api/v1/Lote/lances-lote?LoteId=d2f4a60d-4d62-4c0e-80d8-2a8e0fb9ad7e&PageSize=15&PageNumber=0

Param LoteId

Retorno:
{
  "pagination": {
    "totalElements": 1,
    "pageSize": 1,
    "pageNumber": 0,
    "totalPages": 1
  },
  "result": [
    {
      "valorLance": 45000,
      "qtdCabeca": 20,
      "arrematar": false,
      "nomeLote": "Bois Angus",
      "cidadeUf": "Goiânia - GO",
      "nomeUsuarioLance": "******* Sheineider"
    }
  ],
  "errors": [],
  "isValid": true
}



Get Paginado de Envio de lances

=> /api/v1/Lote/lances-enviados?UsuarioId=10161454-b885-4708-b3bf-da74368ad7f2&DataLance=2024-06-07%2000%3A31%3A05.227%20-0300&Cidade=Goi%C3%A2nia&Uf=GO&StatusLote=5&PageSize=15&PageNumber=0

Param UsuarioId

Filtros:
DataLance,
Cidade,
Uf,
StatusLote


Retorno:
{
  "pagination": {
    "totalElements": 1,
    "pageSize": 1,
    "pageNumber": 0,
    "totalPages": 1
  },
  "result": [
    {
      "idLance": "29a1da9a-9210-44f5-8e18-dcc09835c755",
      "dataLance": "2024-06-07T00:31:05.227946-03:00",
      "descLote": "Bois Angus",
      "endereco": "50 km Goiânia - GO",
      "idade": "36 a 48 meses",
      "sexo": "Macho",
      "qtdPeso": "300",
      "statusLote": null
    }
  ],
  "errors": [],
  "isValid": true
}

GetPaginado de Lances Recebidos

=> /api/v1/Lote/lances-recebidos?UsuarioId=c9b9f98a-a0c1-47cc-9a85-202643ac34f9&PageSize=15&PageNumber=0

Param UsuarioId

retorno:
