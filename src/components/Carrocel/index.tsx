import { ILotes } from '@/hooks/fetchs/interfaces'
import { color } from '@/styles/color'
import { hightPercent } from '@/styles/sizes'
import { enumStatusLote } from '@/utils/enuns'
import { useNavigation } from '@react-navigation/native'
import { format } from 'date-fns'
import { Box, HStack, Image } from 'native-base'
import React from 'react'
import * as S from './styles'

interface I {
  variation: 'andamento' | 'encerrado'
  item: ILotes
}

export function Carrocel({ variation, item }: I) {
  const { navigate } = useNavigation()

  return (
    <S.Container
      style={{
        shadowColor: "#000",
        shadowOffset: {
          width: 3,
          height: 2,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4,

        elevation: 2,
      }}
    >
      {variation === 'andamento' && (
        <Box>
          <Image resizeMode='cover' roundedTop={8} source={{ uri: item?.urlImagens[0]?.urlImagem }} bg={'gray.300'} h={hightPercent('15')} alt='img-boi' />

          <Box p={2} style={{ gap: 10 }} >
            <HStack alignItems={'center'} justifyContent={'space-between'} >
              <Box flex={1} >
                <S.title>{item?.uf} - {item.cidade}</S.title>
                <S.title>{format(item.dataCriacao, 'dd/MM/yyyy')}</S.title>
              </Box>

              <S.lance>
                <S.title style={{ color: '#fff' }} >{item.qtdOfertas ?? 0} lances</S.title>
              </S.lance>

            </HStack>
            <S.button onPress={() => navigate('detalhes', { loteId: item.loteId, status: 'details' })} >
              <S.title style={{ color: color.focus.dark }} >Ver Detalhes</S.title>
            </S.button>

          </Box>


        </Box>

      )}

      {variation === 'encerrado' && (
        <Box>
          <S.boxImage>
            <S.statusFaixa status={item.statusLote as S.TStatus} >
              <S.title style={{ fontFamily: 'bold', fontSize: 20, color: '#fff', letterSpacing: 3 }} >{enumStatusLote({ type: 'formated', value: item.statusLote })}</S.title>
            </S.statusFaixa>
            <Image resizeMode='cover' roundedTop={8} source={{ uri: item?.urlImagens[0]?.urlImagem }} bg={'gray.300'} h={hightPercent('15')} alt='img-boi' />

          </S.boxImage>

          <Box p={2} style={{ gap: 10 }} >
            <HStack alignItems={'center'} justifyContent={'space-between'} >
              <Box>
                <S.title>{item?.uf} - {item.cidade}</S.title>
                <S.title>{format(item.dataCriacao, 'dd/MM/yyyy')}</S.title>
              </Box>

              <S.lance>
                <S.title style={{ color: '#fff' }} >{item.qtdOfertas ?? 0} lances</S.title>
              </S.lance>

            </HStack>
            <S.button onPress={() => navigate('detalhes', { loteId: item.loteId, status: 'details' })} >
              <S.title style={{ color: color.focus.dark }} >Ver Detalhes</S.title>
            </S.button>

          </Box>


        </Box>

      )}

    </S.Container>
  )
}