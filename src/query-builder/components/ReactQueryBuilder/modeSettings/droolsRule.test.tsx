import type { ValueSourceSelectorProps } from 'react-querybuilder';
import {
  getModePropsOfDroolsRule,
  getValueSourceSelectorProps,
} from './droolsRule';

describe('droolsRule mode settings', () => {
  it('getModePropsOfDroolsRule should be work', () => {
    const props = getModePropsOfDroolsRule({
      FieldSelector: jest.fn(),
      ValueEditor: jest.fn(),
    });
    expect(props.controlElements?.addRuleAction).toBeDefined();
  });
  it('getValueSourceSelectorProps', () => {
    const props = {
      className: 'rule-value',
      handleOnChange: jest.fn(),
      options: [],
      value: '=',
      title: 'title',
      disabled: false,
      path: [6],
      level: 3,
      rule: {
        field: 'test',
        operator: '=',
        value: '',
        valueSource: 'field',
      },
      field: '',
    } as unknown as ValueSourceSelectorProps;
    const newProps = getValueSourceSelectorProps(props);
    expect(newProps.options).toStrictEqual([{ name: 'value', label: 'value' }]);
  });
});
