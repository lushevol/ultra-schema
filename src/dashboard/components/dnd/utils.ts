import type { GridStackOptions } from 'gridstack';
import type { RatanDashboardPanelSchema } from 'src/dashboard/types/dashboard-types';
import { GRID_OPTIONS } from './lib/constants';

export const panelSchemas2gridStackOptions = (
  panelSchemas: RatanDashboardPanelSchema[],
): GridStackOptions => {
  return {
    children: panelSchemas.map((i) => ({
      id: i.id,
      x: i.layout.x,
      y: i.layout.y,
      h: i.layout.h,
      w: i.layout.w,
    })),
    ...GRID_OPTIONS,
  };
};
