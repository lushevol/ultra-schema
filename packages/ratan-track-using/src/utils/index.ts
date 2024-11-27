import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import type { TrackingRecord } from 'src/rtk-query/types.generated';

dayjs.extend(relativeTime);

export const parseUsersAreUsing = (
  usersAreUsing: Record<string, TrackingRecord[]>,
): Record<string, Omit<TrackingRecord, 'id' | 'key'>[]> => {
  return Object.entries(usersAreUsing).reduce(
    (acc, [key, records]) => {
      acc[key] = records.map((record) => ({
        timestamp: dayjs(record.timestamp).fromNow(),
        userId: record.userId,
      }));
      return acc;
    },
    {} as Record<string, Omit<TrackingRecord, 'id' | 'key'>[]>,
  );
};
