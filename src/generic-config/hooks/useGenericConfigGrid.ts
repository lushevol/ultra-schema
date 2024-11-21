import type { ColDef, GridOptions } from '@ag-grid-community/core';
import { useCallback } from 'react';
import {
  type AgGridCustomCellRenderProps,
  JsonSchemaCellGenerator,
} from 'src/aggrid/components/CellRender/json-schema-cell';
import { useGenericConfigUpdateMutationMutation } from 'src/graphql-schemas/documents/generic-config-doc.generated';
import type { GenericConfig } from 'src/rtk-query/types.generated';
import { DEFAULT_PAGE_SIZE } from '../const/aggrid';
import { useGenericConfigChangeReactor } from './useGenericConfigChangeReactor';

const useGenericConfigCellUpdate = () => {
  const { consumeChanges } = useGenericConfigChangeReactor();
  const [updateGenericConfig] = useGenericConfigUpdateMutationMutation();
  const updateGenericConfigWrapper = useCallback(
    async (
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      newFormData: any,
      row: AgGridCustomCellRenderProps<GenericConfig>,
    ): Promise<GenericConfig> => {
      const res = await updateGenericConfig({
        key: row.data.key,
        payload: {
          config: JSON.stringify(newFormData),
        },
      });
      // biome-ignore lint/style/noNonNullAssertion: <explanation>
      const updated = res.data?.updateGenericConfig!;
      consumeChanges({
        dataToUpdates: [updated],
        dataToDelete: [],
        dataToAdd: [],
      });
      return updated;
    },
    [consumeChanges, updateGenericConfig],
  );

  const JsonSchemaCell = JsonSchemaCellGenerator<GenericConfig>({
    getSchema: (props) => JSON.parse(props.data.validation),
    getFormData: (props) => JSON.parse(props.data.config),
    updateApi: updateGenericConfigWrapper,
  });

  return {
    JsonSchemaCell,
  };
};

export const useGenericConfigAggridOptions = (): GridOptions<GenericConfig> => {
  const { JsonSchemaCell } = useGenericConfigCellUpdate();
  const colDefs: ColDef<GenericConfig>[] = [
    {
      headerName: 'Key',
      field: 'key',
    },
    {
      headerName: 'Config',
      field: 'config',
      cellRenderer: JsonSchemaCell,
      autoHeight: true,
    },
    {
      headerName: 'Version',
      field: 'version',
      width: 50,
    },
  ];
  return {
    getRowId: ({ data }) => data.key,
    columnDefs: colDefs,
    pagination: true,
    paginationPageSize: DEFAULT_PAGE_SIZE,
  };
};
