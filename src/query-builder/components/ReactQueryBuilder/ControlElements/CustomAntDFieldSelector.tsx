import { Cascader, type Select, Space } from 'antd';
import type { ComponentPropsWithoutRef, PropsWithChildren } from 'react';
import type { VersatileSelectorProps } from 'react-querybuilder';
import { FIELD_SEPERATOR } from '../../RatanOne/config/const';
import type {
  RatanFieldCascaderOption,
  RuleFunctionConfig,
} from '../../RatanOne/type';
import { getPaths } from '../../RatanOne/utils/cascaderBuilder';
import CustomFnComp from '../CustomFunction/CustomFnComp';
import { StyleRoot } from '../CustomFunction/common/CustomFnPopContentStyle';
import { hydrationGenerationObj } from '../CustomFunction/utils/utils';
import type { FieldInput, QueryBuilderSelectorType } from '../types';

export type AntDCascaderProps = Omit<VersatileSelectorProps, 'schema'> &
  Omit<ComponentPropsWithoutRef<typeof Select>, 'onChange' | 'defaultValue'> & {
    controlledValue?: string[];
    schema?: any;
    enableFn?: boolean;
    functionConfig?: RuleFunctionConfig[];
    type?: string;
  };

export const fieldsCascaderFilter = (
  inputValue: string,
  path: RatanFieldCascaderOption[],
) =>
  path.some(
    (option) =>
      (option.label as string).toLowerCase().indexOf(inputValue.toLowerCase()) >
      -1,
  );

export const CustomAntDFieldSelector = ({
  className,
  handleOnChange,
  options,
  value,
  title,
  disabled,
  multiple,
  listsAsArrays,
  controlledValue,
  schema,
  children,
  operator,
  enableFn = false,
  functionConfig = [] as RuleFunctionConfig[],
  type = 'fieldSelctor' as QueryBuilderSelectorType,
  rule,
  level,
  // Props that should not be in extraProps
  testID: _testID,
  rules: _rules,
  path: _path,
  context: _context,
  validation: _validation,
  field: _field,
  fieldData: _fieldData,
  ...extraProps
}: PropsWithChildren<AntDCascaderProps>) => {
  const onChange = (
    value: (string | number)[],
    options: RatanFieldCascaderOption[],
  ) => {
    const leaf = options[options.length - 1];
    handleOnChange(leaf.indexedTerm);
  };

  /**
   * step 1: initial field is string.
   * step 2: choose function for first selector level1 get enrich with expression.
   * step 3: choose function for second selecotr level1 get value with expression string.
   * step 4: choose function for first selector leve2~n get field as object with fn:{expression, field}
   *
   */
  const generateFunFieldConfig = () => {
    const newValue = value as any;
    const newRule = rule as any;
    let newFieldName = value;

    if (type === 'fieldSelctor') {
      if (newRule?.enrich) {
        newFieldName = newRule.enrich.expression;
      } else if (newRule?.field?.fn) {
        newFieldName = newValue?.fn.expression;
      }
    } else newFieldName = newValue?.fn ? newValue?.fn.expression : newValue;
    const { funField } = hydrationGenerationObj(newFieldName);
    const fieldConfig = schema?.fieldMap?.[funField ?? ''] as
      | FieldInput
      | undefined;

    return getPaths(
      fieldConfig?.config ?? {
        indexedTerm: funField ?? '',
        valueList: [],
        dataType: 'number',
      },
    );
  };

  const defaultValue = enableFn
    ? generateFunFieldConfig()
    : value?.split(FIELD_SEPERATOR);

  return (
    <span
      title={title}
      className={className}
      data-testid={'custom-field-selector'}
    >
      <StyleRoot>
        <Space.Compact block className={'custom-field-fun-group'}>
          {enableFn && (
            <CustomFnComp
              handleOnChange={handleOnChange}
              type={type}
              functionConfig={functionConfig}
              schema={schema}
              selectorValue={value}
              selectorRule={rule}
              disableCascader={disabled}
              level={level}
            />
          )}
          <Cascader<RatanFieldCascaderOption>
            defaultValue={defaultValue}
            options={options}
            onChange={onChange}
            expandTrigger="hover"
            showSearch={{ filter: fieldsCascaderFilter }}
            allowClear={false}
            disabled={disabled}
            {...(controlledValue && { value: controlledValue })}
            {...extraProps}
          />
        </Space.Compact>
      </StyleRoot>
    </span>
  );
};

CustomAntDFieldSelector.displayName = 'CustomAntDFieldSelector';
