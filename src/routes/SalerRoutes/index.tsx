
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Dimensions, Platform } from 'react-native';
import * as Animatable from 'react-native-animatable';

import { useAuth } from '@/contexts/auth';
import { Home } from '@/pages/SALER/home';

const Tab = createBottomTabNavigator();

export function SalerRoutes() {
  const { setRoute } = useAuth();

  const getTabBarIconColor = (focused: boolean) => {
    const focusedColor = '#fff';
    const nonFocusedColor = '#232326';

    return focused ? focusedColor : nonFocusedColor;
  };

  const width = Dimensions.get('screen').width;

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: Platform.OS === 'ios' ? 85 : 55,
          backgroundColor: '#0DA681',
        },
        tabBarItemStyle: {
          paddingTop: 5,
          paddingBottom: 5,
          flexDirection: 'column',
          justifyContent: 'center',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        listeners={() => ({
          tabPress: e => {
            e.preventDefault();
            setRoute(1);
          },
        })}
        options={{
          tabBarLabel: ({ focused }) => (
            <Animatable.Text
              animation="fadeInUpBig"
              delay={250}
              style={{
                color: focused ? '#fff' : '#232326',
                fontSize: 10,
              }}
            >
              Voltar
            </Animatable.Text>
          ),
          tabBarIcon: ({ size, focused }) =>
            <Ionicons
              name="return-down-back"
              size={size}
              color={getTabBarIconColor(focused)}
            />
        }}
      />
    </Tab.Navigator>
  );
}

