import { FilterSvg } from '@/assets/svg/lotes/filter'
import { Filter } from '@/components/Filter'
import { Loading } from '@/components/Loading'
import { Lotes } from '@/components/Lotes'
import { useGetLotes } from '@/hooks/queries'
import { color } from '@/styles/color'
import { enumSexo } from '@/utils/enuns'
import { Feather } from '@expo/vector-icons'
import { format } from 'date-fns'
import { Center, Circle, HStack } from 'native-base'
import React from 'react'
import { FlatList, RefreshControl, TouchableOpacity } from 'react-native'
import * as S from './styles'

export default function LotesClosed() {
  const { data, isLoading, refetch } = useGetLotes({
    statusLote: 4,
  })

  const [openSwet, setOpenSwet] = React.useState<boolean>(false)

  const lote = data && data.length ? data : []

  const lotes = React.useMemo(() => {
    return lote.map(h => {
      const dt = {
        data: format(new Date(h.dataCriacao), 'dd/MM/yy'),
        descricao: `${h.quantidade} ${h.sexo} ${h.raca}`,
        localizacao: `${h.distanciaMunicipio} km - ${h.cidade} - ${h.uf}`,
        oferta: h.qtdOfertas,
        status: h.statusLote,
        qntPeso: h.quantidade.toString(),
        tempoDeVida: h.tempoDeVenda,
        sexo: enumSexo({ type: 'formated', value: h.sexo }) as string,
        img: h.urlImagens,
        id: h.loteId
      }
      return dt
    })
  }, [lote])


  if (isLoading) {
    return <Loading />
  }

  return (
    <S.Container>
      <Filter onClose={h => setOpenSwet(h)} isOpen={openSwet} setCity={h => console.log(h)} setStatus={h => console.log(h)} setUf={h => console.log(h)} />

      <HStack mb={8} alignItems={'center'} space={3} w={'full'} >
        <S.boxInput>
          <Feather name='search' size={20} />
          <S.input placeholder='Buscar' />
        </S.boxInput>

        <TouchableOpacity>
          <Circle size={'35px'} bg={color.text_color.global} >
            <FilterSvg />
          </Circle>

        </TouchableOpacity>
      </HStack>
      <FlatList
        contentContainerStyle={{ gap: 15 }}
        data={lotes}
        renderItem={({ item }) => <Lotes item={item} />}
        keyExtractor={h => h.id}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => {
              refetch()
            }}
          />
        }
        ListEmptyComponent={
          <Center flex={1} >
            <S.title>Não há lotes registrados.</S.title>
          </Center>
        }
      />
    </S.Container>
  )
}