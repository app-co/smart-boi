import { color } from '@/styles/color';
import { hightPercent, widtPercent } from '@/styles/sizes';
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
  4: '#c33333',
  5: '#55ff00',
  6: '#00ffbf',
  7: '#bbff00',
  8: '#ff5900',
}

export const Container = styled.View`
  width: ${widtPercent('57')}px;
  border-radius: 10px;
  background-color: #fff;
  border-width: 1px;
  border-color: #e5e5e5;
`;

export const title = styled.Text``;

export const lance = styled.View`
  background-color: ${color.focus.dark};
  align-items: center;
  justify-content: center;
  height: 20px;
  padding: 0px 10px;
  border-radius: 10px;
`

export const button = styled.TouchableOpacity`
  background-color: ${color.buttonLigh.bg};
  border-radius: 10px;
  height: 35px;
  align-items: center;
  justify-content: center;
`
export const boxImage = styled.View`  
  overflow: hidden;
`

export const statusFaixa = styled.View<Status>`
position: absolute;
background-color: #fff;
transform: rotate(-25deg);
top: ${hightPercent('4')}px;
left: -20px;
  background-color: ${h => colors[h.status]};
  width: ${widtPercent('65')}px;
  height: 50px;
  z-index: 1;
  align-items: center;
  justify-content: center;
`