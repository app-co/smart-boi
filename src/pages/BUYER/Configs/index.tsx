import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';

import { EvilIcons, Feather } from '@expo/vector-icons';

import { Avatar, Box, Circle, HStack } from 'native-base';

import { useAuth } from '@/contexts/auth';
import { UseFatch } from '@/hooks/fetchs';
import { color } from '@/styles/color';
import { _subtitle } from '@/styles/sizes';
import { useNavigation } from '@react-navigation/native';

import { InfoSvg } from '@/assets/svg/info';
import { ProtectSvg } from '@/assets/svg/protect';
import { SignOutSvg } from '@/assets/svg/signOut';
import * as S from './styles';

const fetch = new UseFatch();

export function Configs() {
  const { navigate, reset } = useNavigation();
  const { signOut, user } = useAuth();
  const [modal, setModal] = React.useState<boolean>(false);


  return (
    <S.Container>
      <ScrollView style={{ backgroundColor: '#fff' }}>
        <S.box style={{ marginBottom: 20 }}>
          <HStack space={4} alignItems="center">
            {user?.fotoUrl ? (
              <Avatar size="lg" source={{ uri: user?.fotoUrl }} />
            ) : (
              <EvilIcons name="user" size={65} color={color.focus.ligh} />
            )}

            <Box flex={1}>
              <S.title style={{ fontFamily: 'bold', fontSize: _subtitle, color: '#fff' }}>
                {user!.nome}
              </S.title>
            </Box>

            <TouchableOpacity onPress={() => navigate('profile')}>
              <Feather size={30} name="edit" color='#fff' />
            </TouchableOpacity>
          </HStack>
        </S.box>

        <S.title
          style={{
            marginVertical: 20,
            fontSize: _subtitle,
            color: color.text_color.global,
          }}
        >
          Configurações
        </S.title>

        <S.content>

          <TouchableOpacity>
            <HStack space={6} alignItems="center">
              <Circle bg={color.focus.ligh} p={3}>
                <InfoSvg />
              </Circle>

              <Box>
                <S.title>Ajuda</S.title>
                <S.title>Caso precise de ajuda, tire suas dúvidas aqui</S.title>
              </Box>
            </HStack>
          </TouchableOpacity>
          <S.line />

          <TouchableOpacity>
            <HStack space={6} alignItems="center">
              <Circle bg={color.focus.ligh} p={3}>
                <ProtectSvg />
              </Circle>

              <Box>
                <S.title>Termos de Uso e Privacidade</S.title>
                <S.title>Conheça as nossas políticas</S.title>
              </Box>
            </HStack>
          </TouchableOpacity>
          <S.line />

          <TouchableOpacity
            onPress={() => {
              signOut();
              navigate('home')
            }}
          >
            <HStack space={6} alignItems="center">
              <Circle bg={color.focus.ligh} p={3}>
                <SignOutSvg />
              </Circle>

              <Box>
                <S.title>Sair</S.title>
              </Box>
            </HStack>
          </TouchableOpacity>
          <S.line />
        </S.content>
      </ScrollView>
    </S.Container>
  );
}
