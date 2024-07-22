import { Home } from '@/pages/BUYER/home'
import { Arrematar } from '@/pages/BUYER/home/Arrematar'
import { CadastroLote } from '@/pages/BUYER/home/CadastroLote'
import LotesVendedor from '@/pages/BUYER/home/lotes-vendedor'
import { Lances } from '@/pages/BUYER/Lances'
import Lotes from '@/pages/communs/Lotes'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const { Navigator, Screen } = createNativeStackNavigator()

export function StaksRoutes() {

  return (
    <Navigator
      initialRouteName='home'
    >
      <Screen name="home" component={Home} />
      <Screen name="lotes-vendedor" component={LotesVendedor} />
      <Screen name="lotes" component={Lotes} />
      <Screen name="oferta" component={Arrematar} />
      <Screen name="lotes-lances" component={Lances} options={{ title: 'Meu Histórico de Lances' }} />
      {/* <Screen name="lote-cadastro" component={CadastroLote} /> */}
      <Screen name="lote-cadastro" component={CadastroLote} options={{ title: 'Meu Histórico de Lances' }} />


      <Screen
        name="lances"
        component={Lances}
        options={{
          title: 'Meu Hitórico de Lances',
        }}
      />
    </Navigator>
  )
} 