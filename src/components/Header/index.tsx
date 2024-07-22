import avatar from '@/assets/avatar.png'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { Avatar } from 'native-base'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import * as S from './styles'

export function Header(props: any) {
  const nav = useNavigation()

  return (
    <S.Container>
      <TouchableOpacity onPress={() => nav.goBack()} >
        <Ionicons name='arrow-back' size={30} color={'#696969'} />
      </TouchableOpacity>

      <S.title>{props.options?.title}</S.title>

      <Avatar source={avatar} size={'md'} bg={'gray.200'} />
    </S.Container>
  )
}