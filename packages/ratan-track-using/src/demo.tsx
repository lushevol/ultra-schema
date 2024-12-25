import { Button, Space } from 'antd';
import { useAppSelector } from 'src/store';
import { useTrackUsing } from './index';
import { parseUsersAreUsing } from './utils';

export const TrackUsingDemo = () => {
  const { keys, usersAreUsing } = useAppSelector((state) => state.trackUsing);
  const { using, stopUsing } = useTrackUsing();
  return (
    <div>
      <div>
        <p>Keys I'm using: {Array.from(keys).join(', ')}</p>
        <p>
          Users are using: {JSON.stringify(parseUsersAreUsing(usersAreUsing))}
        </p>
      </div>
      <Space>
        <Button onClick={() => using('functionA')}>I'm using functionA</Button>
        <Button onClick={() => stopUsing('functionA')}>
          I stopped using functionA
        </Button>
        <Button onClick={() => using('functionB')}>I'm using functionB</Button>
        <Button onClick={() => stopUsing('functionB')}>
          I stopped using functionB
        </Button>
      </Space>
    </div>
  );
};
