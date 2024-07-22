
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import { MyTabBar } from '@/components/tabBarComponent';
import { useAuth } from '@/contexts/auth';
import { StackConfig } from './stack-config';
import { StackRouter } from './stack-home';
import { StackLances } from './stack-lances';
import { StackRouterCotacao } from './stack-routes-cotacao';

const Tab = createBottomTabNavigator();

export function BuyerRoute() {
  const { setRoute } = useAuth();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBar={(props) => <MyTabBar {...props} />}
      screenOptions={{
        headerShown: false,

      }}
    >
      <Tab.Screen
        name="Home"
        component={StackRouter}
        options={{
          title: 'Home',
        }}
      />
      <Tab.Screen
        name="Cotacao"
        component={StackRouterCotacao}
        options={{
          title: 'COTAÇÃO',
        }}
      />

      <Tab.Screen
        name="Lance"
        component={StackLances}
        options={{
          title: 'MEUS LANCES',
        }}
      />

      <Tab.Screen
        name="Config"
        component={StackConfig}
      />

    </Tab.Navigator>
  );
}

