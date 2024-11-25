import { AntDValueSelector } from '@react-querybuilder/antd';
import type { OperatorSelectorProps } from 'react-querybuilder';
import { hydrationGenerationObj } from '../CustomFunction/utils/utils';
import { defaultOperatorsOnValueSourceisField } from '../operators';

export const CustomAntDOperatorSelector = (props: OperatorSelectorProps) => {
  const { schema, field } = props;
  const copyField = field as any;
  const newFieldName = copyField?.value || field;

  const { funField } = hydrationGenerationObj(newFieldName);
  const fieldConfig = schema?.fieldMap?.[funField ?? ''] as any;
  const operators = fieldConfig?.operators || [];

  if (props.rule.valueSource === 'field') {
    if (
      !defaultOperatorsOnValueSourceisField.find((i) => i.name === props.value)
    ) {
      props.handleOnChange(defaultOperatorsOnValueSourceisField[0].name);
    }
  }
  return (
    <AntDValueSelector
      {...props}
      options={operators}
      data-testid="custom-operator-selector"
    />
  );
};

CustomAntDOperatorSelector.displayName = 'CustomAntDOperatorSelector';
