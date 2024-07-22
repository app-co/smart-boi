import { WhtasAppSvg } from '@/assets/svg/home/watts-app'
import { Carrocel } from '@/components/Carrocel'
import { Loading } from '@/components/Loading'
import { Patrocinios } from '@/components/Patrocinios'
import { Button } from '@/components/forms/Button'
import { useAuth } from '@/contexts/auth'
import { UseFatch } from '@/hooks/fetchs'
import { ILotes, IParceiros } from '@/hooks/fetchs/interfaces'
import { useLotes, useParceiros } from '@/hooks/mutations'
import { hightPercent } from '@/styles/sizes'
import { useNavigation } from '@react-navigation/native'
import * as Linking from 'expo-linking'
import { Box } from 'native-base'
import React from 'react'
import { FlatList, RefreshControl, ScrollView } from 'react-native'
import YouTube from 'react-native-youtube-iframe'
import { Acess } from './access'
import * as S from './styles'


const fetch = new UseFatch()
export function Home() {
  const { user } = useAuth()
  const { navigate } = useNavigation()
  const [parceiros, setParceiros] = React.useState<IParceiros[]>([])
  const [currencyLotes, setCurrencyLotes] = React.useState<ILotes[]>([])
  const [lotesFechados, setLotesFechados] = React.useState<ILotes[]>([])
  const url = user!.urlVideoHome

  // Usar regex para extrair o ID
  const regex = /(?<=\.be\/)[^?]+/;
  const match = url.match(regex);
  const videoId = match ? match[0] : null;

  const parc = useParceiros()
  const Lotes = useLotes()

  const getParceiros = React.useCallback(async () => {
    const data = await parc.mutateAsync({ pageNumber: 0, pageSize: 15 })

    setParceiros(data)
  }, [])

  const getLot = React.useCallback(async () => {
    const data = await Lotes.mutateAsync({ statusLote: 5, pageNumber: 0, pageSize: 15 })
    const fechado = await Lotes.mutateAsync({ statusLote: 4, pageNumber: 0, pageSize: 15 })

    setCurrencyLotes(data)
    setLotesFechados(fechado)
  }, [])

  React.useEffect(() => {
    getParceiros()
    getLot()

    return () => { console.log('clean') }
  }, [])

  const info = React.useMemo(() => {
    let inf = ''

    if (user?.tipoAcesso?.length === 1) return inf = ''
    if (user?.tipoAcesso?.length > 1) return inf = 'Comprador e Vendedor'

    if (user?.tipoAcesso.find(h => h.codTipoAcesso === 0)?.codTipoAcesso === 0) return inf = 'Vendedor'
    if (user?.tipoAcesso.find(h => h.codTipoAcesso === 1)?.codTipoAcesso === 1) return inf = 'Comprador'

    return inf

  }, [])

  if (parc.isLoading) {
    return <Loading />
  }

  const telHelp = process.env.EXPO_WHTASAPP


  return (
    <S.container>

      <S.boxVideo>
        <YouTube
          height={hightPercent('30')}
          play={false}
          videoId={videoId!}
        />
      </S.boxVideo>
      <S.body>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: 10, paddingBottom: 50 }}
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={() => {
                getParceiros()
                getLot()
              }}
            />
          }
        >
          <Acess />
          <Box style={{ gap: 5 }} my={5}>
            <S.title>Parceiros</S.title>
            <Patrocinios parceiro={parceiros ?? []} />
          </Box>

          <Box  >
            <S.title style={{ marginVertical: 8 }} >Lotes Em andamento</S.title>
            <FlatList
              contentContainerStyle={{ gap: 20, paddingHorizontal: 10 }}
              horizontal={true}
              data={currencyLotes}
              keyExtractor={h => String(h)}
              renderItem={({ item }) => (
                <Carrocel variation='andamento' item={item} />
              )}
            />
          </Box>

          <Box my={8} style={{ gap: 10 }} >
            <S.title>Lotes Encerrados</S.title>
            <FlatList
              contentContainerStyle={{ gap: 20, paddingHorizontal: 10 }}
              horizontal={true}
              data={lotesFechados}
              keyExtractor={h => h.loteId}
              renderItem={({ item }) => (
                <Carrocel variation='encerrado' item={item} />
              )}
            />
          </Box>
          <Button icon={<WhtasAppSvg />} onPress={() => Linking.openURL(`https://wa.me/55${telHelp}`)} styleType='border' title='Alguma dúvida? Fale conosco' />

        </ScrollView>
      </S.body>

    </S.container>
  )
}