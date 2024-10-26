import { factory, primaryKey } from '@mswjs/data';

export const businessDB = factory({
  cashflow: {
    id: primaryKey(String),
    Cashflow: {
      Cashflow_Id: String,
      Cashflow_Version: Number,
      Cashflow_State: String,
      Payment_Date: String,
      Payment_Amount: Number,
    },
  },
});

businessDB.cashflow.create({
  id: '1',
  Cashflow: {
    Cashflow_Id: '1',
    Cashflow_Version: 1,
    Cashflow_State: 'WAITING',
    Payment_Date: '2022-01-01',
    Payment_Amount: 1000,
  },
});

export const cashflowGraphqlHandlers =
  businessDB.cashflow.toHandlers('graphql');
export const cashflowGraphqlSchema = businessDB.cashflow.toGraphQLSchema();
