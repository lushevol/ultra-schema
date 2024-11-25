import { renderHook } from '@testing-library/react';
import type { RuleFunctionConfig } from '../RatanOne/type';
import { initialQuery } from './export';
import { useMode } from './mode';

describe('React Query Builder Mode', () => {
  it('simple mode', () => {
    const fields = [];
    const { result } = renderHook(() =>
      useMode({
        mode: 'simple',
        fields,
        allowDuplicateField: true,
        query: initialQuery,
        enableFn: false,
        functionConfig: [] as RuleFunctionConfig[],
      }),
    );
    const { queryBuilderProps } = result.current;
    expect(queryBuilderProps.combinators).toBeDefined();
  });
  it('group mode', () => {
    const fields = [];
    const { result } = renderHook(() =>
      useMode({
        mode: 'group',
        fields,
        allowDuplicateField: true,
        query: initialQuery,
        enableFn: false,
        functionConfig: [] as RuleFunctionConfig[],
      }),
    );
    const { queryBuilderProps } = result.current;
    expect(queryBuilderProps.combinators).toBeUndefined();
  });
  it('search mode', () => {
    const fields = [];
    const { result } = renderHook(() =>
      useMode({
        mode: 'search',
        fields,
        allowDuplicateField: true,
        query: initialQuery,
        enableFn: false,
        functionConfig: [] as RuleFunctionConfig[],
      }),
    );
    const { queryBuilderProps } = result.current;
    expect(queryBuilderProps.combinators).toBeDefined();
  });
  it('group-l1-and-no-l3 mode', () => {
    const fields = [];
    const { result } = renderHook(() =>
      useMode({
        mode: 'group-l1-and-no-l3',
        fields,
        allowDuplicateField: true,
        query: initialQuery,
        enableFn: false,
        functionConfig: [] as RuleFunctionConfig[],
      }),
    );
    const { queryBuilderProps } = result.current;
    expect(queryBuilderProps.combinators).toBeUndefined();
  });
  it('group-l1-and mode', () => {
    const fields = [];
    const { result } = renderHook(() =>
      useMode({
        mode: 'group-l1-and',
        fields,
        allowDuplicateField: true,
        query: initialQuery,
        enableFn: false,
        functionConfig: [] as RuleFunctionConfig[],
      }),
    );
    const { queryBuilderProps } = result.current;
    expect(queryBuilderProps.combinators).toBeUndefined();
  });
  it('drools-rule mode', () => {
    const fields = [];
    const { result } = renderHook(() =>
      useMode({
        mode: 'drools-rule',
        fields,
        allowDuplicateField: true,
        query: initialQuery,
        enableFn: false,
        functionConfig: [] as RuleFunctionConfig[],
      }),
    );
    const { queryBuilderProps } = result.current;
    expect(queryBuilderProps.combinators).toBeUndefined();
  });
  it('drools-rule mode enableFn', () => {
    const fields = [];
    const { result } = renderHook(() =>
      useMode({
        mode: 'drools-rule',
        fields,
        allowDuplicateField: true,
        query: initialQuery,
        enableFn: true,
        functionConfig: [] as RuleFunctionConfig[],
      }),
    );
    const { queryBuilderProps } = result.current;
    expect(queryBuilderProps.combinators).toBeUndefined();
  });
});
