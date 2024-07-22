import { color } from "@/styles/color";
import { _text } from "@/styles/sizes";
import styled from "styled-components/native";


export const bar = styled.View`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  padding-bottom: 25px;
  background-color: #fff;
`

export const label = styled.Text<{ focused: boolean }>`
  color: ${h => h.focused ? color.focus.dark : color.focus.ligh};
  font-family: 'bold';
  font-size: ${_text - 4}px;
`

export const button = styled.TouchableOpacity<{ focused: boolean }>`
  align-items: center;
  gap: 7px;
  background-color: ${h => h.focused ? color.focus.ligh : '#fff'};
  justify-content: center;
  padding: 8px 15px;
  border-radius: 18px;
`