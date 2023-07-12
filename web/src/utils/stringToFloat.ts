export function converterStringParaFloat(stringNumero: string) {
  if (stringNumero.indexOf(',') !== -1) {
    stringNumero = stringNumero.replace(',', '.')
  }

  const numeroFloat = parseFloat(stringNumero)
  return numeroFloat
}
