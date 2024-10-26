import { fields2GraphQLBody } from './fields-graphql-body';

describe('fields2GraphQLBody', () => {
  it('returns an empty GraphQL body for an empty fields array', () => {
    const fields: string[] = [];
    const expected = '{}';
    expect(fields2GraphQLBody(fields)).toBe(expected);
  });

  it('returns a GraphQL body for a single field with no dot notation', () => {
    const fields: string[] = ['field'];
    const expected = '{ field }';
    expect(fields2GraphQLBody(fields)).toBe(expected);
  });

  it('returns a GraphQL body for a single field with dot notation', () => {
    const fields: string[] = ['field.subfield'];
    const expected = '{ field { subfield }}';
    expect(fields2GraphQLBody(fields)).toBe(expected);
  });

  it('returns a GraphQL body for multiple fields with no dot notation', () => {
    const fields: string[] = ['field1', 'field2'];
    const expected = '{ field1 field2 }';
    expect(fields2GraphQLBody(fields)).toBe(expected);
  });

  it('returns a GraphQL body for multiple fields with dot notation', () => {
    const fields: string[] = [
      'field1.subfield11',
      'field1.subfield12',
      'field2.subfield2',
    ];
    const expected = '{ field1 { subfield11 subfield12 } field2 { subfield2 }}';
    expect(fields2GraphQLBody(fields)).toBe(expected);
  });

  it('trims leading/trailing whitespace from fields', () => {
    const fields: string[] = [' field1 ', 'field2.subfield2 '];
    const expected = '{ field1 field2 { subfield2 }}';
    expect(fields2GraphQLBody(fields)).toBe(expected);
  });
});
