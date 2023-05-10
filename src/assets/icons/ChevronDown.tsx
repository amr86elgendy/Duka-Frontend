import { ReactElement, SVGProps } from 'react';

export default function ChevronDownIcon(
  props: SVGProps<SVGSVGElement>
): ReactElement {
  return (
    <svg
      width="44"
      height="44"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="#2c3e50"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}
