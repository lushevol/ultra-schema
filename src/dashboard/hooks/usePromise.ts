import { useEffect, useRef } from 'react';

import { useState } from 'react';

export const usePromise = <T>(promise: Promise<T>) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<T | null>(null);
  useEffect(() => {
    promise.then((data) => {
      setData(data);
      setIsLoading(false);
    });
  }, [promise]);
  return { data, isLoading };
};

export const usePromiseAll = <T>(promises: Promise<T>[]) => {
  const promisesCopy = useRef([...promises]);
  const [data, setData] = useState<T[]>(Array(promises.length).fill(null));
  const [isLoading, setIsLoading] = useState<boolean[]>(
    Array(promises.length).fill(true),
  );
  useEffect(() => {
    promisesCopy.current.forEach((promise, index) => {
      promise.then((data) => {
        setData((prev) => {
          const res = [...prev];
          res[index] = data;
          return res;
        });
        setIsLoading((prev) => {
          const res = [...prev];
          res[index] = false;
          return res;
        });
      });
    });
  }, []);
  return { data, isLoading };
};
