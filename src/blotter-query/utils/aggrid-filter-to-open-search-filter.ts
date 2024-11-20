import type {
  AdvancedFilterModel,
  ColumnAdvancedFilterModel,
  FilterModel,
  IServerSideGetRowsRequest,
  JoinAdvancedFilterModel,
} from '@ag-grid-community/core';
import { aggridOperator2OsQueryOperator } from '../../schema-utils/query-builder-to-ag-grid-filter';
import type {
  FilterItem,
  LogicFilter,
  OpenSearchQuery,
} from '../types/open-search-query';

export const aggridFilterToOpenSearchFilter = (
  filter: IServerSideGetRowsRequest['filterModel'],
): OpenSearchQuery['filters'] => {
  if (!filter) return {};

  if (isAdvancedFilterModel(filter)) {
    if (isJoinAdvancedFilterModel(filter)) {
      return joinAdvancedFilter2OpenSearchFilter(filter) as FilterModel;
    }
    return {
      filter: columnAdvancedFilter2OpenSearchFilterItem(filter),
    };
  }

  return {};
};

const joinAdvancedFilter2OpenSearchFilter = (
  filter: JoinAdvancedFilterModel,
): LogicFilter => {
  return {
    [String.prototype.toLowerCase.call(filter.type)]: filter.conditions.reduce(
      (res, condition) => {
        if (isJoinAdvancedFilterModel(condition)) {
          res.push(joinAdvancedFilter2OpenSearchFilter(condition));
          return res;
        }
        const filterItem = columnAdvancedFilter2OpenSearchFilterItem(condition);
        const itemWithFilter = res.find((item) => Array.isArray(item.filter));
        if (itemWithFilter) {
          itemWithFilter.filter?.push(filterItem);
        } else {
          res.push({ filter: [filterItem] });
        }
        return res;
      },
      [] as LogicFilter[],
    ),
  };
};

const columnAdvancedFilter2OpenSearchFilterItem = (
  filter: ColumnAdvancedFilterModel,
): FilterItem => {
  if (filter.filterType === 'boolean') {
    return {
      field: filter.colId,
      operator: 'EQ',
      values: [filter.type],
    };
  }
  return {
    field: filter.colId,
    operator: aggridOperator2OsQueryOperator(filter.type),
    values: [filter.filter ?? ''],
  };
};

const isAdvancedFilterModel = (
  filter: FilterModel | AdvancedFilterModel,
): filter is AdvancedFilterModel => {
  return 'filterType' in filter;
};

const isJoinAdvancedFilterModel = (
  filter: AdvancedFilterModel,
): filter is JoinAdvancedFilterModel => {
  return filter.filterType === 'join';
};
