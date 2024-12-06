import { TrackUsingDemo } from 'packages/ratan-track-using/src/demo';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import BlotterQueryDemo from 'src/blotter-query/demo';
import DashboardDemo from 'src/dashboard/demo';
import { GenericConfigExamples } from 'src/generic-config/examples';
import { RSJFDemo } from 'src/json-schema-form/demo/ssi-form';
import { DemoLayout } from './layout';

export const DemoRouter = () => {
  return (
    <BrowserRouter>
      <DemoLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard-demo" replace />} />
          <Route path="/dashboard-demo" element={<DashboardDemo />} />
          <Route path="/rjsf-demo" element={<RSJFDemo />} />
          <Route path="/blotter-query-demo" element={<BlotterQueryDemo />} />
          <Route
            path="/generic-config-demo"
            element={<GenericConfigExamples />}
          />
          <Route path="/track-using-demo" element={<TrackUsingDemo />} />
        </Routes>
      </DemoLayout>
    </BrowserRouter>
  );
};
