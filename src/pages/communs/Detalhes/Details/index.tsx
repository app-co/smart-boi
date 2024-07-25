import { BandeiraSvg } from '@/assets/svg/home/detalhes/bandeira-svg'
import { BigornaSvg } from '@/assets/svg/home/detalhes/bigorna-svg'
import { FolderSvg } from '@/assets/svg/home/detalhes/folder-svg'
import { MarteloSvg } from '@/assets/svg/home/detalhes/martelo'
import { MoneySvg } from '@/assets/svg/home/detalhes/money'
import { MoneyFillSvg } from '@/assets/svg/home/detalhes/money-fill'
import { BoiLoteSvg } from '@/assets/svg/lotes/boi-svg'
import { CalendarSvg } from '@/assets/svg/lotes/calendarSvg'
import { GeneroMaculinoSvg } from '@/assets/svg/lotes/genero-masculino'
import { GeneroFemininoSvg } from '@/assets/svg/lotes/generoF'
import { Button } from '@/components/forms/Button'
import { ChangeAccountSignIn } from '@/components/modals/modalSheet/change-account-signIn'
import { useAuth } from '@/contexts/auth'
import { UseFatch } from '@/hooks/fetchs'
import { ILotesById } from '@/hooks/fetchs/interfaces'
import { enumCategoriaLote, enumEspecie, enumSexo } from '@/utils/enuns'
import { AntDesign, Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { Box, Center, Circle, HStack } from 'native-base'
import React, { useRef, useState } from 'react'
import { Alert, ScrollView, Share, TouchableOpacity } from 'react-native'
import { Modalize } from 'react-native-modalize'
import { Extrapolate, interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import * as S from './styles'

const itens = Array.from({ length: 9 }, (_, index) => index + 1)
const fetch = new UseFatch()

interface I {
  item: ILotesById
}

const sexo: any = {
  0: 'Macho',
  1: 'Fêmea',
}

export default function Details({ item }: I) {
  const { user } = useAuth()
  const scrollViewRef = useRef(null);
  const navigate = useNavigation()
  const ref = useRef<Modalize>(null)

  const [scrollDirection, setScrollDirection] = useState<'down' | 'up' | ''>('');
  const [scrollOffset, setScrollOffset] = React.useState(0)
  const [endScroll, setEndScroll] = React.useState<boolean>(false)

  const animatedValue = useSharedValue(0);
  const animation = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          animatedValue.value,
          [0, 1],
          [100, 15],
          Extrapolate.CLAMP,
        ),
      },
    ],
  }));

  React.useEffect(() => {
    if (!endScroll) {
      animatedValue.value = withTiming(scrollDirection === 'up' ? 1 : 0, {
        duration: 300,
      });

    }

    if (endScroll) {
      animatedValue.value = withTiming(1, {
        duration: 300,
      });
    }
  }, [animatedValue, scrollDirection, endScroll]);


  const accessComum = user?.tipoAcesso.find(h => h.codTipoAcesso === 4)?.codTipoAcesso === 4 && user.tipoAcesso.length === 1

  const VK = item.valorPorQuilo
    ? item?.valorPorQuilo.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })
    : '0'.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })

  const especie = enumEspecie({
    type: 'formated',
    value: Number(item.tipoEspecie),
  })

  const categoria = enumCategoriaLote({
    type: 'formated',
    value: Number(item.tipoCategoriaLote),
  })

  const sexo = enumSexo({
    type: 'formated',
    value: Number(item.sexo),
  })

  const total = item.quantidadeAnimal * item.valorPorAnimal

  const shareMessage = async () => {
    try {
      const result = await Share.share({
        title: 'Chave pix copia e cola',
        message: 'copi right',
      });

      if (result.action === Share.sharedAction) {
        Alert.alert(
          'Compartilhado com sucesso',
          'O chave foi compartilhada com sucesso.',
        );
      } else if (result.action === Share.dismissedAction) {
        Alert.alert(
          'Ops, parece que algo deu errado',
          'O chave não foi compartilhada.',
        );
      }
    } catch (error) {
      alert(error);
    }
  };



  const handleScroll = (event: any) => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    const direction = currentOffset > 0 && currentOffset > scrollOffset ? 'down' : 'up';
    setScrollDirection(direction);
    setScrollOffset(currentOffset);

    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent

    const isEnd = layoutMeasurement.height + contentOffset.y >= contentSize.height - 1
    setEndScroll(isEnd)
  };


  return (
    <S.Container>
      <ChangeAccountSignIn modalizeRef={ref} />
      <ScrollView

        ref={scrollViewRef}
        contentContainerStyle={{ paddingBottom: 130, paddingTop: 30 }}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >

        <S.box>
          <Center p={2} rounded={8} bg={'#F3F4F6'} >
            <BandeiraSvg />
          </Center>
          <Box flex={1} >
            <S.text>EVENTO</S.text>
            <S.title>{item?.nomeEvento}</S.title>
          </Box>

          <TouchableOpacity onPress={shareMessage} >
            <Circle size={'35'} mr={0} bg={'#66A272'} >
              <AntDesign color='#fff' size={20} name='sharealt' />
            </Circle>

          </TouchableOpacity>

        </S.box>

        <S.box>
          <Center p={2} rounded={8} bg={'#F3F4F6'} >
            <BoiLoteSvg />
          </Center>
          <Box flex={1} >
            <S.text>ESPÉCIE</S.text>
            <S.title>{especie}</S.title>
          </Box>
        </S.box>

        <S.box>
          <Center p={2} rounded={8} bg={'#F3F4F6'} >
            <BoiLoteSvg />
          </Center>
          <Box flex={1} >
            <S.text>CATEGORIA</S.text>
            <S.title>{categoria}</S.title>
          </Box>
        </S.box>

        <S.box>
          <Center p={2} rounded={8} bg={'#F3F4F6'} >
            <BoiLoteSvg />
          </Center>
          <Box flex={1} >
            <S.text>RAÇA</S.text>
            <S.title>{item?.raca}</S.title>
          </Box>
        </S.box>

        <S.box>
          <Center p={3} rounded={8} bg={'#F3F4F6'} >
            <CalendarSvg />
          </Center>
          <Box flex={1} >
            <S.text>IDADE (MÉDIA)</S.text>
            <S.title>{item?.idadeMedia}</S.title>
          </Box>
        </S.box>

        <S.box>
          <Center p={2} rounded={8} bg={'#F3F4F6'} >
            {item?.sexo === 0 ? (
              <GeneroMaculinoSvg />
            ) : (
              <GeneroFemininoSvg />
            )}
          </Center>
          <Box flex={1} >
            <S.text>SEXO</S.text>
            <S.title>{sexo}</S.title>
          </Box>
        </S.box>

        <S.box>
          <Center p={3} rounded={8} bg={'#F3F4F6'} >
            <Feather name='map-pin' size={20} color={'#a3a4a6'} />
          </Center>
          <Box flex={1} >
            <S.text>LOCALIZAÇÃO</S.text>
            <S.title>{item?.localizacao}</S.title>
          </Box>
        </S.box>

        <S.box>
          <Center p={2} rounded={8} bg={'#F3F4F6'} >
            <FolderSvg />
          </Center>
          <Box flex={1} >
            <S.text>QUANTIDADE</S.text>
            <S.title>{item?.quantidade}</S.title>
          </Box>
        </S.box>

        <S.box>
          <Center p={2} rounded={8} bg={'#F3F4F6'} >
            <BigornaSvg />
          </Center>
          <Box flex={1} >
            <S.text>PESO MÉDIO POR ANIMAL</S.text>
            <S.title>{item?.valorPorQuilo}</S.title>
          </Box>
        </S.box>

        <S.box>
          <Center p={2} rounded={8} bg={'#F3F4F6'} >
            <MoneySvg />
          </Center>
          <Box flex={1} >
            <S.text>VALOR POR KG</S.text>
            <S.title>{VK}</S.title>
          </Box>
        </S.box>

        <HStack alignItems={'center'} justifyContent={'space-between'} mt={4} >
          <S.text>VALOR TOTAL DO LOTE</S.text>
          <S.title>R$ {total.toLocaleString('pt-BR')}</S.title>
        </HStack>



      </ScrollView>

      <S.footerButton end={endScroll} style={animation} >

        <Button onPress={() => {
          if (accessComum) {
            ref.current?.open()
            return
          }
          navigate.navigate('Arrematar', { lote: item, typeLance: 'arrematar' })
        }} icon={<MoneyFillSvg />} title='ARREMATAR' styleType='dark' />
        <Button onPress={() => {
          if (accessComum) {
            ref.current?.open()
            return
          }
          navigate.navigate('Arrematar', { lote: item, typeLance: 'oferta' })
        }} icon={<MarteloSvg />} title='ENVIAR OFERTA' styleType='alert' />
      </S.footerButton>


    </S.Container>
  )
}