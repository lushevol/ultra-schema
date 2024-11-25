import { render, screen } from '@testing-library/react';
import type { ValueSource } from 'react-querybuilder';
import { RatanFieldCascaderOption } from '../../RatanOne/type';
import { CustomAntDFieldSelector } from './CustomAntDFieldSelector';

afterAll(() => {
  jest.clearAllMocks();
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe('CustomAntDFieldSelector component', () => {
  it('should be in the document', async () => {
    const props = {
      className: 'rule-value',
      handleOnChange: jest.fn(),
      options: [],
      value: '200',
      title: 'title',
      disabled: false,
      multiple: false,
      listsAsArrays: true,
      path: [6],
      level: 3,
    };
    const { getByTestId } = render(<CustomAntDFieldSelector {...props} />);
    const multipleInputNumber = getByTestId('custom-field-selector');
    expect(multipleInputNumber).toBeDefined();
  });
  it('renders CustomFnComp when enableFn is true', async () => {
    const options = [
      {
        disabled: false,
        label: 'Trade',
        value: 'Trade',
        children: [
          {
            label: 'AACode Comments',
            value: 'AACode_Comments',
            disabled: false,
            children: [],
            indexedTerm: 'AACode_Comments',
            businessTerm: '',
            dataType: 'text',
            subSelection: 'Trade',
            context: 'TRANSACTION_DATA',
            displayStyle: 'freeText',
            valueList: [],
            operators: 'EQ',
            operatorsSupp: '==,!=',
            detailsFixed: false,
            dynamicList: false,
            disabledView: true,
            disabledFilter: true,
            scope:
              '{"disabledBlotter":["TRADE_BLOTTER","CASHFLOW_BLOTTER"],"enabledQueryResult":[],"fieldTags":[],"displayName":"","version":"v1.1.0"}',
            detailsGroup: '',
            seq: 2446,
            blotterContext: ['TRANSACTION_DATA'],
          },
        ],
      },
    ];
    const handleOnChange = jest.fn();

    const mockFunctionConfig = [
      {
        displayName: 'Split',
        description:
          'Case: FieldA(value is "AAA_BBB") using Split("_",1) \nResult is "AAA"',
        functionName: 'split',
        parameters: [
          {
            paramType: 'TEXT',
            renderComp: 'FunInput',
            defaultValue: '',
          },
          {
            paramType: 'NUMBER',
            renderComp: 'FunInputNumber',
            defaultValue: '',
          },
        ],
        methodReturnType: [
          {
            paramType: 'TEXT',
            renderComp: 'FunInput',
            defaultValue: '',
          },
        ],
        supportTargetObjectClass: ['TEXT'],
      },
    ];
    const mockRule = {
      id: 'a61a5822-5da6-4a0c-9f54-1fcddc5a6749',
      field: 'AACode_Comments',
      operator: '=',
      valueSource: 'value' as ValueSource,
      value: '',
    };

    const mockSchema = {
      fieldMap: {
        AACode_Comments: {
          name: 'AACode_Comments',
          label: 'AACode_Comments',
          inputType: 'text',
          values: [],
          operators: [
            {
              name: '=',
              label: '=',
            },
            {
              name: '!=',
              label: '!=',
            },
            {
              name: 'null',
              label: 'is null',
            },
            {
              name: 'notNull',
              label: 'is not null',
            },
            {
              name: 'in',
              label: 'in',
            },
            {
              name: 'notIn',
              label: 'not in',
            },
            {
              name: 'matches',
              value: 'matches',
              label: 'matches',
            },
            {
              name: 'notMatches',
              value: 'notMatches',
              label: 'not matches',
            },
            {
              name: 'empty',
              value: 'empty',
              label: 'is empty',
            },
            {
              name: 'notEmpty',
              value: 'notEmpty',
              label: 'is not empty',
            },
          ],
          config: {
            indexedTerm: 'AACode_Comments',
            businessTerm: '',
            dataType: 'text',
            subSelection: 'Trade',
            context: 'TRANSACTION_DATA',
            displayStyle: 'freeText',
            valueList: [],
            operators: 'EQ',
            operatorsSupp: '==,!=',
            detailsFixed: false,
            dynamicList: false,
            disabledView: true,
            disabledFilter: true,
            scope:
              '{"disabledBlotter":["TRADE_BLOTTER","CASHFLOW_BLOTTER"],"enabledQueryResult":[],"fieldTags":[],"displayName":"","version":"v1.1.0"}',
            detailsGroup: '',
            seq: 2446,
            blotterContext: ['TRANSACTION_DATA'],
          },
          valueSources: ['value', 'field'],
        },
      },
    };
    render(
      <CustomAntDFieldSelector
        className="testClassFun"
        //@ts-ignore
        options={options}
        handleOnChange={handleOnChange}
        enableFn={true}
        functionConfig={mockFunctionConfig}
        value="testFiled"
        rule={mockRule}
        schema={mockSchema}
        title="testTitle"
        disabled={false}
        multiple={false}
        listsAsArrays={true}
        type={'fieldSelctor'}
        path={[6]}
        level={1}
      />,
    );

    expect(screen.getByTestId('custom-field-selector')).toBeInTheDocument();
  });
});
