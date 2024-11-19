import type { SettlementSchemaRootType } from '../../rtk-query/types.generated';

export type OpenSearchQuery = {
  filters: FilterModel;
  queryFields: string[];
  orderArgs: SortModel[];
  pagingOption: 'CURSOR' | 'PAGE_INDEX' | 'NO_PAGINATION';
  cursor?: string;
  itemsPerPage: number;
  pageIndex: number;
};

type combinator = 'and' | 'or';

type FilterModel = {
  and?: LogicFilter[];
  or?: LogicFilter[];
  filter?: FilterItem;
};

type LogicFilter = {
  and?: LogicFilter[];
  or?: LogicFilter[];
  filter?: FilterItem[];
};

export type FilterItem = {
  field: string;
  operator: FilterOperator;
  values: Value[];
};

type Value = string | number | boolean;

export type FilterOperator = 'EQ' | 'NE' | 'GT' | 'LT' | 'GTE' | 'LTE' | 'LIKE';

type SortModel = {
  orderField: string;
  orderType: 'ASC' | 'DESC';
};

type ResultCursorType = {
  previous: string;
  next: string;
} | null;

export type OpenSearchResult<T> = {
  totalResult: number;
  pageIndex: number;
  itemsPerPage: number;
  pagingCursors: ResultCursorType;
  results: T[];
};
