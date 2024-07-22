/* eslint-disable no-underscore-dangle */
export function _hourToMinutis(valor: string) {
  const [hour, min] = valor.split(':').map(Number);

  const minuti = hour * 60 + min;

  return minuti;
}

export function convertNumbeToCurrency(e: number) {
  return e.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}
