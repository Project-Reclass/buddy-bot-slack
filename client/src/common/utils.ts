import { useEffect, useState } from 'react';


export function useLocalStorage(key: string, defaultValue: string = ''): [string, (_: string) => void] {
  const [val, setVal] = useState(defaultValue);

  useEffect(() => {
    const foundValue = localStorage.getItem(key);
    if (foundValue)
      setVal(foundValue);
  }, [key]);

  const handleSetVal = (val: string) => {
    localStorage.setItem(key, val);
    setVal(val);
  }

  return [val, handleSetVal]
}