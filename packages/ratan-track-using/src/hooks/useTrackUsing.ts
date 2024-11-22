import { useCallback, useEffect, useRef } from 'react';
import { useLazyPostImUsingQuery } from '../../../../src/rtk-query/track-using-api';
import { useAppDispatch, useAppSelector } from '../../../../src/store';
import {
  addTrackUsingKey,
  removeTrackUsingKey,
  setUsersAreUsing,
} from '../../../../src/store/slices/track-using';

const INTERVAL_TIME = 10 * 1000;
export const useTrackUsing = () => {
  const trackingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const { keys } = useAppSelector((state) => state.trackUsing);
  const dispatch = useAppDispatch();
  const [postImUsing] = useLazyPostImUsingQuery();
  const remainTimesAfterKeysEmptyRef = useRef(1);

  const startTrackingInterval = useCallback(() => {
    if (trackingIntervalRef.current) {
      clearInterval(trackingIntervalRef.current);
    }

    const postIfKeysExist = async () => {
      if (
        keys.size > 0 ||
        (keys.size === 0 && remainTimesAfterKeysEmptyRef.current > 0)
      ) {
        const trackUsingResp = await postImUsing({
          keys: Array.from(keys),
        }).unwrap();
        dispatch(setUsersAreUsing(trackUsingResp));
        if (keys.size === 0) {
          remainTimesAfterKeysEmptyRef.current -= 1;
        } else {
          remainTimesAfterKeysEmptyRef.current = 1;
        }
      }
    };

    trackingIntervalRef.current = setInterval(postIfKeysExist, INTERVAL_TIME);
    postIfKeysExist(); // Initial post
  }, [keys, postImUsing, dispatch]);

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

  // Cleanup function
  const cleanupTracking = useCallback(() => {
    if (trackingIntervalRef.current) {
      clearInterval(trackingIntervalRef.current);
      trackingIntervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    startTrackingInterval();
    return () => {
      cleanupTracking();
    };
  }, [cleanupTracking, startTrackingInterval]);

  return {
    using,
    stopUsing,
  };
};
