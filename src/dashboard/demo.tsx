import { useRatanDashboardContext } from './hooks/useContext';
import RatanDashboard from './index';

export default function Demo() {
  const { schema } = useRatanDashboardContext();
  return <RatanDashboard schema={schema} onPanelClick={console.log} />;
}
