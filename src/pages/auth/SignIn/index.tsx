import logo from '@/assets/logo.jpg';
import * as Constant from 'expo-constants';
import React, { useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
  useWindowDimensions
} from 'react-native';
import {
  SceneMap,
  TabBar,
  TabBarIndicator,
  TabView
} from 'react-native-tab-view';
import Toast from 'react-native-toast-message';

import LoginTemplate from '@/components/templates/loginTemplate';

import { RegisterTemplate } from '@/components/templates/RegisterTemplate';
import { hightPercent, widtPercent } from '@/styles/sizes';
import { Image } from 'native-base';
import * as Animatable from 'react-native-animatable';
import { Modalize } from 'react-native-modalize';

import * as mutation from '@/hooks/mutations';
import { color } from '@/styles/color';

export default function SignIn() {
  const modalizeRef = useRef<Modalize>(null);
  const [openSheet, setOpenSheet] = React.useState(false)

  const buildVersion = Constant.default.nativeAppVersion;

  const { data, isLoading } = mutation.login();

  const layout = useWindowDimensions();

  const [activeTab, setActiveTab] = useState('login');

  const routes = useMemo(
    () => [
      { key: 'login', title: 'Login' },
      { key: 'register', title: 'Cadastrar' },
    ],
    []
  );

  const LoginRoute = () => (
    <LoginTemplate />
  );

  const RegisterRoute = () => (
    <RegisterTemplate route={h => setActiveTab(h)} />
  );

  const renderScene = SceneMap({
    login: LoginRoute,
    register: RegisterRoute,
  });

  const showToast = (type: string, text1: string, text2: string) => {
    Toast.show({
      type,
      text1,
      text2,
    });
  };

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      activeColor={color.focus.regular}
      inactiveColor="#7B7B7B"
      style={{ marginTop: 25, backgroundColor: 'transparent', elevation: 0 }}
      pressColor={color.focus.regular}
      renderIndicator={renderIndicator}
    />
  );

  const renderIndicator = (props: any) => (
    <TabBarIndicator
      {...props}
      style={{
        backgroundColor: color.focus.regular,
      }}
    />
  );

  function openModal(enent: any) {
    enent.persist()
    modalizeRef.current?.open()
  }


  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="#999999" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      enabled
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      // keyboardVerticalOffset={300}
      style={[
        styles.container,
        {
          backgroundColor: ' ',
          flex: 1,
        },
      ]}
    >
      <View style={{ zIndex: 3 }}>
        <Toast />
      </View>

      <Animatable.View
        animation="fadeInLeft"
        delay={500}
        style={styles.containerHeader}
      >

        <Image mt={'50px'} w={widtPercent('100')} h={hightPercent('45')} resizeMode='cover' source={logo} alt='logo' />
      </Animatable.View>

      <Animatable.View
        animation="fadeInUp"
        delay={500}
        style={styles.containerForm}
      >
        <TabView
          navigationState={{ index: activeTab === 'login' ? 0 : 1, routes }}
          renderScene={renderScene}
          renderTabBar={renderTabBar}
          onIndexChange={index =>
            setActiveTab(index === 0 ? 'login' : 'register')
          }
          initialLayout={{ width: layout.width }}
        />
        {/* <Text>{buildVersion}</Text> */}
      </Animatable.View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerHeader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: '8%',
  },
  containerForm: {
    backgroundColor: '#fff',
    flex: 2,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20
  },
  icon: {
    overflow: 'hidden',
    borderRadius: 15,
    height: 180,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageBackground: {
    flex: 1,
    width: 300,
    height: 100,
  },
});
