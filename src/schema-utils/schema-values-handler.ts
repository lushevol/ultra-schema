type ComponentOption = {
  label: string;
  value: string | number | boolean;
};

export const schemaValues2ComponentOptions = (
  values: (string | number | boolean | ComponentOption)[],
): ComponentOption[] => {
  return values.map((value) => {
    if (
      typeof value === 'string' ||
      typeof value === 'number' ||
      typeof value === 'boolean'
    ) {
      return {
        label: value.toString(),
        value,
      };
    }
    return value;
  });
};
