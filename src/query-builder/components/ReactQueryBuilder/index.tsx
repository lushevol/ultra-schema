import { DeleteOutlined } from '@ant-design/icons';
import { QueryBuilderAntD } from '@react-querybuilder/antd';
import { memo, useMemo } from 'react';
import {
  type Field,
  QueryBuilder,
  type QueryBuilderProps,
  type RuleGroupType,
  type TranslationsFull,
  add,
  defaultTranslations,
  defaultValidator,
} from 'react-querybuilder';
import type { RuleFunctionConfig } from '../RatanOne/type';
import { useMode } from './mode';
import StyledRoot from './style';
import type { CustomDateTimeFormat, Mode, Theme } from './types';
import { modeClassName } from './utils';
import { generateGetValueEditorType, getDefaultValue } from './value';

export type RatanQueryBuilderProps = QueryBuilderProps & {
  fields: Field[];
  mode?: Mode;
  theme?: Theme;
  allowDuplicateField?: boolean; // only work in simple mode
  className?: string;
  enableFn?: boolean;
  functionConfig?: RuleFunctionConfig[];
} & CustomDateTimeFormat;

const translations: TranslationsFull = {
  ...defaultTranslations,
  removeRule: {
    ...defaultTranslations.removeRule,
    // @ts-ignore
    label: <DeleteOutlined />,
  },
};

export const initialQuery: RuleGroupType = {
  combinator: 'and',
  rules: [],
};

const RatanQueryBuilder = memo(
  ({
    fields = [],
    query,
    onQueryChange,
    mode = 'simple',
    theme = 'light',
    allowDuplicateField = true,
    dateFormat,
    datetimeFormat,
    timeFormat,
    className,
    treatDateTimeAsDate,
    datePickerVariable,
    enableFn = false,
    functionConfig = [] as RuleFunctionConfig[],
    ...props
  }: RatanQueryBuilderProps) => {
    const { queryBuilderProps, FieldSelector } = useMode({
      mode,
      fields,
      allowDuplicateField,
      query,
      dateFormat,
      datetimeFormat,
      timeFormat,
      treatDateTimeAsDate,
      datePickerVariable,
      enableFn,
      functionConfig,
    });

    const getValueEditorType = useMemo(
      () => generateGetValueEditorType(fields),
      [fields],
    );

    const handleAddRule = (indexedTerm: string) => {
      onQueryChange &&
        query &&
        onQueryChange(
          add(query, { field: indexedTerm, operator: '=', value: '' }, []),
        );
    };

    const rootClassName = [`theme-${theme}`, modeClassName(mode), className]
      .filter(Boolean)
      .join(' ');

    const onQueryChangeHandler = (e) => {
      const re = { ...e };

      /**
       * @description: if enableFn and add function for fields, add the enrich attribute to the rule
       */

      re.rules = enableFn
        ? re.rules.map((item) => {
            if (item.field?.fn) {
              const field = { field: item.field.value };
              if (Object.keys(item.field.fn).length > 0) {
                return {
                  ...item,
                  ...field,
                  enrich: item.field?.fn,
                };
              }
              const { enrich, ...restItem } = item;
              return {
                ...restItem,
                ...field,
              };
            }
            if (item.enrich && item.enrich.field !== item.field) {
              const { enrich, ...restItem } = item;
              return restItem;
            }
            return item;
          })
        : re.rules;

      onQueryChange?.(re);
    };

    return (
      <StyledRoot>
        <div className={rootClassName}>
          <QueryBuilderAntD>
            <QueryBuilder
              fields={fields}
              query={query}
              onQueryChange={onQueryChangeHandler}
              autoSelectField={false}
              getDefaultValue={getDefaultValue}
              listsAsArrays
              resetOnOperatorChange
              // @ts-ignore
              getValueEditorType={getValueEditorType}
              translations={translations}
              validator={defaultValidator}
              {...queryBuilderProps}
              {...props}
            />
          </QueryBuilderAntD>
          {mode === 'simple' && (
            <div style={{ marginTop: 10 }}>
              <FieldSelector
                controlledValue={['--- Add Filter ---']}
                handleOnChange={handleAddRule}
                placeholder="--- Add Filter ---"
              />
            </div>
          )}
        </div>
      </StyledRoot>
    );
  },
);

export default RatanQueryBuilder;
