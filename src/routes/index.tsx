import React from 'react';
import { ActivityIndicator, View } from 'react-native';

import { useAuth } from '@/contexts/auth';
import { BuyerRoute } from './BuyerRoutes';
import AuthRoutes from './auth/auth.routes';

const Routes: React.FC = () => {
  const { signed, loading, route = 1 } = useAuth();


  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#999" />
      </View>
    );
  }

  if (signed) {
    const r = 1
    switch (r) {
      case 1:
        return <BuyerRoute />;

    }
  }

  return <AuthRoutes />;
};

export default Routes;
