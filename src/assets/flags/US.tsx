import { ReactElement, SVGProps } from 'react';

export default function GB(props: SVGProps<SVGSVGElement>): ReactElement {
  return (
    // <svg
    //   xmlns="http://www.w3.org/2000/svg"
    //   id="flag-icons-us"
    //   viewBox="0 0 512 512"
    //   {...props}
    // >
    //   <path fill="#bd3d44" d="M0 0h512v512H0" />
    //   <path
    //     stroke="#fff"
    //     strokeWidth="40"
    //     d="M0 58h512M0 137h512M0 216h512M0 295h512M0 374h512M0 453h512"
    //   />
    //   <path fill="#192f5d" d="M0 0h390v275H0z" />
    //   <marker id="a" markerHeight="30" markerWidth="30">
    //     <path fill="#fff" d="m15 0 9.3 28.6L0 11h30L5.7 28.6" />
    //   </marker>
    //   <path
    //     fill="none"
    //     d="m0 0 18 11h65 65 65 65 66L51 39h65 65 65 65L18 66h65 65 65 65 66L51 94h65 65 65 65L18 121h65 65 65 65 66L51 149h65 65 65 65L18 177h65 65 65 65 66L51 205h65 65 65 65L18 232h65 65 65 65 66L0 0"
    //   />
    // </svg>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      id="flag-icons-gb"
      viewBox="0 0 512 512"
      {...props}
    >
      <path fill="#012169" d="M0 0h512v512H0z" />
      <path
        fill="#FFF"
        d="M512 0v64L322 256l190 187v69h-67L254 324 68 512H0v-68l186-187L0 74V0h62l192 188L440 0z"
      />
      <path
        fill="#C8102E"
        d="m184 324 11 34L42 512H0v-3l184-185zm124-12 54 8 150 147v45L308 312zM512 0 320 196l-4-44L466 0h46zM0 1l193 189-59-8L0 49V1z"
      />
      <path fill="#FFF" d="M176 0v512h160V0H176zM0 176v160h512V176H0z" />
      <path fill="#C8102E" d="M0 208v96h512v-96H0zM208 0v512h96V0h-96z" />
    </svg>
  );
}
