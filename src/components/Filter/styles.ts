import { _subtitle, hightPercent } from '@/styles/sizes';
import styled from 'styled-components/native';

export const Container = styled.View``;

export const filterBox = styled.View`
  background-color: #fff;
  width: 100%;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  height: ${hightPercent('75')}px;
  padding: 20px;
  gap: 20px;
  `

export const title = styled.Text`
  align-self: center;
  font-size: ${_subtitle}px;
  font-family: bold;
  margin-bottom: 20px;
`;