import { color } from "@/styles/color";
import { _text } from "@/styles/sizes";
import styled from "styled-components/native";

export const container = styled.View`
  gap: 20px;
  margin-top: 30px;
`

export const title = styled.Text`
  font-size: ${_text}px;
  font-family: 'regular';
  color: ${color.focus.regular}
`