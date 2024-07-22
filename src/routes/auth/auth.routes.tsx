import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { RegisterBuyerTemplate } from '@/components/templates/registerBuyerTemplate';
import { RegisterSalerTemplate } from '@/components/templates/registerSalerTemplate';
import SignIn from '@/pages/auth/SignIn';
import { color } from '@/styles/color';

const AuthStack = createNativeStackNavigator();

const AuthRoutes: React.FC = () => {

  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="SignIn"
        component={SignIn}
        options={{
          headerShown: false,
          headerShadowVisible: false,
        }}
      />

      <AuthStack.Screen
        name="registerSaler"
        component={RegisterSalerTemplate}
        options={{
          headerShadowVisible: false,
          headerLargeTitleShadowVisible: false,
          headerTitleAlign: 'center',
          title: 'Cadastrar Vendedor',
          headerTintColor: color.text_color.global
        }}
      />

      <AuthStack.Screen
        name="registerBuyer"
        component={RegisterBuyerTemplate}
        options={{
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          title: 'Cadastrar Comprador',
          headerTintColor: color.text_color.global
        }}
      />

    </AuthStack.Navigator>
  );
};

export default AuthRoutes;
