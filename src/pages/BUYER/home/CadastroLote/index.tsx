import { Loading } from '@/components/Loading'
import { Button } from '@/components/forms/Button'
import { FormInput } from '@/components/forms/FormInput'
import { RadioGrup } from '@/components/forms/RadioGrup'
import { Selection } from '@/components/forms/Selection'
import { useAuth } from '@/contexts/auth'
import { UseFatch } from '@/hooks/fetchs'
import { TRegisterLote, schemaRegisterLote } from '@/hooks/fetchs/schemas'
import { useRegiterLote } from '@/hooks/mutations'
import { AppError } from '@/services/AppError'
import { color } from '@/styles/color'
import { _text } from '@/styles/sizes'
import { Feather, Ionicons } from '@expo/vector-icons'
import { zodResolver } from '@hookform/resolvers/zod'
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

const categoryLotes = [
  {
    value: '0',
    label: 'Bezerro'
  },
  {
    value: '1',
    label: 'Touro'
  },
  {
    value: '2',
    label: 'Novilho'
  },
  {
    value: '3',
    label: 'Vaca'
  },

  {
    value: '4',
    label: 'Boi'
  },

  {
    value: '5',
    label: 'Potro'
  },

  {
    value: '6',
    label: 'Egua'
  },

  {
    value: '7',
    label: 'Cavalo'
  },

  {
    value: '8',
    label: 'Cordeiro'
  },

  {
    value: '9',
    label: 'Ovelha'
  },

  {
    value: '10',
    label: 'Carneiro'
  },
  {
    value: '11',
    label: 'Leitão'
  },
  {
    value: '12',
    label: 'Porca'
  },

  {
    value: '13',
    label: 'Porco'
  },
  {
    value: '14',
    label: 'Frango'
  },
  {
    value: '15',
    label: 'Galinha'
  },
  {
    value: '16',
    label: 'Galo'
  },
  {
    value: '17',
    label: 'Outros'
  },

]

const tempoVendas = [
  {
    value: '0',
    label: 'Cinco Dias'
  },
  {
    value: '1',
    label: 'Dez Dias'
  }, {
    value: '2',
    label: 'Quinze Dias'
  }, {
    value: '3',
    label: 'Vinte Dias'
  }, {
    value: '4',
    label: 'Trinta Dias'
  }, {
    value: '5',
    label: 'Trinta Cinco Dias'
  }, {
    value: '6',
    label: 'Quarenta Dias'
  }, {
    value: '7',
    label: 'Quarenta Cinco Dias'
  }
]

const tempoVidas = [
  {
    value: '0',
    label: 'Até Doze Meses'
  },
  {
    value: '1',
    label: 'Até Vite e Quatro Meses'
  }, {
    value: '2',
    label: 'Até Trinta e Seis Meses'
  }, {
    value: '3',
    label: 'Até Quarenta e Oito Meses'
  }, {
    value: '4',
    label: 'Mais de Quarenta e Oito Meses'
  }
]

const especies = [
  {
    value: '0',
    label: 'Bovino'
  },
  {
    value: '1',
    label: 'Equino'
  },
  {
    value: '2',
    label: 'Ovinos'
  },
  {
    value: '3',
    label: 'Caprino'
  },
  {
    value: '4',
    label: 'Suínos'
  },
  {
    value: '5',
    label: 'Aves'
  }

]

const fetch = new UseFatch()

interface IFile {
  fileName: string
  uri: string
  type: string
}



export function CadastroLote() {
  const navigation = useNavigation()
  const { user } = useAuth()
  const registerLote = useRegiterLote()
  const { control, setValue, getValues, handleSubmit, formState: { errors } } = useForm<TRegisterLote>({
    resolver: zodResolver(schemaRegisterLote.omit({
      EventoId: true,
      TipoEspecie: true,
      TipoCategoriaLote: true,
      Sexo: true,
      TipoOferta: true,
      TempoDeVenda: true,
      TempoDeVida: true,
      Imagens: true,
      UsuarioAppId: true,
      EnderecoFazendaId: true,
      Video: true,
    })),

  })
  const [oferta, setOferta] = React.useState('0')
  const [image, setImage] = React.useState<{ imagem: string }[]>([])
  const [imagens, setImagens] = React.useState<string[]>([])
  const [video, setVieo] = React.useState<string>()
  const [baseVideo, setBaseVideo] = React.useState<string>()

  const [evento, setEvento] = React.useState<string>('')
  const [especie, setEspecie] = React.useState<string>('')
  const [tempoVida, setTempoVida] = React.useState<string>('0')
  const [tempoVenda, setTempoVenda] = React.useState<string>('0')
  const [categoria, setCategoria] = React.useState<string>('')
  const [sexo, setSexo] = React.useState<string>('0')
  const [fazenda, setFazenda] = React.useState('')

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
        Quantidade: Number(input.Quantidade.replace(/\D/g, '')),
        PesoMedio: Number(input.PesoMedio.replace(/\D/g, '')) / 100,
        ValorPorQuilo: Number(input.ValorPorQuilo.replace(/\D/g, '')) / 100,
        ValorPorAnimal: Number(input.ValorPorAnimal.replace(/\D/g, '')) / 100,
        Sexo: Number(sexo),
        Imagens: image,
        TipoOferta: Number(oferta),
        TipoEspecie: Number(especie),
        UsuarioAppId: user!.usuarioId,
        EventoId: evento,
        TipoCategoriaLote: Number(categoria),
        EnderecoFazendaId: fazenda,
        Video: video ?? '',
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
    setValue('ValorPorAnimal', '')
    setValue('ValorPorQuilo', '')
    setValue('PesoMedio', '')
  }


  useFocusEffect(useCallback(() => {
    getFazenda.refetch()
  }, []))

  const qntAnimal = Number(String(getValues().Quantidade).replace(/\D/g, ''))
  const vlAnimal = Number(String(getValues().ValorPorAnimal).replace(/\D/g, ''))

  const vlTotal = qntAnimal * (vlAnimal / 100)


  if (isLoading || getComissao.isLoading) {
    return <Loading />
  }


  return (
    <S.Container>

      <ScrollView showsVerticalScrollIndicator={false} >
        <S.content>

          <S.title>DADOS INICIAIS</S.title>
          <Selection label='Selecione um evento' itemSelected={h => setEvento(h)} itens={eventos} />

          <Selection placeholder='Selecione uma espécie' label=' Espécie' itens={especies} itemSelected={h => setEspecie(h)} />

          <FormInput
            name='Raca'
            control={control}
            label='Raça'
            placeholder='Insira a categoria do lote. Ex: Nelore'
            error={errors.Raca}
          />

          <Selection label='Categoria' itens={categoryLotes} itemSelected={h => setCategoria(h)} />
          <Selection label='Sexo' itens={sexos} itemSelected={h => setSexo(h)} />

          <FormInput
            label='Quantidade'
            name='Quantidade'
            placeholder='Cabeça de gados'
            control={control}
            error={errors.Quantidade}

          />

          <Selection label='Tempo de Vida' placeholder='Selecione um item' itens={tempoVidas} itemSelected={h => setTempoVida(h)} />

          <S.line />

          <S.title>TIPO DE OFERTA</S.title>
          <RadioGrup setItem={h => onChangeOferta(h)} radios={ofertas} alin='column' />

          {oferta === '0' && (
            <FormInput control={control} name='ValorPorQuilo' label='Valor por Quilo (kg)' placeholder='Digite o valor por kg' error={errors.ValorPorQuilo} />
          )}

          {oferta === '1' && (
            <>
              <FormInput mask='currency' keyboardType='numeric' control={control} name='ValorPorQuilo' label='Valor por Quilo (kg)' placeholder='Digite o valor por kg' error={errors.ValorPorQuilo} />
              <FormInput keyboardType='numeric' control={control} name='PesoMedio' label='Peso Médio Animal' placeholder='Digite o peso médio do anima' error={errors.PesoMedio} />
              <FormInput mask='currency' keyboardType='numeric' control={control} name='ValorPorAnimal' label='Valor por Animal' placeholder='Digite o valor do animal R$' error={errors.ValorPorAnimal} />
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

          <Selection label='Tempo de Venda' itens={tempoVidas} itemSelected={h => setTempoVida(h)} />


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
            {/* <S.boxMidia onPress={pickVideo} >
              <FontAwesome name='video-camera' size={20} />
              <S.title>VÍDEO</S.title>
            </S.boxMidia> */}
            {baseVideo && (
              <S.title>Video adicionado: {baseVideo}</S.title>
            )}

            <S.boxMidia onPress={pickImage} >
              <Ionicons name='camera' size={24} />
              <S.title>FOTOS</S.title>
            </S.boxMidia>

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
              <S.title style={{ fontSize: _text - 3 }} >R$ {vlAnimal.toLocaleString('pt-BR')}</S.title>
            </S.row>

            <S.line />
            <S.row>
              <S.title style={{ fontSize: _text - 3 }} >Valor total do lote</S.title>
              <S.title style={{ fontSize: _text - 3 }} >R$ {vlTotal.toLocaleString('pt-BR')}</S.title>
            </S.row>

            <S.row>
              <S.title style={{ fontSize: _text - 3 }} >Comissão a Pagar</S.title>
              <S.title style={{ fontSize: _text - 3 }} >{getComissao.data?.porcentagem}%</S.title>
            </S.row>
          </Box>

          <S.row>
            <S.title style={{ color: '#252525', fontSize: _text }} >Valor a Receber</S.title>
            <S.title style={{ color: color.focus.regular, fontSize: _text }} >R$ {vlTotal.toLocaleString('pt-BR')}</S.title>
          </S.row>


          <Button load={registerLote.isLoading} onPress={handleSubmit(submit)} title='CADASTRAR LOTE' styleType='dark' />
        </S.content>

      </ScrollView>

    </S.Container>
  )
}