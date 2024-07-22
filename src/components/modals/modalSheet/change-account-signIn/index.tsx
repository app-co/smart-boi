import { Box, HStack, Image, useToast } from 'native-base';
import React from 'react';
import * as S from './styles';

import { Button } from '@/components/forms/Button';
import { FormInput } from '@/components/forms/FormInput';
import { useAuth } from '@/contexts/auth';
import { LoginFormValues } from '@/interfaces';
import CreateValidationSchemas from '@/schemas';
import { Ionicons } from '@expo/vector-icons';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { TouchableOpacity } from 'react-native';
import { Modalize } from 'react-native-modalize';
import gavel from './assets/gavel.png';
import picture from './assets/picture.png';

interface I {
  modalizeRef: React.Ref<Modalize>;
}

type TTypeAccount = 'vendedor' | 'comprador' | null

export function ChangeAccountSignIn({ modalizeRef }: I) {
  const { navigate } = useNavigation()
  const { user } = useAuth()
  const [typeAccount, setTypeAccount] = React.useState<TTypeAccount>(null)
  const { LoginValidationSchema } = CreateValidationSchemas()
  const toast = useToast()

  const control = useForm<LoginFormValues>({
    resolver: yupResolver(LoginValidationSchema)
  })

  // TODO Ivalidar comprador ou vendedor caso possuir conta

  return (
    <Modalize adjustToContentHeight ref={modalizeRef} >
      <S.container>
        <S.body>
          {typeAccount ? (

            <S.content>
              <TouchableOpacity style={{ width: 100 }} onPress={() => setTypeAccount(null)} >
                <Ionicons name='arrow-back' size={35} />
              </TouchableOpacity>
              <Box mt={8} style={{ gap: 20 }} >
                <FormInput name='email' label='E-mail' placeholder='exemplo@exemplo.com' control={control.control} error={control.formState.errors.email} />
                <FormInput name='senha' label='Senha' placeholder='sua senha' control={control.control} error={control.formState.errors.senha} />
                <Button onPress={control.handleSubmit(handleSignIn)} title='ENTRAR' />

              </Box>

            </S.content>
          ) : (
            <Box>
              <S.title>Como quer se cadastrar</S.title>
              {/* <S.text>Depois você poderá alterar a conta</S.text> */}

              <HStack mt={4} justifyContent={'space-between'} >
                <S.button onPress={() => navigate('registerSaler')} style={{
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,

                  elevation: 5,
                }}
                >
                  <S.box selected={typeAccount === 'vendedor'} >
                    <Image alt='ico' source={gavel} />
                    <S.text selected={typeAccount === 'vendedor'} style={{ marginTop: 10 }} >Vendedor</S.text>

                  </S.box>
                </S.button>
                <S.button onPress={() => navigate('registerBuyer')} style={{
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,

                  elevation: 5,
                }}
                >
                  <S.box selected={typeAccount === 'comprador'} >
                    <Image alt='ico' source={picture} />
                    <S.text selected={typeAccount === 'comprador'} style={{ marginTop: 10 }} >Comprador</S.text>
                  </S.box>
                </S.button>

              </HStack>
            </Box>

          )}


        </S.body>

      </S.container>
    </Modalize>
  )
}