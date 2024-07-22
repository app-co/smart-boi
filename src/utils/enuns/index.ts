interface I {
  type?: 'formated' | 'enum'
  value?: number
}

type T = string | { value: number, label: string }[]

export function enumStatusLote({ type = 'enum', value }: I) {
  const enunStatusLote = [
    { label: 'Aguardado', value: 0 },
    { label: 'Aceito', value: 1 },
    { label: 'Arrematado', value: 2 },
    { label: 'Rejeitado', value: 3 },
    { label: 'Fechado', value: 4 },
    { label: 'Aberto', value: 5 },
    { label: 'Cancelado', value: 6 },
    { label: 'Em análize', value: 7 },
  ]

  const formated: { [key: number]: string } = {
    0: 'Aguardando',
    1: 'Aceito',
    2: 'Arrematado',
    3: 'Rejeitado',
    4: 'Fechado',
    5: 'Aberto',
    6: 'Cancelado',
    7: 'Em análize',
  }

  if (type === 'formated') {
    return formated[value!];
  }

  return enunStatusLote;
}
export function enumTempoVida({ type = 'enum', value }: I) {
  const enunStatusLote = [
    { label: 'Até Doze Meses', value: 0 },
    { label: 'Até Vinte Quatro Meses', value: 1 },
    { label: 'Até Trinta e Seis Meses', value: 2 },
    { label: 'Até Quarenta e oito Meses', value: 3 },
    { label: 'Mais de Quarenta e oito Meses', value: 4 },
  ]

  const fomated: { [key: number]: string } = {
    0: 'Até Doze Meses',
    1: 'Até Vinte Quatro Meses',
    2: 'Até Trinta e Seis Meses',
    3: 'Até Quarenta e oito Meses',
    4: 'Mais de Quarenta e oito Meses',
  }

  if (type === 'formated') {
    return fomated[value!];
  }

  return enunStatusLote;
}
export function enumTempoVenda({ type = 'enum', value }: I) {
  const enunStatusLote = [
    { label: 'Cinco Dias', value: 0 },
    { label: 'Dez Dias', value: 1 },
    { label: 'Quinze Dias', value: 2 },
    { label: 'Vinte Dias', value: 3 },
    { label: 'Vinte CincoDias', value: 4 },
    { label: 'Trinta Dias', value: 5 },
    { label: 'Trinta cinco Dias', value: 6 },
    { label: 'Quarenta Dias', value: 7 },
    { label: 'Quarenta e cinco Dias', value: 8 },
  ]

  const formatedEnunStatusLote: { [key: number]: string } = {
    0: 'Cinco Dias',
    1: 'Dez Dias',
    2: 'Quinze Dias',
    3: 'Vinte Dias',
    4: 'Vinte Cinco Dias',
    5: 'Trinta Dias',
    6: 'Trinta cinco Dias',
    7: 'Quarenta Dias',
    8: 'Quarenta e cinco Dias',
  }

  if (type === 'formated') {
    return formatedEnunStatusLote[value!];
  }

  return enunStatusLote;
}
export function enumNivel({ type = 'enum', value }: I) {
  const enunStatusLote = [
    { label: 'Admin', value: 0 },
    { label: 'Vendedor', value: 1 },
    { label: 'Comprador', value: 2 },
    { label: 'Parceiro', value: 3 },
    { label: 'Comum', value: 4 },
  ]

  const formatedEnunStatusLote: { [key: number]: string } = {
    0: 'Admin',
    1: 'Vendedor',
    2: 'Comprador',
    3: 'Parceiro',
    4: 'Comum',
  }

  if (type === 'formated') {
    return formatedEnunStatusLote[value!];
  }

  return enunStatusLote;
}
export function enumEspecie({ type = 'enum', value }: I) {
  const enunStatusLote = [
    { label: 'Bovinos', value: 0 },
    { label: 'Equinos', value: 1 },
    { label: 'Ovinos', value: 2 },
    { label: 'Caprinos', value: 3 },
    { label: 'Suinos', value: 4 },
    { label: 'Aves', value: 5 },
  ]

  const formatedEnunStatusLote: { [key: number]: string } = {
    0: 'Bovinos',
    1: 'Equinos',
    2: 'Ovinos',
    3: 'Caprinos',
    4: 'Suinos',
    5: 'Aves'
  }

  if (type === 'formated') {
    return formatedEnunStatusLote[value!]
  }

  return enunStatusLote;
}
export function enumSexo({ type = 'enum', value }: I) {
  const e = [
    { label: 'Macho', value: 0 },
    { label: 'Fêmea', value: 1 },
  ]

  const formatedEnunStatusLote: { [key: number]: string } = {
    0: 'Macho',
    1: 'Fêmea'
  }

  let response: T = ''

  if (type === 'formated') {
    response = formatedEnunStatusLote[value!];
  }

  if (type === 'enum') {
    response = e
  }

  return response

}
export function enumCategoriaLote({ type = 'enum', value }: I): string | { value: number, label: string }[] {
  const enunStatusLote = [
    { label: 'Bezerro', value: 0 },
    { label: 'Touro', value: 1 },
    { label: 'Novilho', value: 2 },
    { label: 'Vaca', value: 3 },
    { label: 'Boi', value: 4 },
    { label: 'Potro', value: 5 },
    { label: 'Egua', value: 6 },
    { label: 'Cavalo', value: 7 },
    { label: 'Cordeiro', value: 8 },
    { label: 'Ovelha', value: 9 },
    { label: 'Carneiro', value: 10 },
    { label: 'Leitao', value: 11 },
    { label: 'Porca', value: 12 },
    { label: 'Porco', value: 13 },
    { label: 'Frango', value: 14 },
    { label: 'Galinha', value: 15 },
    { label: 'Galo', value: 16 },
    { label: 'Outros', value: 17 }
  ]

  const formatedEnunStatusLote: { [key: number]: string } = {
    0: 'Bezerro',
    1: 'Touro',
    2: 'Novilho',
    3: 'Vaca',
    4: 'Boi',
    5: 'Potro',
    6: 'Egua',
    7: 'Cavalo',
    8: 'Cordeiro',
    9: 'Ovelha',
    10: 'Carneiro',
    11: 'Leitao',
    12: 'Porca',
    13: 'Porco',
    14: 'Frango',
    15: 'Galinha',
    16: 'Galo',
    17: 'Outros'
  }

  if (type === 'formated') {
    return formatedEnunStatusLote[value!];
  }

  return enunStatusLote;
}
export function enumTipoFazenda({ type = 'enum', value }: I) {
  const enunStatusLote = [
    { label: 'Propia', value: 0 },
    { label: 'Arrendada', value: 1 },
    { label: 'Terceiro', value: 3 },
    { label: 'Outro', value: 4 },
  ]

  const formatedEnunStatusLote: { [key: number]: string } = {
    0: 'Propria',
    1: 'Arrendada',
    3: 'Terceiro',
    4: 'Outro'
  }

  if (type === 'formated') {
    return formatedEnunStatusLote[value!];
  }

  return enunStatusLote;
}
export function enumTipoOferta({ type = 'enum', value }: I) {
  const enunStatusLote = [
    { label: 'Kg', value: 0 },
    { label: 'Animal', value: 1 },
  ]

  const formatedEnunStatusLote: { [key: number]: string } = {
    0: 'Kg',
    1: 'Animal'
  }

  if (type === 'formated') {
    return formatedEnunStatusLote[value!];
  }

  return enunStatusLote;
}
