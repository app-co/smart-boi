import { _text } from '@/styles/sizes';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

export const content = styled.View`
  flex: 1;
  justify-content: space-between;
  margin-top: 18px;
`

export const title = styled.Text`
  font-family: 'bold';
  font-size: ${_text - 3}px;
`;

export const text = styled.Text`
  font-family: trin;
  font-size: ${_text - 4}px;
`;

export const box = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px;

  border-width: 1px;
  border-color: #d1d1d1;
  border-radius: 10px;
`

export const foot = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px;

  border-top-width: 1px;
  border-top-color: #d1d1d1;

  gap: 10px;
`
export const button = styled.TouchableOpacity<{ color: string }>`
  background-color: ${h => h.color};
  height: 45px;
  border-radius: 10px;  
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 5px 
`