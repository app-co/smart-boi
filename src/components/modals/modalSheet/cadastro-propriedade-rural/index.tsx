import { Button } from "@/components/forms/Button";
import { FormInput } from "@/components/forms/FormInput";
import { RadioGrup, TRadios } from "@/components/forms/RadioGrup";
import { useAuth } from "@/contexts/auth";
import { TEndereco, schemaEndereco } from "@/hooks/fetchs/schemas";
import { useRegiterEndereco } from "@/hooks/mutations";
import { AppError } from "@/services/AppError";
import { color } from "@/styles/color";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Box, HStack, useToast } from "native-base";
import React from "react";
import { useForm } from "react-hook-form";
import { Modalize } from "react-native-modalize";
import * as S from './styles';

interface I {
  modalizeRef: React.Ref<Modalize>;
  fazendaId?: (h: string) => void
  refetch: () => void
}
export function CasdastroPropriedadeRural({ modalizeRef, refetch, fazendaId }: I) {
  const { mutateAsync, isLoading } = useRegiterEndereco()
  const { user } = useAuth()
  const toast = useToast()
  const control = useForm<TEndereco>({
    resolver: zodResolver(schemaEndereco.omit({ tipoFazenda: true, UsuarioId: true })),
  })

  const [tipoFazenda, setTipoFazenda] = React.useState<string>('')

  const radios: TRadios[] = [
    {
      text: 'Fazenda Própria',
      value: '0'
    },
    {
      text: 'Fazenda Arrendada',
      value: '1'
    },
    {
      text: 'Fazenda de Terceiro',
      value: '2'
    }, {
      text: 'Outro lugar',
      value: '3'
    },
  ]


  const [cep, setCep] = React.useState('');

  async function get(h: string) {
    setCep(h)
    if (h.length >= 7) {
      const { data } = await axios.get(
        `https://brasilapi.com.br/api/cep/v1/${h}`,
      );

      control.setValue('cep', data.cep);
      control.setValue('cidade', data.city);
      control.setValue('uf', data.state);

    }
  }

  const submit = React.useCallback(async (input: TEndereco) => {
    const dt = {
      ...input,
      UsuarioId: user!.usuarioId,
      tipoFazenda: Number(tipoFazenda)
    }
    try {
      const data = await mutateAsync(dt)
      toast.show({
        title: 'Propriedade cadastrada com sucesso',
        duration: 2000,
        bg: 'green.700',
        placement: 'top',
      })
      refetch()
      modalizeRef?.current?.close()

    } catch (error) {
      if (error instanceof AppError) {
        toast.show({
          title: error.message,
          duration: 2000,
          bg: color.alert,
          placement: 'top'
        })
      }
    }
  }, [])


  return (
    <Modalize
      ref={modalizeRef}
      handlePosition="inside"

    // modalHeight={hightPercent('100')}
    >
      <S.container>
        <Box py='6' style={{ gap: 10 }} >
          <S.title>Cadastrar Propriedade Rural</S.title>
          <FormInput name="nomeFazenda" label="Nome da Fazenda" control={control.control} error={control.formState.errors.nomeFazenda} />
        </Box>

        <Box my='6' >
          <S.text>TIPO DE FAZENDA</S.text>
          <RadioGrup setItem={h => setTipoFazenda(h)} radios={radios} alin="column" />
        </Box>

        <S.form>
          <FormInput name='inscricaoEstadual' label="Inscrição Estadual" control={control.control} error={control.formState.errors.inscricaoEstadual} />
          <FormInput keyboardType="numeric" maxLength={8} mask="cep" name='cep' onChangeText={(h) => get(h)} value={cep} label="CEP" control={control.control} error={control.formState.errors.cep} />
          <HStack space={2} w='full' >
            <Box w='100px'>
              <FormInput name='uf' label="UF" control={control.control} error={control.formState.errors.uf} />
            </Box>

            <Box flex='1' >
              <FormInput name='cidade' label="Cidade" control={control.control} error={control.formState.errors.cidade} />
            </Box>

          </HStack>
          <FormInput keyboardType="numeric" name='destanciaMunicipio' label="Distância do municipi até Fazenda (km)" control={control.control} error={control.formState.errors.destanciaMunicipio} />
          <FormInput name='linkLocalizacao' label="Link da Localizção da Fazenda" control={control.control} error={control.formState.errors.linkLocalizacao} />
          <FormInput name='roteiroCaminho' label="Descrição do Roteiro" control={control.control} error={control.formState.errors.roteiroCaminho} />

          <Button load={isLoading} onPress={control.handleSubmit(submit)} title="CADASTRAR ENDEREÇO" />
        </S.form>
      </S.container>
    </Modalize>
  )
}