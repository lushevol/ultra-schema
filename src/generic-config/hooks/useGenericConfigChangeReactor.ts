import { useCallback } from 'react';
import type { GenericConfig } from 'src/rtk-query/types.generated';
import { useAppSelector } from 'src/store';
import { getAllRowDatas } from '../utils';
import { updateAggridData } from '../utils/notification';

export const useGenericConfigChangeReactor = () => {
  const aggrid = useAppSelector((state) => state.aggrid);
  const consumeChanges = useCallback(
    ({
      dataToUpdates,
      dataToDelete,
      dataToAdd,
    }: {
      dataToUpdates: GenericConfig[];
      dataToDelete: GenericConfig[];
      dataToAdd: GenericConfig[];
    }) => {
      if (aggrid.aggrid?.api) {
        updateAggridData({
          aggridApi: aggrid.aggrid,
          rowKey: 'key',
          flash: true,
          addedDatas: dataToAdd,
          updatedDatas: dataToUpdates,
          deletedDatas: dataToDelete,
          originDatasBeUpdated: getAllRowDatas(aggrid.aggrid),
          columnsToRefresh: ['config'],
        });
      }
    },
    [aggrid.aggrid],
  );

  return {
    consumeChanges,
  };
};
