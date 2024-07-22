import { HomeSvg } from '@/assets/svg/home/home'
import * as S from './styles'

import { ContacaoSvg } from '@/assets/svg/contacao/cotacao'
import { ContacaoSelectedSvg } from '@/assets/svg/contacao/cotacao-selected'
import { TrofeuSvg } from '@/assets/svg/contacao/trofeu'
import { HomeSelectedSvg } from '@/assets/svg/home/homeFilled'
import { color } from "@/styles/color"
import { FontAwesome } from "@expo/vector-icons"
import { Box } from "native-base"

interface I {
  isFocused: boolean,
  index: number,
}
export function Icons({ isFocused, index }: I) {
  const iconBar: any = {
    0: isFocused ? <HomeSelectedSvg /> : <HomeSvg />,
    1: isFocused ? <ContacaoSelectedSvg /> : <ContacaoSvg />,
    2: isFocused ? <TrofeuSvg fill={color.focus.dark} /> : <TrofeuSvg />,
    3: <FontAwesome name='gear' size={28} color={isFocused ? color.focus.regular : color.focus.ligh} />
  }

  return (
    <Box>
      {iconBar[index]}
    </Box>
  )
}

export function MyTabBar({ state, descriptors, navigation }: any) {

  return (
    <S.bar style={{ flexDirection: 'row', height: 86 }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            console.log({ routeName: route.name })

            if (route.name === 'Home') {
              navigation.navigate('Home', { screen: 'home' }, route.params);
            } else if (route.name === 'Cotacao') {
              navigation.navigate(route.name, route.params, {
                screen: 'home',
              });
            } else if (route.name === 'Lance') {
              navigation.navigate(route.name, route.params, {
                screen: 'home'
              });
            } else if (route.name === 'Config') {
              navigation.navigate(route.name);
            }


          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <S.button
            focused={isFocused}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ display: 'flex', flexDirection: 'row' }}
          >

            <Icons isFocused={isFocused} index={index} />

            {isFocused && (
              <S.label focused={isFocused} >
                {label}
              </S.label>

            )}
          </S.button>
        );
      })}
    </S.bar>
  );
}
