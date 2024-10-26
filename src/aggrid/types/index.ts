import type { ColDef } from '@ag-grid-community/core';

export type MyAgGridProps<T> = {
  rowData: T[];
  colDefs: ColDef<T>[];
};
