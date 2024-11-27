import { Button, Input, Space } from 'antd';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from 'src/store';
import { setUserId } from 'src/store/slices/authentication';
import { useTrackUsing } from './index';
import { parseUsersAreUsing } from './utils';

export const TrackUsingDemo = () => {
  const { keys, usersAreUsing } = useAppSelector((state) => state.trackUsing);
  const { userId } = useAppSelector((state) => state.authentication);
  const { using, stopUsing } = useTrackUsing();
  const dispatch = useAppDispatch();
  const [tempUserId, setTempUserId] = useState(userId);
  return (
    <div>
      <Space>
        <Input
          value={tempUserId}
          onChange={(e) => setTempUserId(e.target.value)}
          allowClear
        />
        <Button
          onClick={() => dispatch(setUserId(tempUserId))}
          type="primary"
          style={{ marginLeft: 10 }}
        >
          Set User ID
        </Button>
      </Space>
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
