import React, { useMemo, useRef, useState } from 'react';
import {
  StyleSheet
} from 'react-native';
import {
  SceneMap,
  TabBar,
  TabBarIndicator,
  TabView
} from 'react-native-tab-view';


import { Loading } from '@/components/Loading';
import { UseFatch } from '@/hooks/fetchs';
import { ILotesById } from '@/hooks/fetchs/interfaces';
import { color } from '@/styles/color';
import { useRoute } from '@react-navigation/native';
import { Box } from 'native-base';
import * as Animatable from 'react-native-animatable';
import { Modalize } from 'react-native-modalize';
import { useQuery } from 'react-query';
import Details from './Details';
import { HeaderDetails } from './Details/header';
import OthersInfo from './OthersInfo';
import * as S from './styles';

const fetch = new UseFatch()

export default function Detathes() {
  const { loteId } = useRoute().params as { loteId: string }

  const [showPlayer, setShowPlayer] = React.useState<boolean>(false)
  const { data, isLoading } = useQuery({
    queryKey: ['lotesById'],
    queryFn: async () => fetch.getLotesById(loteId),
  })

  const modalizeRef = useRef<Modalize>(null);

  const [activeTab, setActiveTab] = useState('details');

  const routes = useMemo(
    () => [
      { key: 'details', title: 'Detalhes' },
      { key: 'otherInfo', title: 'Outras informações' },
    ],
    []
  );

  const LoginRoute = () => (
    <Details item={data as ILotesById} />
  );

  const LotesCloseds = () => (
    <OthersInfo item={data as ILotesById} />
  );

  const renderScene = SceneMap({
    details: LoginRoute,
    otherInfo: LotesCloseds,
  });

  function renderTabBar(props: any) {
    return (
      <TabBar
        {...props}
        activeColor={color.focus.regular}
        inactiveColor="#7B7B7B"
        style={{ marginTop: 25, backgroundColor: 'transparent', elevation: 0 }}
        pressColor={color.focus.regular}
        renderIndicator={renderIndicator}
        renderLabel={({ route, focused }) => (
          <Box mt={-2} bg={focused ? '#1F2937' : '#fff'} rounded={16} >
            <S.title
              style={{
                width: 150,
                textAlign: 'center',
                fontFamily: focused ? 'bold' : 'trin',
                color: focused ? '#fff' : '#696969',
                padding: 8,
                borderRadius: 15,
              }}
            >
              {route.title}
            </S.title>

          </Box>
        )}
      />
    )
  }

  const renderIndicator = (props: any) => (
    <TabBarIndicator
      {...props}
      style={{
        backgroundColor: '#ffffff0f',
      }}
    />
  );


  const index = activeTab === 'details' ? 0 : 1


  if (isLoading) {
    return <Loading />
  }

  return (
    <S.Container>

      <HeaderDetails setIsready={h => setShowPlayer(h)} indexR={index} data={data!} />


      <Animatable.View
        animation="fadeInLeft"
        delay={300}
        style={styles.containerForm}
      >
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          renderTabBar={renderTabBar}
          style={{ gap: 10 }}
          onIndexChange={index => {
            setActiveTab(index === 0 ? 'details' : 'otherInfo')
            if (index === 1) {
              setShowPlayer(false)
            }
          }
          }
          initialLayout={{ width: 100 }}
        />
      </Animatable.View>


    </S.Container>
  );
}

const styles = StyleSheet.create({

  containerForm: {
    backgroundColor: '#fff',
    flex: 1,
    padding: 10,
  },

});
