import { Arrematar } from '@/pages/BUYER/home/Arrematar'
import { Lances } from '@/pages/BUYER/Lances'
import Lotes from '@/pages/communs/Lotes'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const { Navigator, Screen } = createNativeStackNavigator()

export function StackLances() {

  return (
    <Navigator
      initialRouteName='lances'
    >
      <Screen
        name="lances"
        component={Lances}
        options={{
          title: 'Meu Hitórico de Lances',
        }}
      />
      <Screen name="lotes" component={Lotes} />
      <Screen name="arrematar" component={Arrematar} />
    </Navigator>
  )
} 