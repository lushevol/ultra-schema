export type ClickMetadata = {
  position:
    | 'metric-value'
    | 'metric-sub-title'
    | 'table-header'
    | 'table-value';
  rowIndex?: number;
  columnName?: string;
};
