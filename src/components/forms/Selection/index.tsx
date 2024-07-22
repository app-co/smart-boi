import { color } from "@/styles/color";
import { hightPercent } from "@/styles/sizes";
import { Feather } from "@expo/vector-icons";
import { Box, Select } from "native-base";
import { Text } from "react-native";

export type TSelectionItem = { value: string, label: string }

interface I {
  itens: TSelectionItem[]
  itemSelected: (value: string) => void
  label?: string
  placeholder?: string
}

export function Selection({ itens, placeholder, label, itemSelected }: I) {
  return (
    <Box >
      {label && (
        <Text style={{ position: 'absolute', top: -8, left: 15, backgroundColor: '#fff', paddingHorizontal: 5, zIndex: 10 }} >{label}</Text>
      )}
      <Select
        placeholder={placeholder}
        onValueChange={h => itemSelected(h)}
        _text={{ color: color.text_color.focus, fontSize: 16 }}
        fontSize={'14px'}
        _selectedItem={{
          startIcon: (
            <>
              <Box bg={'gray.100'} rounded={8} p={2} >
                <Feather name='map-pin' size={20} color={'#ccc'} />
              </Box>

            </>
          )
        }}
        defaultValue="Selecione um item" rounded={'15px'} h={`${hightPercent('6')}px`} >
        {itens.map(h => (
          <Select.Item key={h.value} label={h.label} value={h.value} />
        ))}
      </Select>

    </Box>
  )
}