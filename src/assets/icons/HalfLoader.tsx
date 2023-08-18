import { ReactElement, SVGProps } from 'react';

export default function HalfLoaderIcon(
  props: SVGProps<SVGSVGElement>
): ReactElement {
  return (
    <svg
      className="animate-spin"
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
      <path d="M12 3a9 9 0 1 0 9 9" />
    </svg>
  );
}
