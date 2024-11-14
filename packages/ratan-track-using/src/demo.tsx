import { Button } from 'antd';
import { useTrackUsing } from './index';

export const TrackUsingDemo = () => {
  const { using, stopUsing } = useTrackUsing();
  return (
    <div>
      <Button onClick={() => using('functionA')}>I'm using functionA</Button>
      <Button onClick={() => stopUsing('functionA')}>
        I stopped using functionA
      </Button>
      <Button onClick={() => using('functionB')}>I'm using functionB</Button>
      <Button onClick={() => stopUsing('functionB')}>
        I stopped using functionB
      </Button>
    </div>
  );
};
