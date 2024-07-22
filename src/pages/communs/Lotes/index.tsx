import * as Constant from 'expo-constants';
import React, { useMemo, useRef, useState } from 'react';
import {
  StyleSheet,
  useWindowDimensions
} from 'react-native';
import {
  SceneMap,
  TabBar,
  TabBarIndicator,
  TabView
} from 'react-native-tab-view';


import * as mutation from '@/hooks/mutations';
import { color } from '@/styles/color';
import { useRoute } from '@react-navigation/native';
import { Box } from 'native-base';
import * as Animatable from 'react-native-animatable';
import { Modalize } from 'react-native-modalize';
import LotesClosed from './LotesClosed';
import LotesOpen from './LotesOpen';
import * as S from './styles';

export default function Lotes() {
  const modalizeRef = useRef<Modalize>(null);
  const { status } = useRoute().params as { status: 'opens' | 'closeds' };

  const [openSheet, setOpenSheet] = React.useState(false)

  const buildVersion = Constant.default.nativeAppVersion;

  const { data, isLoading } = mutation.login();

  const layout = useWindowDimensions();

  const [activeTab, setActiveTab] = useState(status);

  const routes = useMemo(
    () => [
      { key: 'opens', title: 'Abertos' },
      { key: 'closeds', title: 'Encerrados' },
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
    opens: LoginRoute,
    closeds: LotesCloseds,
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


  // const renderTabBar = (props: any) => (
  //   <TabBar
  //     {...props}
  //     activeColor={color.focus.regular}
  //     contentContainerStyle={{
  //       backgroundColor: 'red',
  //       gap: 10,
  //       borderRadius: 30
  //     }}
  //     inactiveColor="#7B7B7B"
  //     style={{ marginTop: 25, gap: 10, backgroundColor: 'rgba(172, 168, 168, 0)', elevation: 0 }}
  //     pressColor={color.focus.regular}
  //     renderIndicator={renderIndicator}
  //     indicatorContainerStyle={{
  //       gap: 10
  //     }}
  //   />
  // );

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


      <Animatable.View
        animation="fadeInLeft"
        delay={300}
        style={styles.containerForm}
      >
        <TabView
          navigationState={{ index: activeTab === 'opens' ? 0 : 1, routes }}
          renderScene={renderScene}
          renderTabBar={renderTabBar}
          style={{ gap: 10 }}
          onIndexChange={index =>
            setActiveTab(index === 0 ? 'opens' : 'closeds')
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
    padding: 10
  },

});
