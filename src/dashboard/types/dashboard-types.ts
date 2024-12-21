export type RatanDashboardPanelSchemaType =
  | 'table'
  | 'metric'
  | 'pie'
  | 'timeline';

export type RatanDashboardPanelSchema = {
  id: string;
  title: string;
  subTitle?: string;
  unit?: 'percentage' | 'amount';
  type: RatanDashboardPanelSchemaType;
  query: RatanDashboardQueryType;
  hide?: boolean;
  layout: {
    x: number;
    y: number;
    w: number;
    h: number;
  };
};

export type RatanDashboardQueryType = {
  queries: {
    queryApi: {
      endpoint: string;
      payload: Record<string, unknown>;
      body: string[];
    };
    resultTransform: string;
  }[];
  aggregation: string;
};

export type RatanDashboardSchema = {
  title: string;
  description?: string;
  refreshInterval?: number;
  panels: RatanDashboardPanelSchema[];
};
