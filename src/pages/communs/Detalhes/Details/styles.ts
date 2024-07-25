import { color } from '@/styles/color';
import { _text } from '@/styles/sizes';
import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 0 10PX;
`;

export const title = styled.Text`
  font-size: ${_text}px;
  font-family: regular;

`;

export const text = styled.Text`
  font-size: ${_text - 3}px;
  font-family: trin;
  color: ${color.text_color.global};
`;

export const box = styled.View`
  height: 45px;
  flex-direction: row;
  gap: 10px;

  align-items: center;
  margin: 5px 0;
`

export const footerButton = styled(Animated.View) <{ end: boolean }>`
  width: 100%;
  align-self: center;
  bottom: 5%;
  position: absolute;
  bottom: 20px;
`