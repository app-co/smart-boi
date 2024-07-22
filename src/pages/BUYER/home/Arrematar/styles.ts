import { color } from '@/styles/color';
import { _text } from '@/styles/sizes';
import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 15px;
  background-color: #ffffff;
`;

export const title = styled.Text`
  font-family: regular;
`;

export const text = styled.Text`
  font-family: trin;
  color: ${color.text_color.global};
  font-size: ${_text - 3}px;
`;

export const head = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  /* margin-bottom: 20px; */
`

export const line = styled.View<{ mg?: number }>`
  border-top-width: 1px;
  border-top-color: #e8e5e5;
  margin: ${h => h.mg ? h.mg : 10}px;
  width: 110%;
  height: 1px;
  z-index: 0;
`

export const content = styled.View`
  margin: 10px 0;
  gap: 20px;
`

export const buttonSheet = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-width: 1px;
  border-color: #dedede;
  padding: 8px;
  border-radius: 10px;
`

export const buttonOferta = styled.TouchableOpacity<{ typeStyle: 'oferta' | 'arrematar' }>`
  border-width: 1px;
  /* border-color: ${h => h.typeStyle === 'oferta' ? color.alert : color.focus.regular}; */
  gap: 10px;
  border-radius: 10px;
  padding: 8px;
  align-items: center;
  justify-content: center;
  flex: 1;

  
  ${h => h.typeStyle === 'oferta' && css`
    background-color: ${color.alert};
  `}

`

export const buttonLance = styled.TouchableOpacity<{ typeStyle: 'oferta' | 'arrematar' }>`
  border-width: 1px;
  /* border-color: ${h => h.typeStyle === 'oferta' ? color.alert : color.focus.regular}; */
  gap: 10px;
  border-radius: 10px;
  padding: 8px;
  align-items: center;
  justify-content: center;
  flex: 1;
  
  
  ${h => h.typeStyle === 'arrematar' && css`
    background-color: ${color.focus.regular};
  `}

`