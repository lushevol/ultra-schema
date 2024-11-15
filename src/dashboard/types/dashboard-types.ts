export type RatanDashboardPanelSchemaType =
  | 'table'
  | 'chart'
  | 'metrics'
  | 'pie'
  | 'timeline';
export type RatanDashboardDataSource = 'es' | 'postgres';
export type RatanDashboardQueryType = 'esSQL' | 'postgresSQL';

export type RatanDashboardPanelSchema = {
  id: string;
  title: string;
  description: string;
  type: RatanDashboardPanelSchemaType;
  datasource: RatanDashboardDataSource;
  queryType: RatanDashboardQueryType;
  query: string;
  hide?: boolean;
  layout: {
    x: number;
    y: number;
    w: number;
    h: number;
  };
};

export type RatanDashboardSchema = {
  title: string;
  description: string;
  refreshInterval: string;
  panels: RatanDashboardPanelSchema[];
};
