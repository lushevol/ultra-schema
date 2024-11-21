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

export type AddGenericConfigInput = {
  config: Scalars['String']['input'];
  key: Scalars['String']['input'];
  validation?: InputMaybe<Scalars['String']['input']>;
};

export enum CashflowStateEnum {
  Queued = 'QUEUED',
  Ready = 'READY',
  Released = 'RELEASED',
  Settled = 'SETTLED',
  Waiting = 'WAITING',
}

export type GenericConfig = {
  __typename?: 'GenericConfig';
  config: Scalars['String']['output'];
  key: Scalars['String']['output'];
  validation: Scalars['String']['output'];
  version: Scalars['Int']['output'];
};

export type GenericConfigChangeNotification = {
  __typename?: 'GenericConfigChangeNotification';
  data?: Maybe<GenericConfig>;
  status: GenericConfigChangeStatus;
};

export enum GenericConfigChangeStatus {
  Added = 'ADDED',
  Deleted = 'DELETED',
  Updated = 'UPDATED',
}

export type MutableGenericConfigInput = {
  config?: InputMaybe<Scalars['String']['input']>;
  validation?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addGenericConfig?: Maybe<GenericConfig>;
  removeGenericConfig?: Maybe<Scalars['Boolean']['output']>;
  updateGenericConfig?: Maybe<GenericConfig>;
};

export type MutationAddGenericConfigArgs = {
  addGenericConfigInput: AddGenericConfigInput;
};

export type MutationRemoveGenericConfigArgs = {
  key: Scalars['String']['input'];
};

export type MutationUpdateGenericConfigArgs = {
  key: Scalars['String']['input'];
  payload?: InputMaybe<MutableGenericConfigInput>;
};

export type Query = {
  __typename?: 'Query';
  genericConfig?: Maybe<GenericConfig>;
  genericConfigs?: Maybe<UltraQueryResult>;
};

export type QueryGenericConfigArgs = {
  key: Scalars['String']['input'];
};

export type QueryGenericConfigsArgs = {
  ultraQueryInput: UltraQueryInput;
};

export type RowGroupModel = {
  aggFunc: Scalars['String']['input'];
  field: Scalars['String']['input'];
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

export enum Sort {
  Asc = 'ASC',
  Desc = 'DESC',
}

export type SortModel = {
  field: Scalars['String']['input'];
  sort: Sort;
};

export type Subscription = {
  __typename?: 'Subscription';
  onGenericConfigUpdated?: Maybe<Array<Maybe<GenericConfigChangeNotification>>>;
};

export type SubscriptionOnGenericConfigUpdatedArgs = {
  query: Scalars['String']['input'];
};

export type UltraQueryInput = {
  groupKeys?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  index: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
  query: Scalars['String']['input'];
  rowGroups?: InputMaybe<Array<InputMaybe<RowGroupModel>>>;
  sorting?: InputMaybe<Array<InputMaybe<SortModel>>>;
};

export type UltraQueryResult = {
  __typename?: 'UltraQueryResult';
  data?: Maybe<Array<Maybe<GenericConfig>>>;
  index?: Maybe<Scalars['Int']['output']>;
  latest?: Maybe<Scalars['Boolean']['output']>;
  offset?: Maybe<Scalars['Int']['output']>;
  total?: Maybe<Scalars['Int']['output']>;
};
