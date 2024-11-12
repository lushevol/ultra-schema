import React from 'react';
import type { RatanDashboardPanel } from 'src/dashboard/types/panel-types';
import { GridstackProvider } from './lib/gridstack-context';
import { GridstackItem } from './lib/gridstack-item';
import { panelSchemas2gridStackOptions } from './utils';

export const DnD = ({
  children,
  panels,
}: { children: React.ReactNode; panels: RatanDashboardPanel[] }) => {
  const items = React.Children.toArray(children);
  return (
    <GridstackProvider options={panelSchemas2gridStackOptions(panels)}>
      {panels.map((item, index) => (
        <GridstackItem key={item.id} id={item.id}>
          {items[index]}
        </GridstackItem>
      ))}
    </GridstackProvider>
  );
};
