import { Loading } from "@/components/Loading";
import { useVideo } from "@/contexts/video";
import { UseFatch } from "@/hooks/fetchs";
import { ILotesById } from "@/hooks/fetchs/interfaces";
import { _text, hightPercent, widtPercent } from "@/styles/sizes";
import { getTokenUrl } from "@/utils/getTokenUrl";
import { Box, Image } from "native-base";
import React, { memo, useRef } from "react";
import { FlatList } from "react-native-gesture-handler";
import YoutubeIframe from "react-native-youtube-iframe";
import * as S from './styles';

const fetch = new UseFatch()

interface I {
  data: ILotesById
  indexR: number
  setIsready: (h: boolean) => void
}


export function Details({ data, setIsready, indexR = 0 }: I) {
  const ref = useRef<FlatList>(null);
  const [index, setIndex] = React.useState<number>(0)
  const [off, setOff] = React.useState(0)
  const { isReady } = useVideo()


  const handleScrollImage = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    setOff(offsetX)
    const newIndex = Math.round(offsetX / hightPercent('100'));
    setIndex(newIndex);
  };

  const zindex = indexR === 0 ? 10 : 0
  const url = data.urlVideo ?? ''

  const videoId = getTokenUrl(url)



  return (
    <Box height={200} >
      {isReady ? (
        <Box position='fixed' zIndex={zindex} >
          <YoutubeIframe
            onReady={() => setIsready(true)}
            play={false}
            videoId={videoId}
            height={200}
          />
        </Box>

      ) : (
        <Loading />
      )}

      <Box position={'fixed'} zIndex={5} top={-200} >
        <FlatList
          ref={ref}
          horizontal={true}
          data={data?.urlImagens}
          keyExtractor={(item) => item.id}
          onScroll={handleScrollImage}
          renderItem={({ item: h }) => (
            <Image bg={'gray.300'} h={'200px'} resizeMode="cover" w={hightPercent('50')} alt='imagens' source={{ uri: h.urlImagem }} />
          )}
        />

        <S.title
          style={{ position: 'absolute', top: hightPercent('20'), left: widtPercent('50'), fontSize: _text, color: '#fff', fontFamily: 'black' }}
        >{index + 1}/{data?.urlImagens.length}</S.title>
      </Box>


    </Box>
  );
}

export const HeaderDetails = memo(Details)