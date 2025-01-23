import { useEffect, useRef, useState } from 'react';

interface ContainerHeight {
  height: string | number;
  ref: React.RefObject<HTMLDivElement>;
}

export const useContainerHeight = (itemCount: number, itemHeight = 138): ContainerHeight => {
  const [height, setHeight] = useState<string | number>('auto');
  const ref = useRef<HTMLDivElement>(null);
  const previousCountRef = useRef(itemCount);

  useEffect(() => {
    if (ref.current) {
      const heightChange = (itemCount - previousCountRef.current) * itemHeight;
      const newHeight = ref.current.scrollHeight + heightChange;
      setHeight(`${newHeight}px`);
      
      window.scroll({
        top: window.scrollY + heightChange,
        behavior: 'smooth',
      });
      
      previousCountRef.current = itemCount;
    }
  }, [itemCount, itemHeight]);

  useEffect(() => {
    if (ref.current) {
      setHeight('auto');
    }
  }, []);

  return {
    height,
    ref,
  };
};
