import { Loading } from '@/components/Loading'
import { ICotacao } from '@/hooks/fetchs/interfaces'
import { useGetAllContacao } from '@/hooks/mutations'
import { useRoute } from '@react-navigation/native'
import { Box } from 'native-base'
import React from 'react'
import { FlatList } from 'react-native'
import { Lotes } from '../components/Lotes'
import * as S from './styles'

export function Historico() {
  const { uf, tipoGado } = useRoute().params as { uf: string, tipoGado: string }
  const [cotacao, setCotacao] = React.useState<ICotacao[]>([])
  const { mutateAsync, isLoading } = useGetAllContacao()

  async function paginationCotacao() {
    const cota = await mutateAsync({
      Estado: uf,
      TipoGado: tipoGado,
      pageNumber: 1,
      pageSize: 2
    })

    setCotacao(cota)
  }

  React.useEffect(() => {
    paginationCotacao()
  }, [uf])


  if (isLoading) {
    return <Loading />
  }

  return (
    <S.Container>
      {isLoading ? (
        <Loading />
      ) : (
        <Box>

          <FlatList
            data={cotacao}
            keyExtractor={h => h.cotacaoBoiId}
            renderItem={({ item: h }) => (
              <Lotes item={h} />
            )}
          />
        </Box>

      )}
    </S.Container>
  )
}