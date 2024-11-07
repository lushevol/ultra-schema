export type RatanDashboardPanelType = 'table' | 'chart';
export type RatanDashboardDataSource = 'es' | 'postgres';
export type RatanDashboardQueryType = 'esSQL' | 'postgresSQL';

export type RatanDashboardPanel = {
  title: string;
  description: string;
  type: RatanDashboardPanelType;
  datasource: RatanDashboardDataSource;
  queryType: RatanDashboardQueryType;
  query: string;
};

export type RatanDashboardSchema = {
  title: string;
  description: string;
  refreshInterval: string;
  panels: RatanDashboardPanel[];
};
