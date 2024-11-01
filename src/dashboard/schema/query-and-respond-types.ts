type Query = {
  dataSource: 'es' | 'postgres';
  queryType: 'esSQL' | 'postgresSQL';
  query: string;
  respondType: 'table' | 'chart';
  respond: any;
};
