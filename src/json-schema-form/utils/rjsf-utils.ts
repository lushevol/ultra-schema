import type { UiSchema } from '@rjsf/utils';

export const extractFieldFromEventId = (id: string, uiSchema: UiSchema) => {
  const rootId = uiSchema['ui:rootFieldId'];

  if (rootId && id.startsWith(rootId)) {
    return id
      .split('_')
      .filter((i) => i !== rootId)
      .join('.');
  }

  return id;
};
