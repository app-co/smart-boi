import { font } from '@/styles/fonts';
import { hightPercent } from '@/styles/sizes';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 15px;
  background-color: #fff;
`;

export const title = styled.Text`
  font-family: ${font.bold};
  color: #939393;
`;

export const gap = styled.View`
  gap: 10px;
`

export const line = styled.View`
  width: 100%;
  height: 1.5px;
  background-color: #dddddd;
  margin-top: 10px;
`

export const content = styled.View`
  gap: 20px;
`

export const buttonSheet = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-width: 1px;
  border-color: #a2a2a2;
  padding: 8px;
  border-radius: 10px;
`



export const boxMidia = styled.TouchableOpacity`
  background-color: #E5E7EB;
  height: ${hightPercent('7')}px;
  border-radius: 16px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 15px;
`

export const row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

`