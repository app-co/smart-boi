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


import { color } from '@/styles/color';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Box } from 'native-base';
import * as Animatable from 'react-native-animatable';
import { Modalize } from 'react-native-modalize';
import LotesClosed from './LotesClosed';
import LotesOpen from './LotesOpen';
import * as S from './styles';

export default function LotesVendedor() {
  const modalizeRef = useRef<Modalize>(null);
  const [openSheet, setOpenSheet] = React.useState(false)
  const nav = useNavigation()

  const [activeTab, setActiveTab] = useState('lotesOpen');

  const routes = useMemo(
    () => [
      { key: 'lotesOpen', title: 'Abertos' },
      { key: 'lotesClosed', title: 'Encerrados' },
    ],
    []
  );

  const LoginRoute = () => (
    <LotesOpen />
  );

  const LotesCloseds = () => (
    <LotesClosed />
  );

  const renderScene = SceneMap({
    lotesOpen: LoginRoute,
    lotesClosed: LotesCloseds,
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
          <Box bg={focused ? '#1F2937' : '#fff'} rounded={16} >
            <S.title
              style={{
                width: 120,
                textAlign: 'center',
                fontFamily: focused ? 'bold' : 'trin',
                color: focused ? '#fff' : '#7B7B7B',
                padding: 8, // Ajuste o padding conforme necessário
                borderRadius: 15, // Ajuste o borderRadius conforme necessário
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

  function openModal(enent: any) {
    enent.persist()
    modalizeRef.current?.open()
  }

  return (
    <S.Container>
      <S.button onPress={() => nav.navigate('cadastroLote')} >
        <Feather name='plus' color={'#fff'} size={35} />
      </S.button>

      <Animatable.View
        animation="fadeInLeft"
        delay={300}
        style={styles.containerForm}
      >
        <TabView
          navigationState={{ index: activeTab === 'lotesOpen' ? 0 : 1, routes }}
          renderScene={renderScene}
          renderTabBar={renderTabBar}
          style={{ gap: 10 }}
          onIndexChange={index =>
            setActiveTab(index === 0 ? 'lotesOpen' : 'lotesClosed')
          }
          initialLayout={{ width: 100 }}
        />
        {/* <Text>{buildVersion}</Text> */}
      </Animatable.View>
    </S.Container>
  );
}

const styles = StyleSheet.create({

  containerForm: {
    backgroundColor: '#fff',
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 10
  },

});
