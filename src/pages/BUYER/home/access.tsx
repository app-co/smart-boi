import { useAuth } from '@/contexts/auth'
import { color } from '@/styles/color'
import { _text } from '@/styles/sizes'
import { useNavigation } from '@react-navigation/native'
import { Box, HStack } from 'native-base'
import * as S from './styles'
export function Acess() {
  const { user } = useAuth()
  const { navigate } = useNavigation()

  const accessComum = user?.tipoAcesso.find(h => h.codTipoAcesso === 4)?.codTipoAcesso === 4 && user.tipoAcesso.length === 1
  const accessVendedor = user?.tipoAcesso.find(h => h.codTipoAcesso === 0)?.codTipoAcesso === 0
  const accessComprador = user?.tipoAcesso.find(h => h.codTipoAcesso === 1)?.codTipoAcesso === 1

  return (
    <>
      {accessComum && (
        <HStack mt={2} space={2} >

          <S.bigBottom onPress={() => navigate('registerBuyer')} cor={color.focus.regular} >
            <S.title style={{ color: '#fff', width: 100, textAlign: 'center', fontSize: _text - 3 }} >Registrar como Comprador</S.title>
          </S.bigBottom>

          <S.bigBottom onPress={() => navigate('registerSaler')} cor={color.alert} >
            <S.title style={{ color: '#fff', textAlign: 'center', fontSize: _text - 3, width: 100 }} >Registrar como Vendedor</S.title>
          </S.bigBottom>
        </HStack>
      )}

      {accessVendedor && !accessComprador && (
        <Box>
          <S.title style={{ marginTop: 10 }} >Informações de Comprador</S.title>

          <HStack mt={2} space={2} >
            <S.bigBottom onPress={() => navigate('registerBuyer')} cor={color.focus.regular} >
              <S.title style={{ color: '#fff', fontSize: _text - 2 }} >Registrar como Comprador</S.title>
            </S.bigBottom>
          </HStack>
        </Box>
      )}

      {accessVendedor && (
        <Box>
          <S.title style={{ marginTop: 10 }} >Informações de Vendedor</S.title>
          <HStack mt={2} space={2} >
            <S.bigBottom onPress={() => navigate('myLotes')} cor={color.focus.regular} >
              <S.title style={{ color: '#fff', width: 100, textAlign: 'center', fontSize: _text - 2 }} >Meus Lotes</S.title>
            </S.bigBottom>

            <S.bigBottom onPress={() => navigate('lotesOpen')} cor={color.alert} >
              <S.title style={{ color: '#fff', textAlign: 'center', fontSize: _text - 2 }} >Lotes em Aberto</S.title>
            </S.bigBottom>
          </HStack>
        </Box>
      )}

      {accessComprador && !accessVendedor && (
        <Box >
          <S.title style={{ marginTop: 10 }} >Informações de Vendedor</S.title>

          <HStack mt={2} space={2} >
            <S.bigBottom onPress={() => navigate('registerSaler')} cor={color.alert} >
              <S.title style={{ color: '#fff', textAlign: 'center' }} >Registrar como Vendedor</S.title>
            </S.bigBottom>
          </HStack>
        </Box>
      )}

      {accessComprador && (
        <Box mt={3} >
          <S.title style={{ marginTop: 10 }} >Informações de Comprador</S.title>

          <HStack mt={2} space={2} >
            <S.bigBottom onPress={() => navigate('lotes', { status: 'opens', user: 'comprador' })} cor={color.focus.regular} >
              <S.title style={{ color: '#fff', width: 100, textAlign: 'center', fontSize: _text - 2 }} >Ver Lotes</S.title>
            </S.bigBottom>

            <S.bigBottom onPress={() => navigate('Lance')} cor={color.alert} >
              <S.title style={{ color: '#fff', textAlign: 'center', fontSize: _text - 2, width: 100 }} >Meus Lances</S.title>
            </S.bigBottom>
          </HStack>
        </Box>
      )}
    </>
  )
}