import { useCallback, useEffect, useRef } from 'react';
import { useUpdateTrackingRecordsMutationMutation } from 'src/graphql-schemas/documents/track-using-doc.generated';
import type { TrackingRecord } from 'src/rtk-query/types.generated';
import { useAppDispatch, useAppSelector } from 'src/store';
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
  const [updateTrackingRecords] = useUpdateTrackingRecordsMutationMutation();
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
        const trackUsingResp = await updateTrackingRecords({
          keys: Array.from(keys),
        }).unwrap();
        const usersAreUsing = trackUsingResp.updateTrackingRecords.reduce(
          (acc, record) => {
            acc[record.key] = [...(acc[record.key] ?? []), record];
            return acc;
          },
          {} as Record<string, TrackingRecord[]>,
        );
        dispatch(setUsersAreUsing(usersAreUsing));
        if (keys.size === 0) {
          remainTimesAfterKeysEmptyRef.current -= 1;
        } else {
          remainTimesAfterKeysEmptyRef.current = 1;
        }
      }
    };

    trackingIntervalRef.current = setInterval(postIfKeysExist, INTERVAL_TIME);
    postIfKeysExist(); // Initial post
  }, [keys, updateTrackingRecords, dispatch]);

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
