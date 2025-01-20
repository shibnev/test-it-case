const CURRENCY_FORMAT = new Intl.NumberFormat('ru-RU', {
  currency: 'RUB', style: 'currency'
})

export default function formatCurrency(number: number): string {
  return CURRENCY_FORMAT.format(number)
}
