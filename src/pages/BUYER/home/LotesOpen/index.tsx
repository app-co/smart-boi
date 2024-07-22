import { FilterSvg } from '@/assets/svg/lotes/filter'
import { Loading } from '@/components/Loading'
import { Lotes } from '@/components/Lotes'
import { useAuth } from '@/contexts/auth'
import { ILotes } from '@/hooks/fetchs/interfaces'
import { useLotes } from '@/hooks/mutations'
import { color } from '@/styles/color'
import { Feather } from '@expo/vector-icons'
import { Circle, HStack } from 'native-base'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import * as S from './styles'

export default function LotesOpen() {
  const { mutateAsync, isLoading } = useLotes()
  const [lotes, setLotes] = React.useState<ILotes[]>([])
  const { user } = useAuth()

  const getLotes = React.useCallback(async () => {
    const data = await mutateAsync({ statusLote: 5, pageNumber: 0, pageSize: 15, usuarioId: user?.usuarioId })
    setLotes(data)
  }, [])

  React.useEffect(() => {
    getLotes()
  }, [])

  if (isLoading) {
    return <Loading />
  }

  return (
    <S.Container>
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
        keyExtractor={h => h.loteId}
      />
    </S.Container>
  )
}