import DashboardCanvas from './components/canvas';
import { Panel } from './components/canvas/panel';
import { RatanDashboardContext } from './hooks/useContext';
import useDashboard from './hooks/useDashboard';
import {
  type RatanDashboardProps,
  useCalcContext,
} from './types/dashboard-context';

export default function RatanDashboard(props: RatanDashboardProps) {
  const contextValue = useCalcContext(props);
  const { panels, finalPanels, panelsLoading } = useDashboard(props.schema);
  return (
    <RatanDashboardContext.Provider value={contextValue}>
      <DashboardCanvas schema={props.schema}>
        {panels.map((panel, index) => (
          <Panel
            key={panel.id}
            panel={finalPanels[index] ?? panel}
            isLoading={panelsLoading[index]}
          />
        ))}
      </DashboardCanvas>
    </RatanDashboardContext.Provider>
  );
}
