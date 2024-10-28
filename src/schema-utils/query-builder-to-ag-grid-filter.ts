import type {
  ColumnAdvancedFilterModel,
  JoinAdvancedFilterModel,
  TextAdvancedFilterModel,
} from '@ag-grid-community/core';
import { filter } from 'lodash';
import { isRuleGroup, type RuleGroupType } from 'react-querybuilder';
import type { FilterOperator } from '../blotter-query/types/open-search-query';

export const queryBuilder2AgGridFilter = (
  query: RuleGroupType,
): JoinAdvancedFilterModel => {
  return {
    filterType: 'join',
    type: String.prototype.toUpperCase.call(
      query.combinator,
    ) as JoinAdvancedFilterModel['type'],
    conditions: query.rules.map((rule) => {
      if (isRuleGroup(rule)) {
        return queryBuilder2AgGridFilter(rule);
      }
      return {
        filterType: 'text',
        colId: rule.field,
        type: queryBuilderOperator2AgGridOperator(
          rule.operator,
        ) as TextAdvancedFilterModel['type'],
        filter: rule.value,
      } as ColumnAdvancedFilterModel;
    }),
  };
};

// query builder DefaultOperatorName: "=" | "!=" | "<" | ">" | "<=" | ">=" | "contains" | "beginsWith" | "endsWith" | "doesNotContain" | "doesNotBeginWith" | "doesNotEndWith" | "null" | "notNull" | "in" | "notIn" | "between" | "notBetween"
// aggrid operators: 'equals' | 'notEqual' | 'contains' | 'notContains' | 'startsWith' | 'endsWith' | 'blank' | 'notBlank'
// 'equals' | 'notEqual' | 'lessThan' | 'lessThanOrEqual' | 'greaterThan' | 'greaterThanOrEqual' | 'blank' | 'notBlank';
export const operatorMatrix: {
  qb: string;
  aggrid: string;
  osQuery: FilterOperator;
}[] = [
  {
    qb: '=',
    aggrid: 'equals',
    osQuery: 'EQ',
  },
  {
    qb: '!=',
    aggrid: 'notEqual',
    osQuery: 'NE',
  },
  {
    qb: '<',
    aggrid: 'lessThan',
    osQuery: 'LT',
  },
  {
    qb: '>',
    aggrid: 'greaterThan',
    osQuery: 'GT',
  },
  {
    qb: '<=',
    aggrid: 'lessThanOrEqual',
    osQuery: 'LTE',
  },
  {
    qb: '>=',
    aggrid: 'greaterThanOrEqual',
    osQuery: 'GTE',
  },
  {
    qb: 'contains',
    aggrid: 'contains',
    osQuery: 'LIKE',
  },
];

export const queryBuilderOperator2AgGridOperator = (
  operator: string,
): string => {
  return filter(operatorMatrix, { qb: operator })[0].aggrid;
};

export const aggridOperator2OsQueryOperator = (
  operator: string,
): FilterOperator => {
  return filter(operatorMatrix, { aggrid: operator })[0].osQuery;
};
