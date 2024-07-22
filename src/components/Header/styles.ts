import { color } from '@/styles/color';
import { font } from '@/styles/fonts';
import { _text, hightPercent } from '@/styles/sizes';
import { Platform } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
  padding: ${Platform.OS === 'ios' ? 35 : 25}px 25px;
  padding-bottom: 0;

  height: ${hightPercent('8')}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #ffffff;
  `;

export const title = styled.Text`
  font-family: ${font.bold};
  font-size: ${_text}px;

  color: ${color.text_color.global};
`;