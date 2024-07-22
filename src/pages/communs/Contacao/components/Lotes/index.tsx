import { BoiSvg } from '@/assets/svg/contacao/boi'
import { IconeBoiSvg } from '@/assets/svg/contacao/icone-boi'
import { ICotacao } from '@/hooks/fetchs/interfaces'
import { useNavigation } from '@react-navigation/native'
import { format } from 'date-fns'
import { Box, HStack } from 'native-base'
import React from 'react'
import * as S from './styles'

interface I {
  item: ICotacao
  usuario?: 'comprador' | 'vendedor'
}



export function Lotes({ item }: I) {
  const navigation = useNavigation()
  return (
    <>
      <S.title style={{ color: '#ababab', marginVertical: 10 }} >{item?.estado}</S.title>
      <S.Container>
        <HStack alignItems={'flex-end'} >
          <BoiSvg />
          <Box ml={-3} >
            <IconeBoiSvg />
          </Box>
        </HStack>

        <Box ml={2} >
          <S.title>R$ {item?.valor.toLocaleString('pt-BR')}</S.title>
          <S.text>{format(new Date(item.dataCotacao), 'dd/MM/yy')}</S.text>
        </Box>

        <Box style={{ gap: 10 }} flex={1} alignItems={'flex-end'} justifyContent={'space-between'} >
          <S.taxa cor={'#BFDEC5'} >
            <S.text>{item?.porcentagem}%</S.text>
          </S.taxa>

          <S.buttao onPress={() => navigation.navigate('historico', { uf: item.estado, tipoGado: item.tipoGado })} >
            <S.text style={{ fontSize: 12 }} >VER HISTÓRICO</S.text>
          </S.buttao>
        </Box>
      </S.Container>

      <S.line style={{ marginVertical: 15 }} />
    </>
  )
}