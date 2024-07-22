import { Button } from '@/components/forms/Button'
import { FormInput } from '@/components/forms/FormInput'
import { Selection } from '@/components/forms/Selection'
import { TRegisterUser } from '@/interfaces'
import { schemaRegisterUser } from '@/schemas'
import { AppError } from '@/services/AppError'
import api from '@/services/api'
import { color } from '@/styles/color'
import { zodResolver } from '@hookform/resolvers/zod'
import * as Device from 'expo-constants'
import { Checkbox, useToast } from 'native-base'
import React from 'react'
import { useForm } from 'react-hook-form'
import { ScrollView } from 'react-native'
import * as S from './styles'

interface I {
  route: (h: string) => void
}
export function RegisterTemplate({ route }: I) {

  const control = useForm<TRegisterUser>({
    resolver: zodResolver(schemaRegisterUser)
  })

  const [img, setImg] = React.useState<string | null>(null)
  const [termos, setTermos] = React.useState<boolean>(false)
  const [typeUser, setTypeUser] = React.useState<string | null>(null)
  const [load, setLoad] = React.useState<boolean>(false)

  const toast = useToast()

  const tipoUser = [
    { label: 'Selecione um', value: '' },
    { label: 'Vendedor', value: '0' },
    { label: 'Comprador', value: '1' },
    { label: 'Parceiro', value: '2' },
    { label: 'Outros', value: '3' },
  ]

  const submit = React.useCallback(async (input: TRegisterUser) => {
    setLoad(true)


    if (!typeUser) {
      toast.show({
        title: 'Selecione o tipo de usuário',
        duration: 2000,
        bg: color.alert
      })
      setLoad(false)
      return
    }

    if (!termos) {
      toast.show({
        title: 'Aceite os termos para continuar',
        duration: 2000,
        bg: color.alert
      })
      setLoad(false)
      return
    }

    const deviceId = Device.default.sessionId;
    try {
      await api.post('/Usuario/App', {
        ...input,
        deviceId,
        tipoUsuario: Number(typeUser)
      })

      toast.show({
        title: 'Cadastro realizado com sucesso',
        duration: 2000,
        bg: 'green.900'
      })

      setLoad(false)
      route('login')
    } catch (error) {
      setLoad(false)

      if (error instanceof AppError) {
        toast.show({
          title: error.message,
          duration: 2000,
          bg: color.alert
        })
        return
      }

    }
  }, [typeUser, termos])

  return (
    <S.container>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 50 }}
        showsVerticalScrollIndicator={false}
      >
        <S.form>
          <S.title>DADOS PESSOAIS</S.title>
          <FormInput placeholder='Seu nome aparecerá para o comprador do lote' label='Nome Completo' name='nomeCompleto' control={control.control} error={control.formState.errors.nomeCompleto} />
          <FormInput keyboardType='numeric' mask='cpf' maxLength={15} placeholder='000.000.000-00' label='CPF' name='cpf' control={control.control} error={control.formState.errors.cpf} />
          <FormInput keyboardType='numeric' mask='cell-phone' maxLength={15} placeholder='DDD + número. Ex. (12) 99999-9999' label='Telefone (celular)' name='telefone' control={control.control} error={control.formState.errors.telefone} />
          <S.line />

          <S.title>DADOS DE ACESSO</S.title>
          <FormInput keyboardType='email-address' autoCapitalize='none' placeholder='exemplo@exemplo.com' label='E-mail' name='email' control={control.control} error={control.formState.errors.email} />
          <FormInput secureTextEntry placeholder='Insira uma senha que lembre' label='Senha' name='senha' control={control.control} error={control.formState.errors.senha} />
          <S.line />

          <S.title>TIPO DE USUÁRIO</S.title>

          <Selection itemSelected={h => setTypeUser(h)} itens={tipoUser} />

          <Checkbox value='termos' onChange={() => setTermos(!termos)} _checked={{ bg: color.focus.regular, borderColor: '#ffffff3' }} _text={{ fontSize: 12 }} >Li e aceito os Termos de Uso e Privacidade</Checkbox>

          <Button title='FINALIZAR CADASTRO' load={load} onPress={control.handleSubmit(submit)} />
        </S.form>

      </ScrollView>
    </S.container>
  )
}