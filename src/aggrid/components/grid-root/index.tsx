import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { CsvExportModule } from '@ag-grid-community/csv-export';
import { InfiniteRowModelModule } from '@ag-grid-community/infinite-row-model';
import { AdvancedFilterModule } from '@ag-grid-enterprise/advanced-filter';
import { GridChartsModule } from '@ag-grid-enterprise/charts-enterprise';
import { ClipboardModule } from '@ag-grid-enterprise/clipboard';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';
import {} from '@ag-grid-enterprise/core';
import { ExcelExportModule } from '@ag-grid-enterprise/excel-export';
import { FiltersToolPanelModule } from '@ag-grid-enterprise/filter-tool-panel';
import { MasterDetailModule } from '@ag-grid-enterprise/master-detail';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { MultiFilterModule } from '@ag-grid-enterprise/multi-filter';
import { RangeSelectionModule } from '@ag-grid-enterprise/range-selection';
import { RichSelectModule } from '@ag-grid-enterprise/rich-select';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';
import { ServerSideRowModelModule } from '@ag-grid-enterprise/server-side-row-model';
import { SetFilterModule } from '@ag-grid-enterprise/set-filter';
import { SideBarModule } from '@ag-grid-enterprise/side-bar';
import { SparklinesModule } from '@ag-grid-enterprise/sparklines';
import { StatusBarModule } from '@ag-grid-enterprise/status-bar';
import { ViewportRowModelModule } from '@ag-grid-enterprise/viewport-row-model';

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
  FiltersToolPanelModule,
  ColumnsToolPanelModule,
  RangeSelectionModule,
  SetFilterModule,
  // MenuModule,
  MultiFilterModule,
]);

const defaultColDef: ColDef = {
  flex: 1,
};

const Wrapper = styled(Box)(
  ({ theme }) => css`
  width: 100%;
  height: 100%;
  .ag-root-wrapper {
    min-height: 800px;
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
