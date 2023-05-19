import { useState } from 'react';

export default function useToggle<T = boolean>(
  options: [T, T] = [false, true] as any
): [T, (value?: React.SetStateAction<T>) => void] {
  const [state, setState] = useState(options[0]);
  const toggle = (value?: React.SetStateAction<T>) => {
    if (typeof value !== 'undefined') {
      setState(value);
    } else {
      setState((current) => {
        if (current === options[0]) {
          return options[1];
        }
        return options[0];
      });
    }
  };
  return [state, toggle];
}
