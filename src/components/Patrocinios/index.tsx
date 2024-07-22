import { IParceiros } from '@/hooks/fetchs/interfaces';
import { Box, Circle, Image } from 'native-base';
import React, { useRef } from 'react';
import { Dimensions, FlatList } from 'react-native';
import * as S from './styles';

const { width } = Dimensions.get('window');


interface I {
  parceiro: IParceiros[]
}

export function Patrocinios({ parceiro = [] }: I) {
  // const [currentIndex, setCurrentIndex] = useState(0);
  const ref = useRef<FlatList>(null);
  const dot = Array.from({ length: parceiro.length })

  const { width } = Dimensions.get('screen');

  const [index, setIndex] = React.useState<number>(0);

  const handleScroll = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offsetX / (width));
    // setIndex(newIndex);
  };


  React.useEffect(() => {
    if (parceiro && parceiro.length > 0) {
      ref.current?.scrollToIndex({
        animated: true,
        index,
      });
    }
  }, [index]);

  function currecel() {
    setTimeout(() => {
      if (index === parceiro.length - 1) {
        setIndex(0);
        return;
      }
      setIndex(index + 1);
    }, 4000);
  }

  React.useEffect(() => {
    currecel();
  }, [index]);

  const renderItem = ({ item }: { item: IParceiros }) => (
    <S.box>
      <Image w={'full'} h={'full'} resizeMode='center' alt='img' source={{ uri: item.urlImagem }} />
    </S.box>
  );

  return (
    <S.Container>
      <FlatList
        ref={ref}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          gap: 10,
          paddingHorizontal: 10,
        }}
        data={parceiro}
        onScroll={handleScroll}
        // initialScrollIndex={0}
        keyExtractor={(h, i) => String(i)}
        renderItem={renderItem}
      />

      <Box justifyContent="center" alignItems="center" mt={4}>
        <FlatList
          contentContainerStyle={{
            gap: 7,
            alignSelf: 'center',
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={dot}
          initialScrollIndex={0}
          keyExtractor={(h, i) => String(i)}
          renderItem={({ item: h, index: i }) => (
            <Circle size="10px" bg={i === index ? 'gray.700' : '#6666666d'} />
          )}
        />
      </Box>
    </S.Container>
  )
}

