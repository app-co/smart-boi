import { color } from '@/styles/color'
import { Feather } from '@expo/vector-icons'
import { Box } from 'native-base'
import React from 'react'
import * as S from './styles'

export function Lannces() {
  return (
    <S.Container>
      <Box px={4} >
        <S.title>Lances do Lote</S.title>

        <S.box>
          <Box style={{ gap: 5 }} >
            <S.title>**** Tavares</S.title>
            <S.text>rondonia - RO</S.text>
          </Box>

          <Box style={{ gap: 5 }} alignItems={'flex-end'} >
            <Box rounded={'30px'} px={4} py={'3px'} bg={color.focus.regular} >
              <S.title style={{ color: '#ffff' }} >ARREMATOU</S.title>
            </Box>
            <S.title>R$ 100.000,00</S.title>
          </Box>
        </S.box>

      </Box>

      <S.foot>
        <Box flex={1} >
          <S.button color='#e86161' >
            <Feather color='#fff' name='x' size={25} />
            <S.title style={{ color: '#fff' }} >RECUSAR</S.title>
          </S.button>
        </Box>

        <Box flex={1} >
          <S.button color='#006C2B' >
            <Feather color='#fff' name='check' size={25} />
            <S.title style={{ color: '#fff' }} >RECUSAR</S.title>
          </S.button>
        </Box>
      </S.foot>
    </S.Container>
  )
}