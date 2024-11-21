import { gql, useSubscription } from '@apollo/client';
import {
  OnGenericConfigUpdatedSubscriptionDocument,
  type OnGenericConfigUpdatedSubscriptionSubscription,
  type OnGenericConfigUpdatedSubscriptionSubscriptionVariables,
} from 'src/graphql-schemas/documents/generic-config-doc.generated';
import {
  type GenericConfig,
  GenericConfigChangeStatus,
  type UltraQueryInput,
} from 'src/rtk-query/types.generated';
import { useGenericConfigChangeReactor } from './useGenericConfigChangeReactor';

export const useGenericConfigSubscriptions = ({
  ultraQuery,
}: { ultraQuery: UltraQueryInput }) => {
  const { consumeChanges } = useGenericConfigChangeReactor();
  useSubscription<
    OnGenericConfigUpdatedSubscriptionSubscription,
    OnGenericConfigUpdatedSubscriptionSubscriptionVariables
  >(gql(OnGenericConfigUpdatedSubscriptionDocument), {
    variables: {
      query: ultraQuery.query ?? '',
    },
    onData: ({ data }) => {
      const dataToUpdates: GenericConfig[] = [];
      const dataToDelete: GenericConfig[] = [];
      const dataToAdd: GenericConfig[] = [];
      const notifications = data.data?.onGenericConfigUpdated;
      if (Array.isArray(notifications)) {
        for (const notification of notifications) {
          switch (notification.status) {
            case GenericConfigChangeStatus.Updated:
              if (notification.data) {
                dataToUpdates.push(notification.data);
              }
              break;
            case GenericConfigChangeStatus.Deleted:
              if (notification.data) {
                dataToDelete.push(notification.data);
              }
              break;
            case GenericConfigChangeStatus.Added:
              if (notification.data) {
                dataToAdd.push(notification.data);
              }
              break;
          }
        }
        consumeChanges({ dataToUpdates, dataToDelete, dataToAdd });
      }
    },
  });
};
