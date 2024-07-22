import { _text } from '@/styles/sizes';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-width: 1px;
  border-color: #d1d1d1;
  border-radius: 18px;
  padding: 10px;
`;

export const title = styled.Text`
  font-size: ${_text}px;
  font-family: regular;
`;

export const text = styled.Text`
  font-size: ${_text - 3}px;
  font-family: regular;
`;

export const taxa = styled.View<{ cor: string }>`
  background-color: ${h => h.cor};
  border-radius: 20px;
  padding: 5px 13px;
  /* width: 60px; */
  align-items: center;
  justify-content: center;
`

export const buttao = styled.TouchableOpacity`
  background-color: #D1D5DB;
  border-radius: 20px;
  padding: 5px 10px;
`

export const line = styled.View`
  width: 100%;
  height: 1px;
  background-color: #d1d1d1;
  margin-top: 20px;
`