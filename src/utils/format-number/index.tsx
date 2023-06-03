import { CSSProperties } from 'react';
import i18next from 'i18next';

export default function FormatNumber({
  value,
  withCurrency = true,
  styles,
}: {
  value: number;
  withCurrency?: boolean;
  styles?: { root?: CSSProperties; currency?: CSSProperties };
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
      style={styles?.root}
      className="flex items-start gap-1 font-semibold text-neutral-900"
    >
      {withCurrency && (
        <span className="text-xs font-light" style={styles?.currency}>
          {currency}
        </span>
      )}{' '}
      {price}
    </span>
  );
}
