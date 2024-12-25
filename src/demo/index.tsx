import { DemoContext } from './context';
import { DemoRouter } from './router';

export const Demo = () => {
  return (
    <DemoContext>
      <DemoRouter />
    </DemoContext>
  );
};
