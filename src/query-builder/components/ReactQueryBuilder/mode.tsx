import { AntDActionElement, AntDValueSelector } from '@react-querybuilder/antd';
import {
  startTransition,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type {
  Controls,
  Field,
  QueryBuilderProps,
  RuleType,
} from 'react-querybuilder';
import type {
  RatanFieldCascaderOption,
  RuleFunctionConfig,
} from '../RatanOne/type';
import {
  CustomValueEditor,
  NullComponent,
  generateFieldSelector,
  generateFieldsCascaderOptions,
} from './ControlElements/Components';
import { CustomFieldLabel } from './ControlElements/CustomFieldLabel';
import { getModePropsOfDroolsRule } from './modeSettings/droolsRule';
import type {
  CustomDateTimeFormat,
  Mode,
  QueryBuilderSelectorType,
} from './types';

const simpleModeCombinators = [
  { name: 'and', label: 'AND' },
  // { name: 'or', label: 'OR' },
];

export const useMode = ({
  mode,
  fields,
  allowDuplicateField,
  query,
  dateFormat,
  timeFormat,
  datetimeFormat,
  treatDateTimeAsDate,
  datePickerVariable,
  enableFn,
  functionConfig,
}: {
  mode: Mode;
  fields: Field[];
  allowDuplicateField: boolean;
  query: QueryBuilderProps['query'];
  enableFn: boolean;
  functionConfig: RuleFunctionConfig[];
} & CustomDateTimeFormat) => {
  const [fieldsCascaderOptions, setFieldsCascaderOptions] = useState<
    RatanFieldCascaderOption[]
  >([]);

  useEffect(() => {
    startTransition(() => {
      // search mode don't need fields cascader options
      if (mode === 'search') return;
      if (mode === 'simple' && !allowDuplicateField) {
        const disableFields: string[] = [];
        query?.rules.forEach((r) => disableFields.push((r as RuleType).field));
        const newFieldsCascaderOptions = generateFieldsCascaderOptions(
          fields,
          disableFields,
        );
        setFieldsCascaderOptions(newFieldsCascaderOptions);
      } else {
        setFieldsCascaderOptions((fco) =>
          generateFieldsCascaderOptions(fields),
        );
      }
    });
  }, [fields, query, mode]);

  const FieldSelector = useCallback(
    generateFieldSelector(fieldsCascaderOptions),
    [fieldsCascaderOptions],
  );

  const DroolsRuleFieldSelector = useCallback(
    generateFieldSelector(
      fieldsCascaderOptions,
      enableFn,
      functionConfig,
      'fieldSelctor' as QueryBuilderSelectorType,
    ),
    [fieldsCascaderOptions, functionConfig],
  );

  const ValueEditor: Controls['valueEditor'] = useMemo(() => {
    return (props) => {
      switch (props.valueSource) {
        case 'field': {
          const ValueEditorOnValueSourceEqualField = generateFieldSelector(
            generateFieldsCascaderOptions(
              // force type of field value to be same as field
              fields.filter((f) => f.inputType === props.inputType),
            ),
          );
          return <ValueEditorOnValueSourceEqualField {...props} />;
        }
        default: {
          return (
            <CustomValueEditor
              {...props}
              dateFormat={dateFormat}
              timeFormat={timeFormat}
              datetimeFormat={datetimeFormat}
              treatDateTimeAsDate={treatDateTimeAsDate}
              datePickerVariable={datePickerVariable}
              enableFn={enableFn}
              functionConfig={functionConfig}
            />
          );
        }
      }
    };
  }, [
    dateFormat,
    timeFormat,
    datetimeFormat,
    treatDateTimeAsDate,
    datePickerVariable,
    fields,
  ]);

  const DroolsRuleValueEditor: Controls['valueEditor'] = useMemo(() => {
    return (props) => {
      switch (props.valueSource) {
        case 'field': {
          let cascaderOptions = generateFieldsCascaderOptions(
            // force type of field value to be same as field
            fields.filter((f) => f.inputType === props.inputType),
          );
          const newRule = props?.rule as any;
          const newType = newRule.enrich?.resultType.toLowerCase();

          if (enableFn && newType) {
            // force type of field value to be same as function return type
            cascaderOptions = generateFieldsCascaderOptions(
              fields.filter((f) => f.inputType === newType),
            );
          }
          const ValueEditorOnValueSourceEqualField = generateFieldSelector(
            cascaderOptions,
            enableFn,
            functionConfig,
            'valueEditor' as QueryBuilderSelectorType,
          );
          return <ValueEditorOnValueSourceEqualField {...props} />;
        }
        default: {
          return (
            <CustomValueEditor
              {...props}
              dateFormat={dateFormat}
              timeFormat={timeFormat}
              datetimeFormat={datetimeFormat}
              treatDateTimeAsDate={treatDateTimeAsDate}
              datePickerVariable={datePickerVariable}
              enableFn={enableFn}
              functionConfig={functionConfig}
            />
          );
        }
      }
    };
  }, [
    dateFormat,
    timeFormat,
    datetimeFormat,
    treatDateTimeAsDate,
    datePickerVariable,
    fields,
    functionConfig.toString(),
  ]);

  const queryBuilderProps = useMemo(() => {
    let props: QueryBuilderProps = {};

    switch (mode) {
      case 'simple':
        props = {
          combinators: simpleModeCombinators,
          controlElements: {
            addGroupAction: NullComponent,
            addRuleAction: NullComponent,
            removeRuleAction: (props) => (
              <AntDActionElement {...props} danger type="default" />
            ),
            combinatorSelector: NullComponent,
            fieldSelector: FieldSelector,
            valueEditor: ValueEditor,
          },
          onAddGroup: () => false,
        };
        break;

      case 'search':
        props = {
          combinators: simpleModeCombinators,
          controlElements: {
            addGroupAction: NullComponent,
            addRuleAction: NullComponent,
            removeRuleAction: NullComponent,
            combinatorSelector: NullComponent,
            fieldSelector: CustomFieldLabel,
            valueEditor: ValueEditor,
            operatorSelector: (props) =>
              props.fieldData.operators?.length === 1 ? null : (
                <AntDValueSelector {...props} />
              ),
          },
          onAddGroup: () => false,
          onAddRule: () => false,
        };
        break;

      case 'group':
        props = {
          controlClassnames: { queryBuilder: 'queryBuilder-branches' },
          controlElements: {
            removeRuleAction: (props) => (
              <AntDActionElement {...props} danger type="default" />
            ),
            fieldSelector: FieldSelector,
            valueEditor: ValueEditor,
          },
        };
        break;

      // level 1 only and, and only can add group for level 2, no level 3.
      case 'group-l1':
      case 'group-l1-and-no-l3':
        props = {
          controlClassnames: { queryBuilder: 'queryBuilder-branches' },
          controlElements: {
            addGroupAction: (props) =>
              props.level === 0 ? <AntDActionElement {...props} /> : null,
            removeRuleAction: (props) => (
              <AntDActionElement {...props} danger type="default" />
            ),
            combinatorSelector: (props) =>
              props.level !== 0 ? <AntDValueSelector {...props} /> : null,
            fieldSelector: FieldSelector,
            valueEditor: ValueEditor,
          },
        };
        break;

      // level 1 only 'and' combinator, no limits on level depth.
      case 'group-l1-and':
        props = {
          controlClassnames: { queryBuilder: 'queryBuilder-branches' },
          controlElements: {
            removeRuleAction: (props) => (
              <AntDActionElement {...props} danger type="default" />
            ),
            combinatorSelector: (props) => (
              <AntDValueSelector
                {...props}
                disabled={props.disabled || props.level === 0}
              />
            ),
            fieldSelector: FieldSelector,
            valueEditor: ValueEditor,
          },
        };
        break;

      case 'drools-rule':
        props = getModePropsOfDroolsRule({
          FieldSelector: DroolsRuleFieldSelector,
          ValueEditor: DroolsRuleValueEditor,
        });
        break;
      default:
        break;
    }
    return props;
  }, [
    mode,
    FieldSelector,
    DroolsRuleFieldSelector,
    ValueEditor,
    DroolsRuleValueEditor,
  ]);

  return {
    queryBuilderProps,
    fieldsCascaderOptions,
    FieldSelector,
  };
};
