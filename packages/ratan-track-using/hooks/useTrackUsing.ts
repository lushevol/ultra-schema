import { useCallback } from 'react';
import { useAppDispatch } from '../../../src/store';
import {
  addTrackUsingKey,
  removeTrackUsingKey,
} from '../../../src/store/slices/track-using';

export const useTrackUsing = () => {
  const dispatch = useAppDispatch();

  const using = useCallback(
    (key: string) => {
      dispatch(addTrackUsingKey(key));
    },
    [dispatch],
  );

  const stopUsing = useCallback(
    (key: string) => {
      dispatch(removeTrackUsingKey(key));
    },
    [dispatch],
  );

  return {
    using,
    stopUsing,
  };
};
