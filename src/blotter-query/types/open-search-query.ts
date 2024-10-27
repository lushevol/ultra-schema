import type { SettlementSchemaRootType } from '../../rtk-query/types.generated';

export type OpenSearchQuery = {
  filter: FilterModel;
  sort: SortModel[];
  size: number;
  index: number;
};

type combinator = 'and' | 'or';

type FilterModel = {
  [c in combinator]?: (FilterModel | FilterItem)[];
};

type FilterItem = {
  field: string;
  operator: FilterOperator;
  values: Value[];
};

type Value = string | number | boolean;

type FilterOperator = 'EQ' | 'NE' | 'GT' | 'LT' | 'GTE' | 'LTE';

type SortModel = {
  field: string;
  order: 'asc' | 'desc';
};

export type OpenSearchResult = {
  total: number;
  data: SettlementSchemaRootType[];
};
