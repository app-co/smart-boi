import { CalendarInfoSgv } from '@/assets/svg/calendar'
import { MarteloSvg } from '@/assets/svg/home/detalhes/martelo'
import { MarteloGraySvg } from '@/assets/svg/home/detalhes/martelo-gray'
import { MoneyFillSvg } from '@/assets/svg/home/detalhes/money-fill'
import { Button } from '@/components/forms/Button'
import { ILotesById } from '@/hooks/fetchs/interfaces'
import { _text } from '@/styles/sizes'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { Box, HStack, VStack } from 'native-base'
import React from 'react'
import { ScrollView } from 'react-native'
import * as S from './styles'



export default function OthersInfo({ item }: { item: ILotesById }) {

  const navigate = useNavigation()
  const otherInfo = item?.outrasInformacoes
  return (
    <S.Container>
      <ScrollView contentContainerStyle={{ paddingBottom: 50 }} showsVerticalScrollIndicator={false} >
        <S.content>
          <HStack alignItems={'center'} space={4} >
            <CalendarInfoSgv />
            <Box flex={1} >
              <S.text>PERÍODO DO LOTE</S.text>
              <S.title style={{ fontFamily: 'regular', letterSpacing: 1.2, fontSize: _text - 2.5 }} >{otherInfo?.periodoLote}</S.title>
            </Box>
          </HStack>

          <HStack alignItems={'center'} space={4} >
            <Feather name='eye' color='#7e7e7e' size={25} />
            <Box>
              <S.text>VISUALIZAÇÕES</S.text>
              <S.title style={{ fontFamily: 'regular', letterSpacing: 1.2 }} >{otherInfo?.visualizacoes} Visualizações</S.title>
            </Box>
          </HStack>

          <HStack alignItems={'center'} space={4} >
            <MarteloGraySvg width={26} height={26} />
            <Box>
              <S.text>LANCES</S.text>
              <S.title style={{ fontFamily: 'regular', letterSpacing: 1.2 }} >{otherInfo.lances} lances</S.title>
            </Box>
          </HStack>

          <S.line />

          <Box>
            <S.title>DESCRIÇÃO DO LOTE</S.title>
            <S.title>{item?.descricaoLote} </S.title>
          </Box>

          <VStack>
            <Button onPress={() => navigate.navigate('Arrematar', { lote: item, typeLance: 'arrematar' })} icon={<MoneyFillSvg />} title='ARREMATAR' styleType='dark' />
            <Button onPress={() => navigate.navigate('Arrematar', { lote: item, typeLance: 'oferta' })} icon={<MarteloSvg />} title='ENVIAR OFERTA' styleType='alert' />
          </VStack>
        </S.content>

      </ScrollView>
    </S.Container>
  )
}