import { QueryBuilderAntD } from '@react-querybuilder/antd';
import { useState } from 'react';
import { QueryBuilder, type RuleGroupType } from 'react-querybuilder';
import RatanFieldSchemas from '../../database/fields-schema';
import { ratanFields2QueryBuilderFields } from '../../schema-utils/ratan-fields-to-query-builder-fields';
import 'react-querybuilder/dist/query-builder.css';
import { Button } from 'antd';
import { queryBuilder2AgGridFilter } from '../../schema-utils/query-builder-to-ag-grid-filter';
import { useAppSelector } from '../../store';

const fields = ratanFields2QueryBuilderFields(RatanFieldSchemas);

export const MyQueryBuilder = () => {
  const { aggrid } = useAppSelector((state) => state.aggrid);
  const [query, setQuery] = useState<RuleGroupType>({
    combinator: 'and',
    rules: [],
  });
  const triggerSearch = () => {
    aggrid?.api.setAdvancedFilterModel(queryBuilder2AgGridFilter(query));
  };
  return (
    <>
      <QueryBuilderAntD>
        <QueryBuilder fields={fields} query={query} onQueryChange={setQuery} />
      </QueryBuilderAntD>
      <Button onClick={triggerSearch}>Search</Button>
    </>
  );
};
