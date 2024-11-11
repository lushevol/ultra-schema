export type RatanDashboardPanelSchemaType = 'table' | 'chart';
export type RatanDashboardDataSource = 'es' | 'postgres';
export type RatanDashboardQueryType = 'esSQL' | 'postgresSQL';

export type RatanDashboardPanelSchema = {
  title: string;
  description: string;
  type: RatanDashboardPanelSchemaType;
  datasource: RatanDashboardDataSource;
  queryType: RatanDashboardQueryType;
  query: string;
};

export type RatanDashboardSchema = {
  title: string;
  description: string;
  refreshInterval: string;
  panels: RatanDashboardPanelSchema[];
};
