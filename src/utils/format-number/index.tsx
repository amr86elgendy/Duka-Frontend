import i18next from 'i18next';

export default function FormatNumber({ value }: { value: number }) {
  const format = new Intl.NumberFormat(i18next.language, {
    style: 'currency',
    currency: 'EGP',
  }).formatToParts(value);

  const currency = format.find((el) => el.type === 'currency')?.value;
  const price = format
    .filter((el) => el.type !== 'price' && el.type !== 'currency')
    .reduce((p, el) => (p += el.value), '');

  return (
    <h3 className="flex items-start gap-1 mb-4 text-xl font-semibold text-neutral-900">
      <span className="text-sm font-light">{currency}</span> {price}
    </h3>
  );
}
