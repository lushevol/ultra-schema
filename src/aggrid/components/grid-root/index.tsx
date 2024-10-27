import { ServerSideRowModelModule } from '@ag-grid-enterprise/server-side-row-model';
import { AdvancedFilterModule } from '@ag-grid-enterprise/advanced-filter';
// Theme
import { type ColDef, ModuleRegistry } from '@ag-grid-community/core';
import { AgGridReact, type AgGridReactProps } from '@ag-grid-community/react';
// React Grid Logic
import '@ag-grid-community/styles/ag-grid.css';
// Core CSS
import '@ag-grid-community/styles/ag-theme-quartz.css';
import { Box, css, styled } from '@mui/material';

ModuleRegistry.registerModules([
  ServerSideRowModelModule,
  AdvancedFilterModule,
]);

const defaultColDef: ColDef = {
  flex: 1,
};

const Wrapper = styled(Box)(
  ({ theme }) => css`
  width: 100%;
  height: 100%;
  .ag-root-wrapper {
    min-height: 300px;
  }
`,
);

// Create new GridExample component
const MyAgGridRoot = <T,>(props: AgGridReactProps<T>) => {
  return (
    <Wrapper
      className={'ag-theme-quartz'}
      style={{ width: '100%', height: '100%' }}
    >
      <AgGridReact<T> defaultColDef={defaultColDef} {...props} />
    </Wrapper>
  );
};

export default MyAgGridRoot;
