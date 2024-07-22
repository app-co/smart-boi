import { _text } from '@/styles/sizes';
import styled from 'styled-components/native';

export type TStatus = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

interface Status {
  status: TStatus;
}

const colors: { [key: number]: string } = {
  0: '#8b6673',
  1: '#bf00ff',
  2: '#1ca051',
  3: '#00a6ff',
  4: '#6d5959',
  5: '#55ff00',
  6: '#00ffbf',
  7: '#bbff00',
  8: '#ff5900',
}

export const status = styled.View<Status>`
  background-color: ${h => colors[h.status]};
  padding: 2px 5px;
  border-radius: 8px;
`

export const Container = styled.TouchableOpacity`
  padding: 10px;
  background-color: #ffffff;
  border-radius: 15px;
  border-width: 1px;
  border-color: #e6e6e6;
`;

export const line = styled.View`
  border-bottom-width: 1px;
  border-color: #d1d1d1;
  margin-top: 20px;
  width: 100%;
  
`

export const boxImage = styled.View`  
  overflow: hidden;
`

export const statusFaixa = styled.View<Status>`
position: absolute;
background-color: #fff;
transform: rotate(-20deg);
top: 30px;
left: -5px;
  background-color: ${h => colors[h.status]};
  width: 100px;
  height: 30px;
  z-index: 1;
  align-items: center;
  justify-content: center;
`


export const title = styled.Text`
  font-family: bold;
  font-size: ${_text}px;
`;

export const titleFaixa = styled.Text`
  font-family: bold;
  font-size: ${_text - 1}px;
  color: #fff
`;

export const text = styled.Text`  
  font-family: trin;
  font-size: ${_text - 2}px;
`

export const content = styled.View`
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  gap: 5px;
`

export const footer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 10px;
`