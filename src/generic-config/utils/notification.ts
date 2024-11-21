import type { AgGridEvent } from '@ag-grid-community/core';
import cloneDeep from 'lodash/cloneDeep';
import differenceBy from 'lodash/differenceBy';
import get from 'lodash/get';
import intersectionBy from 'lodash/intersectionBy';
import { flattenKeys, getDiff } from './index';

export const isSameRecord = <T>(a: T, b: T, rowKey: string) => {
  return get(a, rowKey) === get(b, rowKey);
};

export const consumeNotification = <T extends { [k: string]: any }>(props: {
  getCurrentTableDatas: () => T[];
  dataToUpdates: T[];
  dataToDelete: T[];
  rowKey: string;
  isDataUpdated: (origin: T, newone: T) => boolean;
}): {
  isUpdate: boolean;
  newTableDatas: T[];
  addedDatas?: T[];
  updatedDatas?: T[];
  deletedDatas?: T[];
  originDatasBeUpdated?: T[];
  paginationSizeOffset?: number;
} => {
  const {
    getCurrentTableDatas,
    dataToUpdates,
    dataToDelete,
    rowKey = 'id',
    isDataUpdated,
  } = props;
  if ([dataToUpdates, dataToDelete].every((i) => i.length === 0))
    return {
      isUpdate: false,
      newTableDatas: getCurrentTableDatas(),
    };
  const blotterdataList = getCurrentTableDatas();
  const updatedDatas: T[] = [];
  const deletedDatas: T[] = [];
  const newDataList = cloneDeep(blotterdataList) as T[];
  const originDatasBeUpdated: T[] = [];
  for (let i = 0; i < newDataList.length; i++) {
    const originData = newDataList[i];
    const targetFilteredIndex = dataToUpdates.findIndex((r) =>
      isSameRecord(r, originData, rowKey),
    );
    if (targetFilteredIndex > -1) {
      const targetFilteredData = dataToUpdates.at(targetFilteredIndex) as T;
      dataToUpdates.splice(targetFilteredIndex, 1);
      if (isDataUpdated(originData, targetFilteredData)) {
        updatedDatas.push(targetFilteredData);
        originDatasBeUpdated.push(newDataList[i]);
        newDataList[i] = targetFilteredData;
      }
    }

    const targetDroppedIndex = dataToDelete.findIndex((r) =>
      isSameRecord(r, originData, rowKey),
    );
    if (targetDroppedIndex > -1) {
      const targetDroppedData = dataToDelete.at(targetDroppedIndex) as T;
      deletedDatas.push(targetDroppedData);
    }
  }
  const addedDatas: T[] = dataToUpdates;
  if ([updatedDatas, addedDatas, deletedDatas].every((i) => i.length === 0))
    return {
      isUpdate: false,
      newTableDatas: getCurrentTableDatas(),
    };

  const deletedDatasIds = deletedDatas.map((c) => get(c, rowKey));
  const newBlotterDatas = [
    ...addedDatas,
    ...newDataList.filter((c) => !deletedDatasIds.includes(get(c, rowKey))),
  ];

  const paginationSizeIncrease = addedDatas.length;

  const paginationSizeOffset = paginationSizeIncrease - deletedDatas.length;

  return {
    isUpdate: true,
    addedDatas,
    updatedDatas,
    deletedDatas,
    originDatasBeUpdated,
    newTableDatas: newBlotterDatas,
    paginationSizeOffset,
  };
};

export const updateAggridData = <T extends { [k: string]: any }>({
  aggridApi,
  addedDatas,
  flash = false,
  updatedDatas,
  deletedDatas,
  rowKey,
  originDatasBeUpdated,
  columnsToRefresh,
}: {
  aggridApi: AgGridEvent;
  rowKey: string;
  flash?: boolean;
  addedDatas?: T[];
  updatedDatas?: T[];
  deletedDatas?: T[];
  originDatasBeUpdated?: T[];
  columnsToRefresh: string[];
}): boolean => {
  if (!aggridApi) return false;
  aggridApi.api?.applyTransaction({
    update: updatedDatas,
    remove: deletedDatas,
    add: addedDatas,
    addIndex: 0,
  });

  // refresh action cell to get the latest status
  // otherwise it will not refreshed.
  if (columnsToRefresh.length) {
    const rowNodes =
      updatedDatas
        ?.map((r) => aggridApi.api.getRowNode(r.id))
        .filter((i) => !!i) ?? [];
    if (rowNodes.length > 0) {
      aggridApi.api.refreshCells({
        rowNodes: rowNodes,
        columns: columnsToRefresh,
      });
    }
  }

  if (flash) {
    flashAggrid({
      aggridApi,
      addedDatas,
      updatedDatas,
      rowKey,
      originDatasBeUpdated,
    });
  }
  return true;
};

const flashAggrid = <T extends { [k: string]: any }>({
  aggridApi,
  addedDatas,
  updatedDatas,
  rowKey,
  originDatasBeUpdated,
}: {
  aggridApi: AgGridEvent;
  rowKey: string;
  addedDatas?: T[];
  updatedDatas?: T[];
  originDatasBeUpdated?: T[];
}) => {
  // highlight changes
  // new added rows flash
  const hightlightDuration = 60 * 1000;
  if (addedDatas?.length) {
    const rowNodes = addedDatas
      .map((c) => aggridApi.api.getRowNode(get(c, rowKey)))
      .filter((i) => !!i);
    if (rowNodes.length) {
      aggridApi.api.flashCells({
        rowNodes: rowNodes,
        fadeDelay: hightlightDuration,
      });
    }
  }

  // updated rows flash
  updatedDatas?.forEach((r) => {
    const id = get(r, rowKey);
    const rowNode = aggridApi.api.getRowNode(id);
    if (!rowNode) return;
    const originData = originDatasBeUpdated?.find((o) =>
      isSameRecord(o, r, rowKey),
    );
    const columns = originData
      ? flattenKeys(getDiff<T>(originData, r))
      : undefined;
    aggridApi.api.flashCells({
      rowNodes: [rowNode],
      columns,
      fadeDelay: hightlightDuration,
    });
  });
};

export const compareDatas = <T>({
  rowKey,
  oldDatas,
  newDatas,
}: {
  rowKey: string;
  oldDatas: T[];
  newDatas: T[];
}) => {
  const datasToUpdate = intersectionBy(newDatas, oldDatas, rowKey);
  const datasToDelete = differenceBy(oldDatas, datasToUpdate, rowKey);
  const datasToAdd = differenceBy(newDatas, datasToUpdate, rowKey);
  return {
    datasToAdd,
    datasToUpdate,
    datasToDelete,
  };
};
