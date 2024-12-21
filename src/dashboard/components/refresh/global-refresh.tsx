import { ReloadOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import { useAppDispatch, useAppSelector } from 'src/store';
import {
  refreshDashboard,
  setDashboardRefreshInterval,
} from 'src/store/slices/dashboard';

export const GlobalRefresh = () => {
  const refreshInterval = useAppSelector(
    (state) => state.dashboard.refreshInterval,
  );
  const dispatch = useAppDispatch();
  return (
    <div>
      <Select
        value={refreshInterval}
        onChange={(value) => {
          dispatch(setDashboardRefreshInterval(value));
        }}
        options={[
          {
            label: '10 seconds',
            value: 10,
          },
          {
            label: '30 seconds',
            value: 30,
          },
          {
            label: '60 seconds',
            value: 60,
          },
        ]}
        suffixIcon={
          <ReloadOutlined
            onClick={() => {
              dispatch(refreshDashboard());
            }}
          />
        }
      />
    </div>
  );
};
