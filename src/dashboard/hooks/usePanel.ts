import { useCallback } from 'react';
import {
  useLazyQueryESQuery,
  useLazyQueryPGDailyDumpQuery,
  useLazyQueryPGQuery,
} from 'src/rtk-query/dashboardApi';
import type { RatanDashboardPanelSchema } from '../types/dashboard-types';
import type { RatanDashboardPanel } from '../types/panel-types';
import {
  convertESPanelTimelineChartData,
  convertPanelTimelineChartData,
} from '../utils/panelLineChartDataConvertor';
import {
  convertESPanelMetricsData,
  convertPanelMetricsData,
} from '../utils/panelMetricsDataConvertor';
import {
  convertESPanelPieChartData,
  convertPanelPieChartData,
} from '../utils/panelPieDataConvertor';
import {
  convertESPanelTableData,
  convertPanelTableData,
} from '../utils/panelTableDataConvertor';

export const usePanelQuery = () => {
  const [queryPG] = useLazyQueryPGQuery();
  const [queryES] = useLazyQueryESQuery();
  const [queryPGDailyDump] = useLazyQueryPGDailyDumpQuery();
  const refreshPanel = useCallback(
    async (panel: RatanDashboardPanelSchema): Promise<RatanDashboardPanel> => {
      if (panel.datasource === 'postgres_realtime') {
        const response = await queryPG({
          dataSource: panel.datasource,
          queryType: panel.queryType,
          query: panel.query,
          panelType: panel.type,
        }).unwrap();
        switch (panel.type) {
          case 'table':
            return {
              ...panel,
              data: convertPanelTableData(response),
            };
          case 'metrics':
            return {
              ...panel,
              data: convertPanelMetricsData(response),
            };
          case 'pie':
            return {
              ...panel,
              data: convertPanelPieChartData(response),
            };
          case 'timeline':
            return {
              ...panel,
              data: convertPanelTimelineChartData(response),
            };
          default:
            return { ...panel, data: null };
        }
      }

      if (panel.datasource === 'postgres_dailydump') {
        const response = await queryPGDailyDump({
          dataSource: panel.datasource,
          queryType: panel.queryType,
          query: panel.query,
          panelType: panel.type,
        }).unwrap();
        switch (panel.type) {
          case 'table':
            return {
              ...panel,
              data: convertPanelTableData(response),
            };
          case 'metrics':
            return {
              ...panel,
              data: convertPanelMetricsData(response),
            };
          case 'pie':
            return {
              ...panel,
              data: convertPanelPieChartData(response),
            };
          case 'timeline':
            return {
              ...panel,
              data: convertPanelTimelineChartData(response),
            };
          default:
            return { ...panel, data: null };
        }
      }
      if (panel.datasource === 'es') {
        const response = await queryES({
          dataSource: panel.datasource,
          queryType: panel.queryType,
          query: panel.query,
          panelType: panel.type,
        }).unwrap();
        switch (panel.type) {
          case 'table':
            return {
              ...panel,
              data: convertESPanelTableData(response),
            };
          case 'metrics':
            return {
              ...panel,
              data: convertESPanelMetricsData(response),
            };
          case 'pie':
            return {
              ...panel,
              data: convertESPanelPieChartData(response),
            };
          case 'timeline':
            return {
              ...panel,
              data: convertESPanelTimelineChartData(response),
            };
          default:
            return { ...panel, data: null };
        }
      }

      return { ...panel, data: null };
    },
    [queryPG, queryES, queryPGDailyDump],
  );

  return {
    refreshPanel,
  };
};
