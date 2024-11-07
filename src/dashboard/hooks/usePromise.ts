import { useEffect } from "react";

import { useState } from "react";

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
  const [isLoading, setIsLoading] = useState(true);
const [data, setData] = useState<T[]>([]);
  useEffect(() => {
    Promise.allSettled(promises).then((data) => {
      setData(
        data
          .filter((result): result is PromiseFulfilledResult<Awaited<T>> => result.status === 'fulfilled')
          .map((result) => result.value),
      );
      setIsLoading(false);
    });
  }, [promises]);
  return { data, isLoading };
};
