import * as Highcharts from 'highcharts';
import { HighchartsReact } from 'highcharts-react-official';

// The integration exports only a default component that at the same time is a
// namespace for the related Props interface (HighchartsReact.Props) and
// RefObject interface (HighchartsReact.RefObject). All other interfaces
// like Options come from the Highcharts module itself.
export const RatanHighcharts = (props: HighchartsReact.Props) => {
  return <HighchartsReact highcharts={Highcharts} {...props} />;
};
