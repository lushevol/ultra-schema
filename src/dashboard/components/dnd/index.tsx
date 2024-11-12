import React, { useMemo } from 'react';
import type { RatanDashboardPanel } from 'src/dashboard/types/panel-types';
import { GridstackItem, GridstackProvider } from './lib';
import { panelSchemas2gridStackOptions } from './utils';
import 'gridstack/dist/gridstack.min.css';

export const DnD = ({
  children,
  panels,
}: { children: React.ReactNode; panels: RatanDashboardPanel[] }) => {
  const items = React.Children.toArray(children);
  const gridOptions = useMemo(
    () => panelSchemas2gridStackOptions(panels),
    [panels],
  );
  return (
    <GridstackProvider options={gridOptions}>
      {panels.map((item, index) => (
        <GridstackItem key={item.id} id={item.id}>
          {items[index]}
        </GridstackItem>
      ))}
    </GridstackProvider>
  );
};
