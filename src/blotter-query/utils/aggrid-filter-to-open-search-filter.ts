import type {
  AdvancedFilterModel,
  ColumnAdvancedFilterModel,
  FilterModel,
  IServerSideGetRowsRequest,
  JoinAdvancedFilterModel,
} from '@ag-grid-community/core';
import { merge } from 'lodash';
import { aggridOperator2OsQueryOperator } from '../../schema-utils/query-builder-to-ag-grid-filter';
import type { FilterItem, OpenSearchQuery } from '../types/open-search-query';

export const aggridFilterToOpenSearchFilter = (
  filter: IServerSideGetRowsRequest['filterModel'],
): OpenSearchQuery['filters'] => {
  if (!filter) return {};

  if (isAdvancedFilterModel(filter)) {
    if (isJoinAdvancedFilterModel(filter)) {
      return joinAdvancedFilter2OpenSearchFilter(filter);
    }
    return {
      filter: columnAdvancedFilter2OpenSearchFilterItem(filter),
    };
  }

  return {};
};

const joinAdvancedFilter2OpenSearchFilter = (
  filter: JoinAdvancedFilterModel,
): OpenSearchQuery['filters'] => {
  return {
    [String.prototype.toLowerCase.call(filter.type)]: filter.conditions.reduce(
      (res, condition) => {
        if (isJoinAdvancedFilterModel(condition)) {
          return merge(res, joinAdvancedFilter2OpenSearchFilter(condition));
        }
        res.filter.push(columnAdvancedFilter2OpenSearchFilterItem(condition));
        return res;
      },
      { filter: [] } as { filter: FilterItem[] },
    ),
  };
};

const columnAdvancedFilter2OpenSearchFilterItem = (
  filter: ColumnAdvancedFilterModel,
): FilterItem => {
  return {
    field: filter.colId,
    operator: aggridOperator2OsQueryOperator(filter.type),
    values: [filter.filter],
  };
};

const isAdvancedFilterModel = (
  filter: FilterModel | AdvancedFilterModel,
): filter is AdvancedFilterModel => {
  // biome-ignore lint/suspicious/noPrototypeBuiltins: <explanation>
  return filter.hasOwnProperty('filterType');
};

const isJoinAdvancedFilterModel = (
  filter: AdvancedFilterModel,
): filter is JoinAdvancedFilterModel => {
  return filter.filterType === 'join';
};
