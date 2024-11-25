import type { Field } from 'react-querybuilder';
import type {
  RatanFieldCascaderOption,
  RuleFunctionConfig,
} from '../../RatanOne/type';
import cascaderBuilder from '../../RatanOne/utils/cascaderBuilder';
import type { QueryBuilderSelectorType } from '../types';
import { CustomAntDFieldSelector } from './CustomAntDFieldSelector';
import { CustomAntDValueEditor } from './CustomAntDValueEditor';

export const NullComponent = () => null;

export const CustomValueEditor = (props) => (
  <CustomAntDValueEditor {...props} />
);

export const generateFieldsCascaderOptions = (
  fields: Field[],
  disableFields: string[] = [],
) =>
  cascaderBuilder(
    fields.map((i) => ({
      ...i.config,
      disabled: disableFields.includes(i.name),
    })),
  );

export const generateFieldSelector =
  (
    fieldsCascaderOptions: RatanFieldCascaderOption[],
    enableFn?: boolean,
    functionConfig?: RuleFunctionConfig[],
    type?: QueryBuilderSelectorType,
  ) =>
  (props) => (
    <CustomAntDFieldSelector
      {...props}
      options={fieldsCascaderOptions}
      enableFn={enableFn}
      functionConfig={functionConfig}
      type={type}
    />
  );
