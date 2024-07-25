import axios from 'axios'
import { Actionsheet } from 'native-base'
import React from 'react'
import { useForm } from 'react-hook-form'
import { KeyboardAvoidingView } from 'react-native'
import { useQuery } from 'react-query'
import { Button } from '../forms/Button'
import { FormInput } from '../forms/FormInput'
import { Selection } from '../forms/Selection'
import { Loading } from '../Loading'
import * as S from './styles'

const enumStatus = [
  {
    value: '0',
    label: 'Todos'
  },
  {
    value: '4',
    label: 'Abertos'
  },
  {
    value: '5',
    label: 'Fechados'
  }
]

interface I {
  setCity: (i: string) => void
  setUf: (i: string) => void
  setStatus: (i: string) => void
  isOpen: boolean
  onClose: (h: boolean) => void
}

export function Filter({ setCity, setUf, setStatus, isOpen, onClose }: I) {
  const { control, getValues } = useForm()

  const [selectedUf, setSeleceteUf] = React.useState('')
  const [selectedStatus, setSelecteStatus] = React.useState<string>('')
  const [onOpen, setOnOpen] = React.useState<boolean>(false)

  const stados = useQuery({
    queryKey: ['stados'],
    queryFn: async () => await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(h => h.data)
  })

  const estadsUf = stados.data as { sigla: string; nome: string }[]


  function handleSave() {
    setCity(getValues('cidade'))
    setUf(selectedUf)
    setStatus(selectedStatus)
    setOnOpen(false)
  }

  React.useEffect(() => {
    setOnOpen(isOpen)
  }, [isOpen])


  if (stados.isLoading) {
    return <Loading />
  }

  const uf = estadsUf.map(h => {
    return { value: h.sigla, label: h.nome }
  }).sort((a, b) => {
    return a.label.localeCompare(b.label)
  })

  return (
    <S.Container>
      <Actionsheet isOpen={onOpen} onClose={() => {
        setOnOpen(false)
        onClose(false)
      }}>
        <KeyboardAvoidingView style={{ width: '100%' }} >
          <S.filterBox >
            <S.title>Filtrar pesquisa</S.title>
            <FormInput name='cidade' control={control} label='Cidade' placeholder='pesquisar por cidade' />
            <Selection label='UF' placeholder='Selecione um estado' itens={uf} itemSelected={h => setSeleceteUf(h)} />
            <Selection label='Status' placeholder='Status do lote' itens={enumStatus} itemSelected={h => setSelecteStatus(h)} />
            <Button onPress={handleSave} />

          </S.filterBox>
        </KeyboardAvoidingView>
      </Actionsheet>
    </S.Container>
  )
}