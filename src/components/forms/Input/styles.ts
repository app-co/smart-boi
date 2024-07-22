
import { css } from 'styled-components';
import styled from 'styled-components/native';

import { color } from '@/styles/color';
import { font } from '@/styles/fonts';
import { _text, hightPercent } from '@/styles/sizes';
import { TextInput } from 'react-native';

interface I {
  filed: boolean;
  focus: boolean;
  error: boolean;
  boxText?: boolean
}

export type TCondition = 'filed' | 'focus' | 'error';

export const Container = styled.View<I>`
  border-radius: 12px;
  flex-direction: row;
  width: 100%;
  height: ${h => h.boxText ? hightPercent('10') : hightPercent('6')}px;
  padding-top: ${h => h.boxText ? 5 : 0}px;
  align-items: center;

  border-width: 1px;
  border-color: #b9b7b7;

  ${(h: I) =>
    h.filed &&
    css`
      border-color: ${color.focus.dark};
      border-width: 1px;
    `}
  ${(h: I) =>
    h.focus &&
    css`
      border-color: ${color.focus.regular};
      border-width: 1px;
    `};

    ${(h: I) =>
    h.error &&
    css`
      border-color: ${color.alert};
      border-width: 1px;
    `};

    
`;

export const title = styled.Text`
  color: ${color.text_color.global};
  font-family: ${font.light};
  margin-bottom: 5px;
  font-size: ${_text - 2}px;
  position: absolute;
  top: ${hightPercent('-2')}%;
  left: 20px;
  background-color: #fff;
  z-index: 20;
  padding: 0 5px;
`;

export const input = styled(TextInput)`
  flex: 1;
  height: 100%;
  padding: 0 0 0 10px;
  font-family: ${font.bold};
  color: ${color.text_color.global};
`;

export const boxIcon = styled.View`
  width: 40px;
  height: 100%;

  align-items: center;
  justify-content: center;
`;
