import { useEffect, useState } from 'react';
import { formatQuery } from 'react-querybuilder';
import type { RuleGroupType } from 'react-querybuilder';
import {
  useAddGenericConfigMutationMutation,
  useGenericConfigUpdateMutationMutation,
  useLazyGenericConfigListQueryQuery,
  useRemoveGenericConfigMutationMutation,
} from 'src/graphql-schemas/documents/generic-config-doc.generated';
import type { UltraQueryInput } from 'src/rtk-query/types.generated';
import { useAppSelector } from 'src/store';
import { DEFAULT_PAGE_SIZE } from '../const/aggrid';

export const useGenericConfigList = () => {
  const { aggrid } = useAppSelector((state) => state.aggrid);
  const [ultraQuery, setUltraQuery] = useState<UltraQueryInput>({
    query: '',
    offset: DEFAULT_PAGE_SIZE,
    index: 0,
  });

  useEffect(() => {
    aggrid?.api.setGridOption('onPaginationChanged', (e) => {
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

  useEffect(() => {
    queryGenericConfigList({ ultraQueryInput: ultraQuery });
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
