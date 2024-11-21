import type { GridReadyEvent } from '@ag-grid-community/core';
import { SearchOutlined } from '@ant-design/icons';
import { QueryBuilderAntD } from '@react-querybuilder/antd';
import { Button, Space } from 'antd';
import { useState } from 'react';
import QueryBuilder, { type RuleGroupType } from 'react-querybuilder';
import MyAgGridRoot from 'src/aggrid/components/grid-root';
import GenericConfigData from 'src/database/generic-config-data.json';
import type { GenericConfig } from 'src/rtk-query/types.generated';
import { useAppDispatch } from 'src/store';
import { setAggridEvent } from 'src/store/slices/aggrid';
import { useGenericConfigAggridOptions } from '../hooks/useGenericConfigGrid';
import {
  useGenericConfigList,
  useGenericConfigQuery,
} from '../hooks/useGenericConfigQuery';

const fields = (GenericConfigData as GenericConfig[]).map((i) => ({
  name: i.key,
  label: i.key,
  values: [],
}));

export const GenericConfigExamples = () => {
  const [tempQuery, setTempQuery] = useState<RuleGroupType>({
    combinator: 'and',
    rules: [],
  });
  const dispatch = useAppDispatch();
  const gridReadyHandler = (e: GridReadyEvent) => {
    dispatch(setAggridEvent(e));
  };

  const { ultraQuery, setUltraQueryQuery } = useGenericConfigList();
  const { rowData, isLoading } = useGenericConfigQuery({ ultraQuery });
  const gridOptions = useGenericConfigAggridOptions();

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <QueryBuilderAntD>
        <QueryBuilder
          fields={fields}
          query={tempQuery}
          onQueryChange={setTempQuery}
        />
      </QueryBuilderAntD>
      <Button
        onClick={() => setUltraQueryQuery(tempQuery)}
        type="primary"
        icon={<SearchOutlined />}
      >
        Search
      </Button>
      <MyAgGridRoot
        gridOptions={gridOptions}
        onGridReady={gridReadyHandler}
        rowData={rowData}
        loading={isLoading}
      />
    </Space>
  );
};
