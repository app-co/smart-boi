/* eslint-disable no-underscore-dangle */
export function _hourToMinutis(valor: string) {
  const [hour, min] = valor.split(':').map(Number);

  const minuti = hour * 60 + min;

  return minuti;
}

export function convertNumbeToCurrency(e: number): string {
  return e.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

export function _toNumber(e: string): number {
  return Number(e.replace(/\D/g, ''))
}

export function _currencyToNumber(e: string): number {
  const value = e.replace(/\D/g, '')
  const nu = value.length <= 2
    ? Number(value)
    : Number(value) / 100

  return nu
}
