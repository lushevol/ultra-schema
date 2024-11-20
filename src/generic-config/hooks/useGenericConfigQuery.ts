import type { GridOptions } from '@ag-grid-community/core';
import { gql, useSubscription } from '@apollo/client';
import { useEffect, useMemo, useState } from 'react';
import { formatQuery } from 'react-querybuilder';
import type { RuleGroupType } from 'react-querybuilder';
import type { RatanFieldSchemaType } from 'src/database/field';
import GenericConfigFieldsManagementSchema from 'src/database/generic-config-management-schema.json';
import {
  OnGenericConfigUpdatedSubscriptionDocument,
  type OnGenericConfigUpdatedSubscriptionSubscription,
  type OnGenericConfigUpdatedSubscriptionSubscriptionVariables,
  useAddGenericConfigMutationMutation,
  useGenericConfigUpdateMutationMutation,
  useLazyGenericConfigListQueryQuery,
  useRemoveGenericConfigMutationMutation,
} from 'src/graphql-schemas/documents/generic-config-doc.generated';
import type {
  GenericConfig,
  UltraQueryInput,
} from 'src/rtk-query/types.generated';
import { ratanFields2AgGridCol } from 'src/schema-utils/ratan-fields-ag-grid';
import { useAppSelector } from 'src/store';

const DEFAULT_PAGE_SIZE = 50;

export const useGenericConfigList = () => {
  const { aggrid } = useAppSelector((state) => state.aggrid);
  const [ultraQuery, setUltraQuery] = useState<UltraQueryInput>({
    query: '',
    offset: DEFAULT_PAGE_SIZE,
    index: 0,
  });

  useEffect(() => {
    aggrid?.api.addEventListener('paginationChanged', (e) => {
      console.log(e);
      const { newPage, newPageSize } = e;
      if (newPage || newPageSize) {
        const pageSize = e.api.paginationGetPageSize();
        const pageIndex = e.api.paginationGetCurrentPage();
        setUltraQuery((prev) => ({
          ...prev,
          index: pageIndex * pageSize,
          offset: pageSize,
        }));
      }
    });
  }, [aggrid]);

  const setUltraQueryQuery = (query: RuleGroupType) => {
    setUltraQuery((prev) => ({
      ...prev,
      query: formatQuery(query, { format: 'sql' }),
    }));
  };

  return {
    ultraQuery,
    setUltraQueryQuery,
  };
};

export const useGenericConfigQuery = ({
  ultraQuery,
}: { ultraQuery: UltraQueryInput }) => {
  const [queryGenericConfigList, { isLoading, data }] =
    useLazyGenericConfigListQueryQuery();

  useSubscription<
    OnGenericConfigUpdatedSubscriptionSubscription,
    OnGenericConfigUpdatedSubscriptionSubscriptionVariables
  >(gql(OnGenericConfigUpdatedSubscriptionDocument), {
    variables: {
      query: ultraQuery.query ?? '',
    },
    onData: ({ data }) => {
      console.log(data?.data?.onGenericConfigUpdated);
    },
  });

  useEffect(() => {
    queryGenericConfigList({ query: ultraQuery });
  }, [ultraQuery, queryGenericConfigList]);

  return {
    rowData: data?.genericConfigs?.data ?? [],
    isLoading,
  };
};

export const useGenericConfigMutation = () => {
  const [updateGenericConfig] = useGenericConfigUpdateMutationMutation();
  const [addGenericConfig] = useAddGenericConfigMutationMutation();
  const [removeGenericConfig] = useRemoveGenericConfigMutationMutation();

  return {
    updateGenericConfig,
    addGenericConfig,
    removeGenericConfig,
  };
};

const colDefs = ratanFields2AgGridCol(
  GenericConfigFieldsManagementSchema as RatanFieldSchemaType[],
);
export const useGenericConfigAggridOptions = (): GridOptions<GenericConfig> =>
  useMemo(
    () => ({
      getRowId: ({ data }) => data.key,
      columnDefs: colDefs,
      pagination: true,
      paginationPageSize: DEFAULT_PAGE_SIZE,
    }),
    [],
  );
