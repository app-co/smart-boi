import { Header } from '@/components/Header'
import { CasdastroPropriedadeRural } from '@/components/templates/cadastro-propriedade-rural'
import { RegisterBuyerTemplate } from '@/components/templates/registerBuyerTemplate'
import { RegisterSalerTemplate } from '@/components/templates/registerSalerTemplate'
import { Home } from '@/pages/BUYER/home'
import { Arrematar } from '@/pages/BUYER/home/Arrematar'
import { CadastroLote } from '@/pages/BUYER/home/CadastroLote'
import LotesOpen from '@/pages/BUYER/home/LotesOpen'
import { MyLotes } from '@/pages/BUYER/home/MyLotes'
import { Oferta } from '@/pages/BUYER/home/Oferta'
import { Lannces } from '@/pages/BUYER/home/lotes-vendedor/Lannces'
import Detalhes from '@/pages/communs/Detalhes'
import Lotes from '@/pages/communs/Lotes'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const { Navigator, Screen } = createNativeStackNavigator()

export function StackRouter() {

  return (
    <Navigator
      initialRouteName='home'
      screenOptions={{
        header: (props) => <Header {...props} />
      }}
    >
      <Screen
        name="home"
        component={Home}
        options={{
          headerShown: false
        }}
      />
      <Screen options={{
        title: 'Lotes'
      }} name="lotes" component={Lotes} />
      <Screen options={{
        headerShown: false
      }} name="detalhes" component={Detalhes} />
      <Screen name="ofertar" component={Oferta} />
      <Screen name="Arrematar" component={Arrematar} />
      <Screen name="registerBuyer" component={RegisterBuyerTemplate} />
      <Screen name="registerSaler" component={RegisterSalerTemplate} />
      <Screen name="cadastroLote" component={CadastroLote} />
      <Screen name="cadastroPropriedade" component={CasdastroPropriedadeRural} />
      <Screen name="myLotes" component={MyLotes} />
      <Screen name="lotesOpen" component={LotesOpen} />
      <Screen name="lancesRecebidos" component={Lannces} />

    </Navigator>
  )
} 