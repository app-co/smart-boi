import { BoiLoteSvg } from '@/assets/svg/lotes/boi-svg'
import { CalendarSvg } from '@/assets/svg/lotes/calendarSvg'
import { GeneroMaculinoSvg } from '@/assets/svg/lotes/genero-masculino'
import { GeneroFemininoSvg } from '@/assets/svg/lotes/generoF'
import { useAuth } from '@/contexts/auth'
import { color } from '@/styles/color'
import { _text } from '@/styles/sizes'
import { enumStatusLote } from '@/utils/enuns'
import { FontAwesome5 } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { Box, HStack, Image } from 'native-base'
import React from 'react'
import * as S from './styles'

type TItem = {
  id: string
  data: string
  descricao: string
  localizacao: string
  oferta: string | null
  status: number | null
  qntPeso: string
  tempoDeVida: string
  sexo: string
  img: { id: string, urlImagem: string }[]
}

interface I {
  item: TItem
  status?: 'details' | 'otherInfo'
  typeUser?: 'comprador' | 'vendedor',
  type?: 'lance' | 'ofertar'

}

export function Lotes({ item, type = 'ofertar', typeUser = 'comprador', status = 'details' }: I) {
  const { user } = useAuth()
  const { navigate } = useNavigation()

  function handleNavigate() {
    switch (typeUser) {
      case 'comprador':
        return navigate('detalhes', { loteId: item.id, status })
      case 'vendedor':
        return navigate('lancesRecebidos', { loteId: item.id })

      default:
        break;
    }

  }

  return (
    <S.Container
      onPress={handleNavigate}
      style={{
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
      }}
    >
      <S.content>
        <S.boxImage>
          {item?.status !== 5 && type === 'ofertar' && (
            <S.statusFaixa status={item?.status as S.TStatus} >
              <S.titleFaixa>{enumStatusLote({ type: 'formated', value: item?.status })}</S.titleFaixa>
            </S.statusFaixa>

          )}
          <Image alt='boi' resizeMode='cover' source={{ uri: item?.img[0]?.urlImagem }} w={'90px'} h={'80px'} rounded={'16px'} />
        </S.boxImage>

        <Box flex={1} >
          <S.text>{item.data}</S.text>
          <S.title>{item?.descricao}</S.title>

          <HStack space={2} mt={2} >
            <FontAwesome5 name='map-marker-alt' color={color.focus.regular} size={20} />
            <S.text style={{ color: color.focus.dark, fontFamily: 'bold' }} >{item.localizacao}</S.text>
          </HStack>
        </Box>

        {type === 'lance' ? (
          <S.status status={item!.status as S.TStatus} >
            <S.text>{enumStatusLote({ type: 'formated', value: item.status })}</S.text>
          </S.status>
        ) : (
          <Box bg={color.focus.regular} rounded={10} px={3} py={'3px'} >
            <S.title style={{ fontSize: _text - 4, color: '#fff' }} >{item?.oferta ?? 0} OFERTAS</S.title>
          </Box>

        )}

      </S.content>

      <S.line />

      <S.footer>
        <HStack alignItems={'center'} space={2} >
          <BoiLoteSvg />
          <S.text style={{ fontSize: _text - 3 }} >{item?.qntPeso}</S.text>
        </HStack>
        <HStack alignItems={'center'} space={2} >
          <CalendarSvg />
          <S.text style={{ fontSize: _text - 3 }} >{item?.tempoDeVida}</S.text>
        </HStack>
        <HStack alignItems={'center'} space={1} >

          {item?.sexo === 'Macho' ? (
            <GeneroMaculinoSvg />
          ) : (
            <GeneroFemininoSvg />
          )}
          <S.text style={{ fontSize: _text - 3 }} >{item.sexo}(s)</S.text>
        </HStack>

      </S.footer>
    </S.Container>
  )
}