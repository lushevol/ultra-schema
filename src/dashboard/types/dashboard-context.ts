import { set } from 'lodash';
import { useCallback, useState } from 'react';
import type { RatanDashboardContextType } from '../hooks/useContext';
import type { BasicType } from './base-types';
import type { ClickMetadata } from './click';
import type { RatanDashboardSchema } from './dashboard-types';
import type { RatanDashboardPanel } from './panel-types';

export type RatanDashboardProps = {
  onPanelClick: (schema: RatanDashboardPanel, metadata: ClickMetadata) => void;
  schema: RatanDashboardSchema;
};

export const useCalcContext = ({
  schema,
  onPanelClick,
}: RatanDashboardProps): RatanDashboardContextType => {
  const [schemaCopy, setSchemaCopy] = useState<RatanDashboardSchema>(
    JSON.parse(JSON.stringify(schema)),
  );
  const onSchemaChange = useCallback((path: string, value: BasicType) => {
    setSchemaCopy((s) => {
      const sc = JSON.parse(JSON.stringify(s));
      set(sc, path, value);
      return sc;
    });
  }, []);

  const onSchemaRefresh = useCallback((schema?: RatanDashboardSchema) => {
    setSchemaCopy((s) => {
      return JSON.parse(JSON.stringify(schema ?? s));
    });
  }, []);

  return {
    schema: schemaCopy,
    onSchemaChange,
    onSchemaRefresh,
    onPanelClick,
  };
};
