import { createContext, use } from 'react';
import type { BasicType } from '../types/base-types';
import type { RatanDashboardProps } from '../types/dashboard-context';
import type { RatanDashboardSchema } from '../types/dashboard-types';

export type RatanDashboardContextType = {
  schema: RatanDashboardSchema;
  onSchemaChange: (path: string, value: BasicType) => void;
  onSchemaRefresh: (schema?: RatanDashboardSchema) => void;
  onPanelClick: RatanDashboardProps['onPanelClick'];
};

export const RatanDashboardContext = createContext<RatanDashboardContextType>({
  onSchemaChange: () => {},
  onSchemaRefresh: () => {},
  onPanelClick: () => {},
  schema: {
    title: '',
    globalFilters: [],
    context: {},
    panels: [],
  },
});

export const useRatanDashboardContext = () => {
  return use(RatanDashboardContext);
};
