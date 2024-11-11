import type { RatanDashboardPanelSchema } from 'src/dashboard/types/dashboard-types';
import type {
  PanelTableData,
  RatanDashboardPanel,
} from 'src/dashboard/types/panel-types';
import { TablePanel } from '../table';

export const Panel = ({ panel }: { panel: RatanDashboardPanel }) => {
  switch (panel.type) {
    case 'table':
      return (
        <TablePanel
          rows={(panel.data as PanelTableData).rows}
          columns={(panel.data as PanelTableData).columns}
        />
      );
    default:
      return null;
  }
};
