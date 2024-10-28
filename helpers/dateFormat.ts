export function dateFormate(date: Date) {
  return Intl.DateTimeFormat("pt-BR", {}).format(date)
}
