import { Header } from '@/components/Header'
import { Contacao } from '@/pages/communs/Contacao'
import { Historico } from '@/pages/communs/Contacao/Historico'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const { Navigator, Screen } = createNativeStackNavigator()

export function StackRouterCotacao() {

  return (
    <Navigator
      initialRouteName='cotacao'
    >

      <Screen
        options={{
          header: (props) => <Header {...props} />,
          title: 'Cotação do Boi',
        }}
        name="cotacao" component={Contacao}
      />
      <Screen
        options={{
          header: (props) => <Header {...props} />,
          title: 'Histórico',
        }}
        name="historico" component={Historico}
      />
    </Navigator>
  )
} 