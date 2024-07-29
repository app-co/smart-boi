import { Loading } from '@/components/Loading'
import { useAuth } from '@/contexts/auth'
import { UseFatch } from '@/hooks/fetchs'
import { useValidateLance } from '@/hooks/mutations'
import { color } from '@/styles/color'
import { _text } from '@/styles/sizes'
import { Feather } from '@expo/vector-icons'
import { useRoute } from '@react-navigation/native'
import { Box } from 'native-base'
import React from 'react'
import { Alert, FlatList } from 'react-native'
import { useQuery } from 'react-query'
import * as S from './styles'

const fetch = new UseFatch()

export function Lannces() {
  const { user } = useAuth()
  const { loteId } = useRoute().params as { loteId: string }
  const { mutateAsync } = useValidateLance()
  const { data, isLoading, error } = useQuery({
    queryKey: 'lancesRecebidos',
    queryFn: async () => fetch.getLanceRecebido(user!.usuarioId)
  })

  const findArrematou = data?.find(h => h.arrematar === true) ?? false

  async function handleAccept() {
    try {
      await mutateAsync({
        loteId: loteId,
        statusLote: 1,
        usuarioVendedorId: user!.usuarioId
      })
    } catch (error) {

    }
  }



  async function submit() {
    Alert.alert('Alerta', 'Você tem certeza que deseja recusar esse lote', [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      { text: 'OK', onPress: async () => await mutateAsync({ loteId: loteId, statusLote: 3, usuarioVendedorId: user!.usuarioId }) }
    ]);
  }

  if (isLoading) {
    <Loading />
  }




  return (
    <S.Container>
      <S.title style={{ alignSelf: 'center', fontFamily: 'bold', fontSize: _text }} >Lances do Lote</S.title>


      <S.content>

        <Box px={4} >
          <S.title>Nome do Lote</S.title>

          <FlatList
            data={data}
            keyExtractor={h => h.idLance}
            contentContainerStyle={{ gap: 10 }}
            renderItem={({ item: h }) => (
              <S.box>
                <Box style={{ gap: 5 }} >
                  <S.title>{h.nomeUsuarioLance}</S.title>
                  <S.text>{h.cidadeUf}</S.text>
                </Box>

                <Box style={{ gap: 5 }} alignItems={'flex-end'} >
                  <Box rounded={'30px'} px={4} py={'3px'} bg={h.arrematar ? color.focus.regular : '#BEE8D1'} >
                    <S.title style={{ color: h.arrematar ? '#ffff' : color.focus.dark, fontFamily: 'bold' }} >{h.arrematar ? 'ARREMATOU' : `R$ ${h.valorLance.toLocaleString('pt-BR')}`}</S.title>
                  </Box>
                  <S.text>{h.qtdCabeca} cabeças</S.text>
                </Box>
              </S.box>

            )}
          />
        </Box>

        {!findArrematou && (
          <S.foot>
            <Box flex={1} >
              <S.button onPress={submit} color='#e86161' >
                <Feather color='#fff' name='x' size={25} />
                <S.title style={{ color: '#fff' }} >RECUSAR</S.title>
              </S.button>
            </Box>

            <Box flex={1} >
              <S.button onPress={handleAccept} color='#006C2B' >
                <Feather color='#fff' name='check' size={25} />
                <S.title style={{ color: '#fff' }} >ACEITAR</S.title>
              </S.button>
            </Box>
          </S.foot>
        )}

      </S.content>
    </S.Container>
  )
}