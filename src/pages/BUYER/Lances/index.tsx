import { UseFatch } from '@/hooks/fetchs'
import React from 'react'
import MyLotes from './components/MyLotes'
import * as S from './styles'

const fetch = new UseFatch()

export function Lances() {

  // const {} = useQuery({
  //   queryKey: 'mylances',
  //   queryFn: async () => fetch.getla
  // })
  return (
    <S.Container>
      <MyLotes />
    </S.Container>
  )
}