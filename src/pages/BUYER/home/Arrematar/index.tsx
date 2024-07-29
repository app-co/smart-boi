import { MarteloAlertSvg } from '@/assets/svg/home/detalhes/martelo-alert'
import { MarteloLighttSvg } from '@/assets/svg/home/detalhes/martelo-with'
import { MoneyFillSvg } from '@/assets/svg/home/detalhes/money-fill'
import { Loading } from '@/components/Loading'
import { Button } from '@/components/forms/Button'
import { FormInput } from '@/components/forms/FormInput'
import { RadioGrup } from '@/components/forms/RadioGrup'
import { Selection } from '@/components/forms/Selection'
import { useAuth } from '@/contexts/auth'
import { UseFatch } from '@/hooks/fetchs'
import { ILotesById } from '@/hooks/fetchs/interfaces'
import { TRegisterLance } from '@/hooks/fetchs/types'
import { useGetFrete, useRegisterLance } from '@/hooks/mutations'
import { useGetRepresentants } from '@/hooks/queries'
import { AppError } from '@/services/AppError'
import { color } from '@/styles/color'
import { _subtitle, _title, hightPercent, widtPercent } from '@/styles/sizes'
import { enumCategoriaLote } from '@/utils/enuns'
import { Mask } from '@/utils/mask'
import { _currencyToNumber, convertNumbeToCurrency } from '@/utils/unidades'
import { Feather, Ionicons } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Box, Center, Checkbox, HStack, Image, useToast } from 'native-base'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Modal, ScrollView } from 'react-native'
import { useQuery } from 'react-query'
import { z } from 'zod'
import * as S from './styles'

const radios = [
  {
    value: '0',
    text: 'Frete Próprio'
  },
  {
    value: '1',
    text: 'Trasportadora'
  }
]

const msk = new Mask()


const fetch = new UseFatch()

type TTypeLance = 'oferta' | 'arrematar'

const schema = z.object({
  kg: z.string(),
})

type TSubmit = z.infer<typeof schema>
export function Arrematar() {
  const { user } = useAuth()
  const navigation = useNavigation()
  const { mutateAsync } = useGetFrete()
  const registerLance = useRegisterLance()
  const { lote, typeLance } = useRoute().params as { lote: ILotesById, typeLance: TTypeLance }
  const [tipoLance, setTypeLance] = React.useState<TTypeLance>(typeLance)

  const { control, setValue, handleSubmit, formState: { errors } } = useForm<TSubmit>()



  const [openSheet, setOpenSheet] = React.useState<boolean>(false)
  const [fazenda, setFazenda] = React.useState<{ label: string, value: string }[]>([])
  const [checkImpost, setCheckImposto] = React.useState<boolean>(false)
  const [selectedRepresentante, setSelectedRepresentante] = React.useState('')
  const [selectedTypeTransportadora, setSelectedtypeEntrega] = React.useState('0')
  const [valorQuilo, setValorQuilo] = React.useState('0')
  const [frete, setFrete] = React.useState(0)
  const [selectedEnderecoId, setSelectedEnderecoId] = React.useState<string>('')


  const getFazenda = useQuery({
    queryKey: 'fazenda',
    queryFn: async () => fetch.getFazenda(user!.usuarioId)
  })

  const { data: getImposto, isLoading: getImpostoLoading } = useQuery({
    queryKey: 'imposto',
    queryFn: async () => fetch.getImposto()
  })

  const getUsers = useGetRepresentants()
  const representantes = getUsers?.data && getUsers.data.length > 0
    ? getUsers.data.map(h => {
      return {
        label: h.nomeUsuario,
        value: h.usuarioAppId
      }
    })
    : []

  const { data: getComissao, isLoading: getComissaoLoading } = useQuery({
    queryKey: 'comissao',
    queryFn: async () => fetch.getComissao({ comissao: 2 })
  })

  React.useEffect(() => {
    async function getFrete() {
      const get = await mutateAsync({ EnderecoId: fazenda[0].value, LoteId: lote.loteId })

      setFrete(get.frete)

    }
    if (fazenda.length > 0 && selectedTypeTransportadora) {
      getFrete()
    }
  }, [fazenda])


  const fazendas = getFazenda?.data
    ? getFazenda?.data?.map(h => {
      return {
        label: h.nomeFazenda,
        value: h.idEndereco
      }
    })
    : []

  function changeToArrematar() {
    if (tipoLance === 'arrematar') {
      setValorQuilo(lote?.valorPorQuilo.toString() ?? '0')
    }

  }

  React.useEffect(() => {
    changeToArrematar()
  }, [tipoLance])


  const [modal, setModal] = React.useState<boolean>(false)

  const toast = useToast()

  const calc = React.useMemo(() => {
    const { valorPorAnimal, quantidadeAnimal, valorPorQuilo } = lote
    const porcentagem = getComissao?.porcentagem ?? 0
    const tributo = getImposto?.valor ?? 0

    const vlAnimal = valorPorAnimal ?? 0
    const vlLote = quantidadeAnimal ?? 1 * vlAnimal
    const comissao = porcentagem ? (porcentagem / 100) * vlAnimal : 0
    const imposto = checkImpost ? 0 : tributo
    const total = vlAnimal + vlLote + vlAnimal + comissao + imposto + frete

    const vlFinalPorAnimal = vlAnimal + comissao + frete + imposto

    return {
      vlAnimal, quantidadeAnimal, vlLote, comissao, imposto, total, vlFinalPorAnimal
    }
  }, [lote, getComissao, checkImpost, getImposto])


  async function subit(input: TSubmit) {
    if (!selectedEnderecoId && selectedTypeTransportadora === '1') {
      toast.show({
        title: 'Selecione um endereço',
        placement: 'top',
        bgColor: 'red.600',
      })
      return
    }

    const kgValue = valorQuilo.replace(/\D/g, '')

    let kg = kgValue.length <= 2 ? Number(kgValue) : Number(kgValue) / 100


    const dt: TRegisterLance = {
      loteId: lote!.loteId,
      valorImposto: Number(calc.imposto.toFixed(2)),
      valorFrete: Number(frete),
      comissaoPaga: Number(calc.comissao.toFixed(2)),
      valorLance: typeLance === 'arrematar' ? null : Number(valorQuilo.replace(/\D/g, '')),
      precoAnimal: calc.vlAnimal,
      valorFinalAnimal: Number(calc.vlFinalPorAnimal.toFixed(2)),
      valorFinalKg: kg,
      precoLote: calc.vlLote,
      qtdCabeca: lote.quantidadeAnimal,
      arrematar: typeLance === 'arrematar' ? true : false,
      tipoImposto: checkImpost ? 0 : 1,
      tipoEntrega: Number(selectedTypeTransportadora),
      enderecoId: selectedEnderecoId,
      usuarioCompradorId: user!.usuarioId,
      usuarioRepresentanteId: selectedRepresentante,
    }

    try {
      await registerLance.mutateAsync(dt)

      setModal(true)

      setTimeout(() => {
        setModal(false)
        navigation.navigate('Lance', { screen: 'lances' })


      }, 4000)

    } catch (error) {
      if (error instanceof AppError) {
        toast.show({
          title: error.message,
          placement: 'top',
          bgColor: 'red.600',
        })
      }
    }
  }


  const tipoLote = enumCategoriaLote({ type: "formated", value: Number(lote.tipoCategoriaLote) }) as string

  if (getFazenda.isLoading || getImpostoLoading) {
    return <Loading />
  }

  return (
    <S.Container>
      <Modal transparent visible={modal} >
        <Center w={widtPercent('60')} alignSelf={'center'} mt={hightPercent('40')} p={6} bg={color.focus.regular} >
          <S.title style={{ fontFamily: 'bold', color: '#fff', fontSize: _title }} >Parabens!</S.title>
          {typeLance === 'arrematar' ? (
            <S.text style={{ color: '#fff', fontSize: _subtitle, textAlign: 'center' }} >Em breve nossa equipe entrara em contato</S.text>

          ) : (
            <S.text style={{ color: '#fff', fontSize: _subtitle, textAlign: 'center' }} >Lance efetuado com sucesso.</S.text>
          )}
        </Center>
      </Modal>
      <ScrollView showsVerticalScrollIndicator={false} >
        <S.title>DADOS INICIAIS</S.title>
        <S.content>
          <S.head>
            <HStack space={4} alignItems={'center'} >
              <Image source={{ uri: lote.urlImagens[0].urlImagem }} alt='boi' w={10} h={10} bg={'gray.200'} />
              <Box>
                <S.text>{tipoLote}</S.text>
                <S.title>{lote?.nomeEvento}</S.title>
              </Box>
            </HStack>

            {/* <Ionicons name='eye' size={25} color={color.focus.regular} /> */}
          </S.head>

          <Selection itens={representantes} itemSelected={h => setSelectedRepresentante(h)} label='Representante' placeholder='Selecione um representante' />

        </S.content>

        <S.line />

        <S.content>
          <S.title>MODO DE ENTREGA</S.title>
          <RadioGrup setItem={h => setSelectedtypeEntrega(h)} radios={radios} />

          <S.title>IMPOSTO (ICMS FORA DO ESTADO DE ORIGEM)</S.title>

          {!checkImpost && (
            <FormInput
              control={control}
              name='imposto'
              placeholder='0,00'
              label='Imposto'
              value={getImposto?.valor ? getImposto?.valor.toLocaleString('pt-BR') : '0,00'}
              editable={false}
            />

          )}

          <Checkbox _checked={{ bg: color.focus.regular, borderColor: color.focus.regular }} isChecked={checkImpost} onChange={h => setCheckImposto(h)} value='Isento' size={'sm'} >
            <S.text>Isento</S.text>
          </Checkbox>
        </S.content>

        <S.line />

        {selectedTypeTransportadora === '1' && (
          <S.content>
            <S.title>SELECIONE O ENDEREÇO PARA ENTREGA</S.title>
            <Selection itens={fazendas} itemSelected={h => setSelectedEnderecoId(h)} />
            <Button onPress={() => navigation.navigate('cadastroPropriedade')} title='ADICIONAR ENDEREÇO' styleType='border' icon={<Feather name='plus' size={25} color={color.focus.regular} />} />

            <S.line />
          </S.content>

        )}


        <S.content>
          <HStack space={4} >
            <S.buttonOferta onPress={() => setTypeLance('oferta')} typeStyle={tipoLance} >
              {tipoLance === 'oferta' && (
                <MarteloLighttSvg />
              )}

              {tipoLance === 'arrematar' && (
                <MarteloAlertSvg fill='0_2449_1444' />
              )}
              <S.title style={{ color: tipoLance === 'oferta' ? '#fff' : color.alert, fontFamily: 'bold' }} >MINHA OFERTA</S.title>
            </S.buttonOferta>
            <S.buttonLance onPress={() => {
              setTypeLance('arrematar')
            }} typeStyle={tipoLance} >
              <MoneyFillSvg fill={tipoLance === 'arrematar' ? '#fff' : color.focus.regular} />
              <S.title style={{ color: tipoLance === 'arrematar' ? '#fff' : color.focus.regular, fontFamily: 'bold' }} >ARREMATAR</S.title>
            </S.buttonLance>


          </HStack>

          <FormInput
            name='kg'
            placeholder='R$ 0,00'
            onChangeText={setValorQuilo}
            value={msk.money(valorQuilo)}
            error={errors.kg}
            control={control}
            keyboardType='numeric'
            label='Preço do quilo (kg)'
            editable={tipoLance === 'arrematar' ? false : true}
          />

          <Box style={{ gap: 2 }} >
            <S.title>RESUMO DE VALORES</S.title>
            <HStack alignItems={'center'} justifyContent={'space-between'} >
              <S.text>Preço por Animal</S.text>
              <S.text>{convertNumbeToCurrency(calc.vlAnimal)}</S.text>
            </HStack>

            <HStack alignItems={'center'} justifyContent={'space-between'} >
              <S.text>Quantidade por Cabeças</S.text>
              <S.text>{calc.quantidadeAnimal}</S.text>
            </HStack>

            <HStack alignItems={'center'} justifyContent={'space-between'} >
              <S.text>Preço do Lote</S.text>
              <S.text>{convertNumbeToCurrency(calc.vlLote)}</S.text>
            </HStack>

            <S.line mg={4} />
            <HStack alignItems={'center'} justifyContent={'space-between'} >
              <S.text>Comissão da Compra</S.text>
              <S.text style={{ color: color.alert }} >{convertNumbeToCurrency(calc.comissao)}</S.text>
            </HStack>

            {selectedTypeTransportadora === '1' && (
              <HStack alignItems={'center'} justifyContent={'space-between'} >
                <S.text>Frete</S.text>
                <S.text style={{ color: color.alert }} >R$ {frete}</S.text>
              </HStack>

            )}


            <HStack alignItems={'center'} justifyContent={'space-between'} >
              <S.text>Imposto</S.text>
              <S.text style={{ color: color.alert }} >{convertNumbeToCurrency(calc.imposto)}</S.text>
            </HStack>
            <S.line />
          </Box>

        </S.content>

        <S.content>
          <HStack alignItems={'center'} justifyContent={'space-between'} >
            <S.title style={{ fontFamily: 'bold', fontSize: _subtitle }}>Valor Total</S.title>
            <S.title style={{ fontFamily: 'bold', fontSize: _subtitle }}>{convertNumbeToCurrency(calc.total)}</S.title>
          </HStack>

          <Box>
            <HStack alignItems={'center'} justifyContent={'space-between'} >
              <S.text>Valor Final por Animal</S.text>
              <S.text>{convertNumbeToCurrency(calc.vlFinalPorAnimal)}</S.text>
            </HStack>
            <HStack alignItems={'center'} justifyContent={'space-between'} >
              <S.text>Valor Final por kg</S.text>
              <S.text>{convertNumbeToCurrency(_currencyToNumber(valorQuilo))}</S.text>
            </HStack>
          </Box>

          <Button load={registerLance.isLoading} onPress={handleSubmit(subit)} title={tipoLance === 'arrematar' ? 'FINALIZAR COMPRA' : 'ENVIAR OFERTA'} styleType='dark' icon={<Ionicons name='checkmark-circle' color='#fff' size={25} />} />
        </S.content>

      </ScrollView>
    </S.Container>
  )
}