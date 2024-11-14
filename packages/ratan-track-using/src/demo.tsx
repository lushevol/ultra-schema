import { Button } from 'antd';
import { useTrackUsing } from './index';

export const TrackUsingDemo = () => {
  const { using, stopUsing } = useTrackUsing();
  return (
    <div>
      <Button onClick={() => using('demo')}>I'm using</Button>
      <Button onClick={() => stopUsing('demo')}>I stopped using</Button>
    </div>
  );
};
