import { Button } from '@/components/forms/Button'
import { FormInput } from '@/components/forms/FormInput'
import { useAuth } from '@/contexts/auth'
import { UseFatch } from '@/hooks/fetchs'
import { TSaler, schemaRegisterSaler } from '@/hooks/fetchs/schemas'
import { useRegissterSaler } from '@/hooks/mutations'
import api from '@/services/api'
import { color } from '@/styles/color'
import { Feather } from '@expo/vector-icons'
import { zodResolver } from '@hookform/resolvers/zod'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import * as Device from 'expo-constants'
import { Box, Checkbox, HStack, useToast } from 'native-base'
import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FlatList, ScrollView } from 'react-native'
import { useQuery } from 'react-query'
import * as S from './styles'

const fetch = new UseFatch()
export function RegisterSalerTemplate() {
  const navigation = useNavigation()
  const { user, updateUser } = useAuth()
  const { mutateAsync, isLoading } = useRegissterSaler()
  const [fazenda, setFazenda] = React.useState<{ label: string, value: string }[]>([])
  const [selectedFazenda, setSelectedFazenda] = React.useState('')
  const toast = useToast()

  const control = useForm<TSaler>({
    resolver: zodResolver(schemaRegisterSaler.omit({ foto: true, listEnderecos: true, deviceId: true, usuarioAppId: true })),
    defaultValues: {
      nomeCompleto: user?.nome,
      email: user?.email,
      telefone: user?.telefone,
      cpf: user?.cpf,
    }

  })

  const getFazenda = useQuery({
    queryKey: 'fazenda',
    queryFn: async () => fetch.getFazenda(user!.usuarioId)
  })

  const fazendas = getFazenda?.data
    ? getFazenda?.data?.map(h => {
      return {
        label: h.nomeFazenda,
        value: h.idEndereco
      }
    })
    : []

  useFocusEffect(useCallback(() => {
    getFazenda.refetch()
  }, []))

  const [termos, setTermos] = React.useState<boolean>(false)

  const [image, setImage] = useState(null);


  const submit = async (input: TSaler) => {
    const deviceId = Device.default.sessionId;

    const dt = {
      // ...input,
      // deviceId,
      // foto: image ?? '',
      listEnderecos: fazendas.map(h => h.value),
      usuarioAppId: user!.usuarioId
    }

    try {
      await mutateAsync(dt)
      toast.show({
        title: 'Usuário registrado com sucesso!',
        duration: 2000,
        bg: 'green.700',
        placement: 'top',
      })

      const { data } = await api.get(`/Usuario/tipo-acessos?UsuarioAppId=${user!.usuarioId}`)
      const newUser = {
        ...user!,
        tipoAcesso: data.result
      }

      updateUser(newUser)
      navigation.navigate('home')
    } catch (error) {
    }
  };

  function addFazenda() {
    if (!selectedFazenda) {
      return toast.show({
        title: 'Selecione um propriedade',
        placement: 'top',
        bgColor: 'red.600',
      })
    }
    const findSazendaFronSelected = fazenda.find(h => h.value === selectedFazenda)

    if (findSazendaFronSelected) {
      return toast.show({
        title: 'Propriedade já selecionada',
        placement: 'top',
        bg: 'red.600'
      })
    }

    const findFazenda = fazendas.find(f => f.value === selectedFazenda)



    setFazenda([...fazenda, findFazenda ?? {} as { value: string, label: string }])

    setSelectedFazenda('')
  }


  function removeFazenda(i: number) {
    const index = fazenda.findIndex((h, index) => i === index)

    const arry = [...fazenda]

    if (index !== -1) {
      arry.splice(index, 1)
    }

    setFazenda(arry)
  }



  function onSelectFazenda(id: string) {
    const findFazenda = fazendas.find(f => f.value === id)

    setFazenda(h => [...h, findFazenda ?? {} as { value: string, label: string }])
  }



  return (
    <S.container>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 50 }}
        showsVerticalScrollIndicator={false}
      >

        <S.form>
          <S.title>DADOS PESSOAIS</S.title>
          <FormInput placeholder='Seu nome aparecerá para o comprador do lote' label='Nome Completo' name='nomeCompleto' control={control.control} error={control.formState.errors.nomeCompleto} />
          <FormInput mask='cpf' keyboardType='numeric' placeholder='000.000.000-00' label='CPF' name='cpf' control={control.control} error={control.formState.errors.cpf} />
          <FormInput maxLength={15} keyboardType='numeric' mask='cell-phone' placeholder='DDD + número. Ex. (12) 99999-9999' label='Telefone (celular)' name='telefone' control={control.control} error={control.formState.errors.telefone} />
          <S.line />

          <S.title>DADOS DE ACESSO</S.title>
          <FormInput placeholder='exemplo@exemplo.com' label='E-mail' name='email' control={control.control} error={control.formState.errors.email} />
          {/* <FormInput placeholder='Insira uma senha que lembre' label='Senha' name='senha' control={control.control} error={control.formState.errors.senha} /> */}
          <S.line />

          <S.title>DADOS D EENDEREÇO</S.title>
          <Button onPress={() => navigation.navigate('cadastroPropriedade')} title='ADICIONAR FAZENDA' styleType='border' icon={<Feather name='plus' size={23} />} />


          <Box borderWidth={1} py={8} px={4} rounded={8} borderColor="gray.400" style={{ gap: 20 }} >
            <S.title>Fazendas</S.title>

            <FlatList
              data={fazendas}
              keyExtractor={(h, i) => String(i)}
              contentContainerStyle={{
                gap: 5,
              }}
              renderItem={({ item: h, index }) => (
                <HStack bg="gray.200" p={2} rounded={4} alignItems="center" justifyContent="space-between" >
                  <Box  >
                    <S.title style={{ fontWeight: '600' }} >{h.label}</S.title>
                  </Box>
                  {/* <TouchableOpacity onPress={() => removeFazenda(index)} style={{ padding: 5, borderRadius: 30, backgroundColor: 'rgba(255, 164, 164, 0.332)' }} >
                    <Feather name='trash-2' color="red" size={20} />
                  </TouchableOpacity> */}
                </HStack>
              )}
            />

          </Box>

          <Checkbox
            value='termos'
            onChange={() => setTermos(!termos)}
            _checked={{ bg: color.focus.regular, borderColor: '#ffffff3' }}
            _text={{ fontSize: 12 }} >
            <S.title>Li e aceito os Termos de Uso e Privacidade</S.title>
          </Checkbox>

          <Button onPress={control.handleSubmit(submit)} load={isLoading} title='FINALIZAR CADASTRO' />
        </S.form>

      </ScrollView>
    </S.container>
  )
}
