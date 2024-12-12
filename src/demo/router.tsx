import { TrackUsingDemo } from 'packages/ratan-track-using/src/demo';
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import { Login } from 'src/authentication/components/login';
import { useMFESession } from 'src/authentication/hooks/useMFESession';
import BlotterQueryDemo from 'src/blotter-query/demo';
import DashboardDemo from 'src/dashboard/demo';
import { GenericConfigExamples } from 'src/generic-config/examples';
import JsonSchemaDemo from 'src/json-schema-form/demo/json-schema-demo';
import { RSJFDemo } from 'src/json-schema-form/demo/ssi-form';
import { DemoLayout } from './layout';

export const DemoRouter = () => {
  return (
    <BrowserRouter>
      <DemoLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard-demo" replace />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard-demo"
            element={
              <RequireAuth>
                <DashboardDemo />
              </RequireAuth>
            }
          />
          <Route
            path="/json-schema-demo"
            element={
              <RequireAuth>
                <JsonSchemaDemo />
              </RequireAuth>
            }
          />
          <Route
            path="/rjsf-demo"
            element={
              <RequireAuth>
                <RSJFDemo />
              </RequireAuth>
            }
          />
          <Route
            path="/blotter-query-demo"
            element={
              <RequireAuth>
                <BlotterQueryDemo />
              </RequireAuth>
            }
          />
          <Route
            path="/generic-config-demo"
            element={
              <RequireAuth>
                <GenericConfigExamples />
              </RequireAuth>
            }
          />
          <Route
            path="/track-using-demo"
            element={
              <RequireAuth>
                <TrackUsingDemo />
              </RequireAuth>
            }
          />
        </Routes>
      </DemoLayout>
    </BrowserRouter>
  );
};

function RequireAuth({ children }: { children: JSX.Element }) {
  const { authToken } = useMFESession();
  const location = useLocation();

  if (!authToken) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
