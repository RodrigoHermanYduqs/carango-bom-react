export function formatarMoeda(valor: string): string {
  return parseFloat(valor).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}
  