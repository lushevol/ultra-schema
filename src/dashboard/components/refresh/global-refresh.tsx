import { ReloadOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import { useRatanDashboardContext } from 'src/dashboard/hooks/useContext';
import { useAppDispatch, useAppSelector } from 'src/store';
import {
  refreshDashboard,
  setDashboardRefreshInterval,
} from 'src/store/slices/dashboard';

export const GlobalRefresh = () => {
  const {
    schema: { refreshInterval },
  } = useRatanDashboardContext();
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
            label: '10s',
            value: 10,
          },
          {
            label: '30s',
            value: 30,
          },
          {
            label: '60s',
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
