import { Defs, Image, Pattern, Rect, Svg, Use } from "react-native-svg";

export function GeneroMaculinoSvg() {
  return (
    <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <Rect width="24" height="24" fill="url(#pattern0_2027_2236)" />
      <Defs>
        <Pattern id="pattern0_2027_2236" patternContentUnits="objectBoundingBox" width="1" height="1">
          <Use href="#image0_2027_2236" transform="scale(0.00390625)" />
        </Pattern>
        <Image id="image0_2027_2236" width="256" height="256" href="data:image/png;base64,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" />
      </Defs>
    </Svg>


  )
}