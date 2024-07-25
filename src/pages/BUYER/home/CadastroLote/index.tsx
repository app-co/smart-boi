import { Loading } from '@/components/Loading'
import { Button } from '@/components/forms/Button'
import { FormInput } from '@/components/forms/FormInput'
import { RadioGrup } from '@/components/forms/RadioGrup'
import { Selection } from '@/components/forms/Selection'
import { useAuth } from '@/contexts/auth'
import { UseFatch } from '@/hooks/fetchs'
import { TRegisterLote } from '@/hooks/fetchs/schemas'
import { useRegiterLote } from '@/hooks/mutations'
import { AppError } from '@/services/AppError'
import { color } from '@/styles/color'
import { _text } from '@/styles/sizes'
import { enumCategoriaLote, enumEspecie, enumTempoVenda, enumTempoVida } from '@/utils/enuns'
import { Mask } from '@/utils/mask'
import { _currencyToNumber, _toNumber, convertNumbeToCurrency } from '@/utils/unidades'
import { Feather, Ionicons } from '@expo/vector-icons'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker'
import { Box, Image, useToast } from 'native-base'
import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { FlatList, ScrollView } from 'react-native'
import { useQuery } from 'react-query'
import * as S from './styles'

const sexos = [
  {
    value: '0',
    label: 'Macho'
  },
  {
    value: '1',
    label: 'Fêmea'
  }
]

const ofertas = [
  {
    value: '0',
    text: 'Preço por Quilo (kg)'
  },
  {
    value: '1',
    text: 'Preço por Animal'
  }
]

const fetch = new UseFatch()
const mascara = new Mask()

interface IFile {
  fileName: string
  uri: string
  type: string
}

const enumCategoria: { label: string, value: string }[] = enumCategoriaLote({ type: 'enum' }).map(h => {
  return {
    label: h.label,
    value: String(h.value)
  }
})


const enumEspecies: { label: string, value: string }[] = enumEspecie({ type: 'enum' }).map(h => {
  return {
    label: h.label,
    value: String(h.value)
  }
})


const enumTempoVendas: { label: string, value: string }[] = enumTempoVenda({ type: 'enum' }).map(h => {
  return {
    label: h.label,
    value: String(h.value)
  }
})


const enuTempoVida: { label: string, value: string }[] = enumTempoVida({ type: 'enum' }).map(h => {
  return {
    label: h.label,
    value: String(h.value)
  }
})



export function CadastroLote() {
  const navigation = useNavigation()
  const { user } = useAuth()
  const registerLote = useRegiterLote()
  const { control, setValue, getValues, handleSubmit, formState: { errors } } = useForm()


  const [oferta, setOferta] = React.useState('0')
  const [image, setImage] = React.useState<{ imagem: string }[]>([])
  const [imagens, setImagens] = React.useState<string[]>([])
  const [video, setVieo] = React.useState<string>()
  const [baseVideo, setBaseVideo] = React.useState<string>()

  const [evento, setEvento] = React.useState<string>('')
  const [especie, setEspecie] = React.useState<string>('')
  const [tempoVida, setTempoVida] = React.useState<string>('')
  const [tempoVenda, setTempoVenda] = React.useState<string>('')
  const [categoria, setCategoria] = React.useState<string>('')
  const [sexo, setSexo] = React.useState<string>('')
  const [fazenda, setFazenda] = React.useState('')

  const [Quantidade, setQuantidade] = React.useState<string>('')
  const [ValorPorAnimal, setValorAnimal] = React.useState<string>('')
  const [PesoMedio, setPesoMedio] = React.useState<string>('')
  const [ValorPorQuilo, setValorQuilo] = React.useState<string>('')

  const toast = useToast()


  const { data, isLoading } = useQuery({
    queryKey: 'lotes',
    queryFn: fetch.getAllEventos
  })

  const getFazenda = useQuery({
    queryKey: 'fazenda',
    queryFn: async () => fetch.getFazenda(user!.usuarioId)
  })

  const eventos = data?.result
    ? data.result.map(h => {
      return {
        label: h.descricao,
        value: h.id
      }
    })
    : []

  const fazendas = getFazenda?.data
    ? getFazenda?.data?.map(h => {
      return {
        label: h.nomeFazenda,
        value: h.idEndereco
      }
    })
    : []

  const getComissao = useQuery({
    queryKey: 'comissao',
    queryFn: async () => fetch.getComissao({ TipoComissao: 1 })
  })


  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      const file = result.assets[0].base64!
      const img = result.assets[0].uri!

      setImage(h => [...h, { imagem: file }]);
      setImagens(h => [...h, img]);
    }
  };

  const pickVideo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });


    if (!result.canceled) {
      const av = result.assets[0].base64!
      const file = result.assets[0].fileName!

      setVieo(av);
      setBaseVideo(file);

    }
  };

  async function submit(input: TRegisterLote) {
    if (!oferta || !especie || !categoria || !fazenda || !tempoVenda || !tempoVida) {
      toast.show({
        title: 'Todos os campos são obrigatórios',
        placement: 'bottom',
        duration: 3000,
        bg: 'red.700'
      })
      return;
    }
    try {

      const dt = {
        ...input,
        Quantidade: Number(Quantidade),
        PesoMedio: _currencyToNumber(PesoMedio ?? '0'),
        ValorPorQuilo: _currencyToNumber(ValorPorQuilo ?? '0'),
        ValorPorAnimal: _currencyToNumber(ValorPorAnimal ?? '0'),
        Sexo: Number(sexo),
        Imagens: image,
        TipoOferta: Number(oferta),
        TipoEspecie: Number(especie),
        UsuarioAppId: user!.usuarioId,
        EventoId: evento,
        TipoCategoriaLote: Number(categoria),
        EnderecoFazendaId: fazenda,
        TempoDeVida: Number(tempoVida),
        TempoDeVenda: Number(tempoVenda),
      }

      await registerLote.mutateAsync(dt)

      toast.show({
        title: 'Lote cadastrado com sucesso',
        placement: 'top',
        duration: 3000,
        bg: 'green.700'
      })

      navigation.navigate('myLotes')

    } catch (error) {
      console.log(error)
      if (error instanceof AppError) {
        toast.show({
          title: error.message,
          placement: 'bottom',
          duration: 3000,
          bg: 'red.400'
        })
      }
    }

  }


  function onChangeOferta(h: string) {
    setOferta(h)
    setValorAnimal('')
    setValorQuilo('')
    setPesoMedio('')
  }


  useFocusEffect(useCallback(() => {
    getFazenda.refetch()
  }, []))


  const calc = React.useMemo(() => {
    const qntAnimal = _toNumber(Quantidade)
    const valorPorQuilo = _currencyToNumber(ValorPorQuilo)



    let valorAnimal = 0

    if (oferta === '0') {
      valorAnimal = _toNumber(PesoMedio) * valorPorQuilo
    }

    if (oferta === '1') {
      valorAnimal = qntAnimal * valorPorQuilo
    }

    const vlTotal = valorAnimal * qntAnimal
    const comissao = getComissao.data?.porcentagem / 100


    const dt = {
      total: convertNumbeToCurrency(vlTotal),
      qntAnimal: qntAnimal,
      valorAnimal: convertNumbeToCurrency(valorAnimal),
      valorReceber: convertNumbeToCurrency(vlTotal - (vlTotal * comissao))
    }

    return dt
  }, [Quantidade, ValorPorQuilo, ValorPorAnimal, PesoMedio, oferta, getComissao])



  if (isLoading || getComissao.isLoading) {
    return <Loading />
  }


  return (
    <S.Container>

      <ScrollView showsVerticalScrollIndicator={false} >
        <S.content>

          <S.title>DADOS INICIAIS</S.title>
          <Selection label='Selecione um evento' itemSelected={h => setEvento(h)} itens={eventos} />

          <Selection placeholder='Selecione uma espécie' label=' Espécie' itens={enumEspecies} itemSelected={h => setEspecie(h)} />

          <FormInput
            name='Raca'
            control={control}
            label='Raça'
            placeholder='Insira a categoria do lote. Ex: Nelore'
            error={errors.Raca}
          />

          <Selection label='Categoria' itens={enumCategoria} itemSelected={h => setCategoria(h)} />
          <Selection label='Sexo' itens={sexos} itemSelected={h => setSexo(h)} />

          <FormInput
            label='Quantidade'
            name='Quantidade'
            placeholder='Cabeça de gados'
            keyboardType='numeric'
            control={control}
            error={errors.Quantidade}
            onChangeText={setQuantidade}

          />

          <Selection
            label='Tempo de Vida'
            placeholder='Selecione um item'
            itens={enuTempoVida}
            itemSelected={h => setTempoVida(h)}
          />

          <S.line />

          <S.title>TIPO DE OFERTA</S.title>
          <RadioGrup setItem={h => onChangeOferta(h)} radios={ofertas} alin='column' />

          {oferta === '1' && (
            <FormInput
              control={control}
              keyboardType='numeric'
              mask='currency'
              name='ValorPorQuilo'
              label='Valor por Quilo (kg)'
              placeholder='Digite o valor por kg'
              error={errors.ValorPorQuilo}
              onChangeText={setValorQuilo}
              value={mascara.money(ValorPorQuilo)}
            />

          )}

          {oferta === '0' && (
            <>
              <FormInput
                keyboardType='numeric'
                control={control}
                name='ValorPorQuilo'
                label='Valor por Quilo (kg)'
                placeholder='Digite o valor por kg'
                onChangeText={setValorQuilo}
                error={errors.ValorPorQuilo}
                value={mascara.money(ValorPorQuilo)}
              />
              <FormInput
                keyboardType='numeric'
                control={control}
                name='PesoMedio'
                label='Peso Médio Animal'
                placeholder='Digite o peso médio do anima'
                error={errors.PesoMedio}
                onChangeText={setPesoMedio}
                value={PesoMedio}
              />
              <FormInput
                mask='currency'
                keyboardType='numeric'
                control={control}
                name='ValorPorAnimal'
                label='Valor por Animal'
                placeholder='Digite o valor do animal R$'
                error={errors.ValorPorAnimal}
                value={calc.valorAnimal}
              />
            </>
          )}

          <FormInput
            placeholder='Insira a descrição sobre o lote de gado, para que o comprador conheça melhor'
            boxTex
            multiline
            numberOfLines={5}
            control={control}
            name='DescricaoLote' label='Descrição do Lote'
            error={errors.DescricaoLote}
          />

          <Selection label='Tempo de Venda' itens={enumTempoVendas} itemSelected={h => setTempoVenda(h)} />


          <S.line />

          <S.gap>
            <S.title>SELECIONE O ENDEREÇO DO LOTE</S.title>

            <Selection itens={fazendas} itemSelected={h => setFazenda(h)} />

            {/* <S.buttonSheet style={{ borderColor: '#e9e9e9' }} >
                <HStack alignItems={'center'} space={4} >
                  <Box bg={'gray.100'} rounded={8} p={2} >
                    <Feather name='map-pin' size={20} color={'#ccc'} />
                  </Box>
                  <S.title>{}</S.title>
                </HStack>

              </S.buttonSheet> */}
            <Button onPress={() => navigation.navigate('cadastroPropriedade')} title='ADICIONAR ENDEREÇO' styleType='border' icon={<Feather name='plus' size={25} />} />
          </S.gap>

          <S.line />

          <S.gap>
            <S.title>VÍDEOS E IMAGENS</S.title>

            <FormInput name='Video' label='URL vídeo' placeholder='seu vídeo do youtube' control={control} />

            {baseVideo && (
              <S.title>Video adicionado: {baseVideo}</S.title>
            )}

            <S.boxMidia onPress={pickImage} disabled={imagens.length === 5} >
              <Ionicons name='camera' size={24} />
              <S.title>FOTOS</S.title>
            </S.boxMidia>

            <S.title>Maximo 5 fotos</S.title>

            <FlatList
              horizontal
              contentContainerStyle={{ gap: 8 }}
              data={imagens}
              keyExtractor={h => h}
              renderItem={({ item: h }) => (
                <Image source={{ uri: h }} w={'100px'} h={'60px'} borderRadius={8} alt='bois' bg={'gray.200'} />
              )}
            />
          </S.gap>

          <Box style={{ gap: 5 }} mt={6} >
            <S.title>RESUMO DE VALORES</S.title>
            <S.row>
              <S.title style={{ fontSize: _text - 3 }} >Preço por animal</S.title>
              <S.title style={{ fontSize: _text - 3 }} >{calc.valorAnimal}</S.title>
            </S.row>

            <S.line />
            <S.row>
              <S.title style={{ fontSize: _text - 3 }} >Valor total do lote</S.title>
              <S.title style={{ fontSize: _text - 3 }} >{calc.total}</S.title>
            </S.row>

            <S.row>
              <S.title style={{ fontSize: _text - 3 }} >Comissão a Pagar</S.title>
              <S.title style={{ fontSize: _text - 3 }} >{getComissao.data?.porcentagem}%</S.title>
            </S.row>
          </Box>

          <S.row>
            <S.title style={{ color: '#252525', fontSize: _text }} >Valor a Receber</S.title>
            <S.title style={{ color: color.focus.regular, fontSize: _text }} >{calc.valorReceber}</S.title>
          </S.row>


          <Button load={registerLote.isLoading} onPress={handleSubmit(submit)} title='CADASTRAR LOTE' styleType='dark' />
        </S.content>

      </ScrollView>

    </S.Container>
  )
}