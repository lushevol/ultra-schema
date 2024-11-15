import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from 'src/store';
import DashboardCanvas from './components/canvas';
import { Panel } from './components/canvas/panel';
import useDashboard from './hooks/useDashboard';

export default function Demo() {
  const schema = useSelector((state: RootState) => state.dashboard.schema);
  const { panels, finalPanels, panelsLoading } = useDashboard(schema);
  return (
    <DashboardCanvas schema={schema}>
      {panels.map((panel, index) => (
        <Panel
          key={panel.id}
          panel={finalPanels[index] ?? panel}
          isLoading={panelsLoading[index]}
        />
      ))}
    </DashboardCanvas>
  );
}
