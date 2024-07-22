import { _subtitle } from '@/styles/sizes';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

export const title = styled.Text`
  font-size: ${_subtitle}px;
  font-family: regular;
`;

export const boxInput = styled.View`
  border-radius: 25px;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  margin: 10px 0;
  padding: 0 20px;
  background-color: #E5E7EB;
  flex: 1;
  gap: 15px;
  `

export const input = styled.TextInput`
  height: 40px;
  border-radius: 20px;
  flex: 1;
`