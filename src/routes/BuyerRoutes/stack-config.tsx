import { Configs } from '@/pages/BUYER/Configs'
import { UpdateUser } from '@/pages/BUYER/Configs/Settings/UpdateUser'
import { Arrematar } from '@/pages/BUYER/home/Arrematar'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const { Navigator, Screen } = createNativeStackNavigator()

export function StackConfig() {

  return (
    <Navigator
      initialRouteName='configs'
    >
      <Screen
        name="configs"
        component={Configs}
        options={{
          title: 'Configurações',
        }}
      />
      <Screen name="profile" component={UpdateUser} />
      <Screen name="arrematar" component={Arrematar} />
    </Navigator>
  )
} 