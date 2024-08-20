export function getFormattedAmount(totalAmount: number) {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
  }).format(totalAmount);
}
