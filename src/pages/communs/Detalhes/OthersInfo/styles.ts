import { color } from '@/styles/color';
import { _text } from '@/styles/sizes';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 10px;
`;

export const title = styled.Text`
  font-family: regular;
  font-size: ${_text - 2}px;
`;

export const text = styled.Text`
  font-family: regular;
  font-size: ${_text - 5}px;
  color: ${color.text_color.global};
`;

export const content = styled.View`
  gap: 20px;
`

export const line = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: #ccc;
  margin-top: 10px;
  width: 100%;
  
`