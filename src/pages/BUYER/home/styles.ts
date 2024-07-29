import { hightPercent } from "@/styles/sizes";
import styled from "styled-components/native";

export const container = styled.View`
  flex: 1;

`

export const title = styled.Text`
  font-family: bold;

`

export const boxVideo = styled.View`
  flex: .5;
  background-color: #eaeaea;
`

export const body = styled.View`
  flex: 1;
  background-color: #fff;
  border-top-right-radius: 25px;
  border-top-left-radius: 25px;
  margin-top: -${hightPercent('.7')}%;
  padding: 15px;
`

export const bigBottom = styled.TouchableOpacity<{ cor: string }>`
  background-color: ${h => h.cor};
  border-radius: 18px;
  height: ${hightPercent('7.5')}px;
  flex: 1;
  align-items: center;
  justify-content: center;
`