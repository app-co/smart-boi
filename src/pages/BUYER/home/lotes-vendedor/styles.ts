import { hightPercent } from '@/styles/sizes';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

export const title = styled.Text``;

export const button = styled.TouchableOpacity`
  padding: 10px;
  position: absolute;
  background-color: #901313d5;

  width: 60px;
  height: 60px;
  border-radius: 40px;
  align-items: center;
  justify-content: center;

  top: ${hightPercent('10')}%;
  right: ${hightPercent('1')}%;
  z-index: 99;

`