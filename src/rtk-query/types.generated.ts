export type Maybe<T> = T;
export type InputMaybe<T> = T;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export enum CashflowStateEnum {
  Queued = 'QUEUED',
  Ready = 'READY',
  Released = 'RELEASED',
  Settled = 'SETTLED',
  Waiting = 'WAITING',
}

export type Query = {
  __typename?: 'Query';
  cashflow?: Maybe<SettlementSchemaRootType>;
  cashflows?: Maybe<ResultPageInfo>;
};

export type QueryCashflowArgs = {
  cashflowId: Scalars['ID']['input'];
};

export type QueryCashflowsArgs = {
  queryCriteria: UltraQueryInput;
};

export type ResultPageInfo = {
  __typename?: 'ResultPageInfo';
  data?: Maybe<Array<Maybe<SettlementSchemaRootType>>>;
  index?: Maybe<Scalars['Int']['output']>;
  latest?: Maybe<Scalars['Boolean']['output']>;
  offset?: Maybe<Scalars['Int']['output']>;
  total?: Maybe<Scalars['Int']['output']>;
};

export type RowGroupModel = {
  aggFunc?: InputMaybe<Scalars['String']['input']>;
  colId?: InputMaybe<Scalars['String']['input']>;
};

export type SettlementCashflowType = {
  __typename?: 'SettlementCashflowType';
  Cashflow_Id?: Maybe<Scalars['ID']['output']>;
  Cashflow_State?: Maybe<CashflowStateEnum>;
  Cashflow_Version?: Maybe<Scalars['Int']['output']>;
  Payment_Amount?: Maybe<Scalars['Float']['output']>;
  Payment_Currency?: Maybe<Scalars['String']['output']>;
  Payment_Date?: Maybe<Scalars['String']['output']>;
};

export type SettlementSchemaRootType = {
  __typename?: 'SettlementSchemaRootType';
  Cashflow?: Maybe<SettlementCashflowType>;
};

export type SortModel = {
  colId?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};

export type UltraQueryInput = {
  groupKeys?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  index?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  query?: InputMaybe<Scalars['String']['input']>;
  rowGroups?: InputMaybe<Array<InputMaybe<RowGroupModel>>>;
  sorting?: InputMaybe<Array<InputMaybe<SortModel>>>;
};
