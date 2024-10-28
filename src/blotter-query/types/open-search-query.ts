import type { SettlementSchemaRootType } from '../../rtk-query/types.generated';

export type OpenSearchQuery = {
  filters: FilterModel;
  queryFields: string[];
  orderArgs: SortModel[];
  pagingOption: 'CURSOR' | 'PAGE_INDEX' | 'NO_PAGINATION';
  cursor: string;
  itermsPerPage: number;
  pageIndex: number;
};

type combinator = 'and' | 'or';

type FilterModel =
  | {
      [c in combinator]?: (FilterModel | { filter: FilterItem[] })[];
    }
  | {
      filter: FilterItem;
    };

export type FilterItem = {
  field: string;
  operator: FilterOperator;
  values: Value[];
};

type Value = string;

export type FilterOperator = 'EQ' | 'NE' | 'GT' | 'LT' | 'GTE' | 'LTE' | 'LIKE';

type SortModel = {
  orderField: string;
  orderType: 'ASC' | 'DESC';
};

type ResultCursorType = {
  previous: string;
  next: string;
} | null;

export type OpenSearchResult = {
  totalResult: number;
  pageIndex: number;
  itermsPerPage: number;
  pagingCursors: ResultCursorType;
  results: SettlementSchemaRootType[];
};
