import { Loading } from '@/components/Loading'
import { Selection } from '@/components/forms/Selection'
import { UseFatch } from '@/hooks/fetchs'
import { ICotacao } from '@/hooks/fetchs/interfaces'
import { useGetAllContacao } from '@/hooks/mutations'
import { hightPercent } from '@/styles/sizes'
import { enumCategoriaLote } from '@/utils/enuns'
import axios from 'axios'
import { Box, HStack } from 'native-base'
import React from 'react'
import { FlatList } from 'react-native'
import { useQuery } from 'react-query'
import { Lotes } from './components/Lotes'
import * as S from './styles'


const fetch = new UseFatch()

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

export function Contacao() {
  const mutationCotacao = useGetAllContacao()
  const [selectedUF, setSelectedUf] = React.useState('')
  const [selectedCategory, setSelectedCategory] = React.useState('')
  const [getAllCotacao, setGetAllCotacao] = React.useState<ICotacao[]>([])

  const stados = useQuery({
    queryKey: ['stados'],
    queryFn: async () => await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(h => h.data)
  })


  async function paginationCotacao() {
    const cota = await mutationCotacao.mutateAsync({
      Estado: selectedUF,
      TipoGado: selectedCategory,
      pageNumber: 1,
      pageSize: 2
    })

    setGetAllCotacao(cota)
  }

  React.useEffect(() => {
    paginationCotacao()
  }, [selectedUF, selectedCategory])


  if (stados.isLoading) {
    return <Loading />
  }

  const estadsUf = stados.data as { sigla: string; nome: string }[]

  const uf = estadsUf.map(h => {
    return { value: h.sigla, label: h.nome }
  }).sort((a, b) => {
    return a.label.localeCompare(b.label)
  })



  return (
    <S.Container>

      <HStack width={'full'} mt={4} mb={hightPercent('8')} space={2} >
        <Box flex={1} >
          <Selection placeholder='SELECIONE' label='Estado' itemSelected={h => setSelectedUf(h)} itens={uf} />
        </Box>

        <Box flex={1} >
          <Selection placeholder='SELECIONE' label='Categoria' itemSelected={h => setSelectedCategory(h)} itens={enumCategoriaLote({ type: 'enum' }) as unknown as { label: string, value: string }[]} />
        </Box>
      </HStack>

      {mutationCotacao.isLoading ? (
        <Loading />
      ) : (
        <Box>

          <FlatList
            data={getAllCotacao}
            keyExtractor={h => h.cotacaoBoiId}
            renderItem={({ item }) => (
              <Lotes item={item} />
            )}
          />
        </Box>

      )}

    </S.Container>
  )
}