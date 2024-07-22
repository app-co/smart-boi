import { Lotes } from '@/components/Lotes'
import { useAuth } from '@/contexts/auth'
import { useGetLanceEnviado } from '@/hooks/queries'
import { format } from 'date-fns'
import { Center } from 'native-base'
import React from 'react'
import { FlatList } from 'react-native-gesture-handler'
import * as S from './styles'

export default function MyLotes() {
  const { user } = useAuth()
  const { data } = useGetLanceEnviado({
    UsuarioId: user!.usuarioId
  })

  const lotes = React.useMemo(() => {
    return data && data.length > 0
      ? data.map(h => {
        const dt = {
          data: format(new Date(h.dataLance), 'dd/MM/yy'),
          descricao: h.descLote,
          localizacao: h.endereco,
          oferta: null,
          status: h.statusLote,
          qntPeso: `${h.qtdCabeca} | ${h.qtdPeso} kg`,
          tempoDeVida: h.idade,
          sexo: h.sexo,
          img: [{ id: '23', urlImagem: h.urlImagem }],
          id: h.idLance
        }

        return dt
      })
      : []


  }, [data])

  console.log({ data })
  return (
    <S.Container>

      {data?.length === 0 ? (
        <Center flex={1} >
          <S.title>Não há lances enviados.</S.title>
        </Center>
      ) : (
        <FlatList
          contentContainerStyle={{ gap: 15 }}
          data={lotes}
          renderItem={({ item }) => <Lotes type='lance' item={item} />}
          keyExtractor={h => h.id}
          ListEmptyComponent={
            <Center flex={1} >
              <S.title>Nenhum lançamento encontrado.</S.title>
            </Center>
          }
        />

      )}

    </S.Container>
  )
}