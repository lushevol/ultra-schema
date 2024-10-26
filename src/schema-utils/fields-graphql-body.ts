import set from 'lodash/set';

/**
 * Generate a GraphQL body based on the provided fields.
 *
 * @param fields - An array of fields to include in the GraphQL body, field item is separated by dot
 * @returns The generated GraphQL body as a string
 */
export const fields2GraphQLBody = (fields: string[]): string => {
  const res = {};
  for (const field of fields) {
    set(res, field, '');
  }
  const flat = JSON.stringify(res);
  return flat.replace(/["|,|:]/g, ' ').replace(/\s+/g, ' ');
};
