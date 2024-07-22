import { hightPercent, widtPercent } from '@/styles/sizes';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
const { width } = Dimensions.get('window');


export const Container = styled.View`

`;

export const title = styled.Text``;

export const box = styled.View`
  border-radius: 10px;

height: ${hightPercent('15')}px;
border-radius: 10px;
width: ${widtPercent('90')}px;
`

export const Content = styled.View`
  
`

