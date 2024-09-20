
export function plural(value, variants = {}, locale = 'ru-RU') {
  const key = new Intl.PluralRules(locale).select(value);
  return variants[key] || '';
}
export function formatPrice(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}
