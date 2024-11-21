import type { AgGridEvent } from '@ag-grid-community/core';
import type { GenericConfig } from 'src/rtk-query/types.generated';

// returns diff object which only contains different key path with obj2 value.
export const getDiff = <T extends { [k: string]: any }>(obj1: T, obj2: T) => {
  const diff: { [k: string]: any } = {};
  Object.keys(obj1).forEach((key) => {
    if (
      typeof obj1[key] === 'object' &&
      obj1[key] !== null &&
      typeof obj2[key] === 'object' &&
      obj2[key] !== null
    ) {
      diff[key] = getDiff(obj1[key], obj2[key]);
    } else if (obj1[key] !== obj2[key]) {
      diff[key] = obj2[key];
    }
  });
  return diff;
};

// { a: 1, b: { c: 2, d: { e: 3 } } } => ["a", "b.c", "b.d.e"]
export const flattenKeys = (
  obj: { [k: string]: any },
  prefix = '',
): string[] => {
  return Object.keys(obj).reduce<string[]>((acc, key) => {
    const path = prefix ? `${prefix}.${key}` : key;
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      const nested = flattenKeys(obj[key], path);
      return [...acc, ...nested];
    }
    return [...acc, path];
  }, []);
};

export const getAllRowDatas = (aggridApi: AgGridEvent) => {
  const datas: GenericConfig[] = [];
  aggridApi.api.forEachNode((node) => datas.push(node.data as GenericConfig));
  return datas;
};
