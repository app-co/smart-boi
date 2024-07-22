import { color } from '@/styles/color';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 15px;
  background-color: #ffff;
`;

export const title = styled.Text``;

export const box = styled.View`
  background-color: ${color.focus.regular};
  padding: 15px;
  border-radius: 18px;
`

export const row = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 10px;
  background-color: ${color.focus.ligh};
`

export const content = styled.View`
  gap: 20px;
`

export const line = styled.View`
  width: 100%;
  height: 1px;
  background-color: #dfdfdf;
`