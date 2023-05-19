import i18next from 'i18next';

export default function FormatNumber({
  value,
  withCurrency = true,
  styles,
}: {
  value: number;
  withCurrency?: boolean;
  styles?: { root?: string; currency?: string };
}) {
  const format = new Intl.NumberFormat(i18next.language, {
    style: 'currency',
    currency: 'EGP',
  }).formatToParts(value);

  const currency = format.find((el) => el.type === 'currency')?.value;
  const price = format
    .filter(
      (el) => el.type !== 'currency'
      // && el.type !== 'fraction' &&
      // el.type !== 'decimal'
    )
    .reduce((p, el) => (p += el.value), '');

  return (
    <span
      className={`flex items-start gap-1 font-semibold text-neutral-900 text- ${styles?.root}`}
    >
      {withCurrency && (
        <span className={`text-xs font-light ${styles?.currency}`}>
          {currency}
        </span>
      )}{' '}
      {price}
    </span>
  );
}
