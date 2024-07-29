import { color } from "@/styles/color";
import { hightPercent } from "@/styles/sizes";
import styled from "styled-components/native";

export const container = styled.View`
  flex: 1;
  background-color: #ffff;
  padding: 20px;
`

export const title = styled.Text`
  color: ${color.text_color.global};
  font-family: 'regular';
`

export const buttonSheet = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-width: 1px;
  border-color: #a2a2a2;
  padding: 8px;
  border-radius: 10px;
`


export const boxAvatr = styled.TouchableOpacity`
  border-radius: 20px;
  border-width: 1px;
  border-style: dashed;
  background-color: #d7d7d7;
  border-color: #9e9e9e;
  height: 85px;
  width: 85px;

  margin: 0 auto;
  align-items: center;
  justify-content: center;
`

export const form = styled.View`
  gap: 18px;
  margin-top: ${hightPercent('1')}%;
`

export const line = styled.View`
  height: 1px;
  background-color: #dfdfdf;
`

export const box = styled.TouchableOpacity`
  width: 100%;
  height: 50px;

  border-radius: 18px;
  border-width: 1px;
  border-color: #ccc;
  justify-content: center;
  padding: 0 20px;
`;
