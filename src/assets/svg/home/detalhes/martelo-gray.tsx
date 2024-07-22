import { Defs, Image, Pattern, Rect, Svg, Use } from "react-native-svg";

interface I {
  fill?: string;
  width?: number;
  height?: number;
  viewBox?: string;
}

export function MarteloGraySvg({ fill = '#7e7e7e', width = 25, height = 24 }: I) {
  return (
    <Svg width={width} height={height} viewBox="0 0 25 25" fill="none" >
      <Rect width="22" height="22" fill="url(#pattern0_2028_2595)" />
      <Defs>
        <Pattern id="pattern0_2028_2595" patternContentUnits="objectBoundingBox" width="1" height="1">
          <Use href="#image0_2028_2595" transform="scale(0.00195312)" />
        </Pattern>
        <Image id="image0_2028_2595" width="512" height="512" href="data:image/png;base64,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" />
      </Defs>

    </Svg>

  )
}