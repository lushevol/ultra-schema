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

export type Account = {
  __typename?: 'Account';
  Beneficiary_Account_Name?: Maybe<Scalars['String']['output']>;
  Beneficiary_Account_Name_2?: Maybe<Scalars['String']['output']>;
  Beneficiary_Account_Number?: Maybe<Scalars['String']['output']>;
  Beneficiary_BIC_code?: Maybe<Scalars['String']['output']>;
  Beneficiary_Bank_Account_Name?: Maybe<Scalars['String']['output']>;
  Beneficiary_Bank_Account_Number?: Maybe<Scalars['String']['output']>;
  Beneficiary_Bank_BIC_code?: Maybe<Scalars['String']['output']>;
  Beneficiary_Bank_City?: Maybe<Scalars['String']['output']>;
  Beneficiary_Bank_Street_Address?: Maybe<Scalars['String']['output']>;
  Beneficiary_City?: Maybe<Scalars['String']['output']>;
  Beneficiary_Correspondent_Account_Name?: Maybe<Scalars['String']['output']>;
  Beneficiary_Correspondent_Account_Number?: Maybe<Scalars['String']['output']>;
  Beneficiary_Correspondent_BIC_code?: Maybe<Scalars['String']['output']>;
  Beneficiary_Correspondent_City?: Maybe<Scalars['String']['output']>;
  Beneficiary_Correspondent_Street_Address?: Maybe<Scalars['String']['output']>;
  Beneficiary_Country_Name?: Maybe<Scalars['String']['output']>;
  Beneficiary_Street_Address?: Maybe<Scalars['String']['output']>;
  Booking_Entity_Correspondent_Account_Name?: Maybe<
    Scalars['String']['output']
  >;
  Booking_Entity_Correspondent_Account_Number?: Maybe<
    Scalars['String']['output']
  >;
  Booking_Entity_Correspondent_BIC_code?: Maybe<Scalars['String']['output']>;
  Booking_Entity_Correspondent_City?: Maybe<Scalars['String']['output']>;
  Booking_Entity_Correspondent_Street_Address?: Maybe<
    Scalars['String']['output']
  >;
  Cash_Correspondent_Account_Number?: Maybe<Scalars['String']['output']>;
  Cash_Correspondent_BIC_code?: Maybe<Scalars['String']['output']>;
  Cash_Correspondent_Sub_Account_Number?: Maybe<Scalars['String']['output']>;
  Cash_Custodian_Account_Name?: Maybe<Scalars['String']['output']>;
  Cash_Custodian_Account_Number?: Maybe<Scalars['String']['output']>;
  Cash_Custodian_BIC_code?: Maybe<Scalars['String']['output']>;
  Cash_Custodian_City?: Maybe<Scalars['String']['output']>;
  Cash_Custodian_Street_Address?: Maybe<Scalars['String']['output']>;
  Cash_Local_Agent_Account_Name?: Maybe<Scalars['String']['output']>;
  Cash_Local_Agent_Account_Number?: Maybe<Scalars['String']['output']>;
  Cash_Local_Agent_BIC_code?: Maybe<Scalars['String']['output']>;
  Cash_Local_Agent_City?: Maybe<Scalars['String']['output']>;
  Cash_Local_Agent_Street_Address?: Maybe<Scalars['String']['output']>;
  Cash_Local_Agent_Sub_Account_Number?: Maybe<Scalars['String']['output']>;
  Counterparty_BIC_Code?: Maybe<Scalars['String']['output']>;
  Counterparty_CMS_Account_Number?: Maybe<Scalars['String']['output']>;
  Counterparty_Has_CMS_Account?: Maybe<Scalars['String']['output']>;
  EBBS_Account_Number?: Maybe<Scalars['String']['output']>;
  EBBS_Bridge_Account_Number?: Maybe<Scalars['String']['output']>;
  Has_Beneficiary_Account?: Maybe<Scalars['String']['output']>;
  Has_Cash_Correspondent_Account?: Maybe<Scalars['String']['output']>;
  Has_Cash_Custodian_Account?: Maybe<Scalars['String']['output']>;
  Has_Cash_Local_Agent_Account?: Maybe<Scalars['String']['output']>;
  Intermediary_Account_Name?: Maybe<Scalars['String']['output']>;
  Intermediary_Account_Number?: Maybe<Scalars['String']['output']>;
  Intermediary_BIC_code?: Maybe<Scalars['String']['output']>;
  Intermediary_City?: Maybe<Scalars['String']['output']>;
  Intermediary_Street_Address?: Maybe<Scalars['String']['output']>;
  Ordering_Customer_Account_Name?: Maybe<Scalars['String']['output']>;
  Ordering_Customer_Account_Number?: Maybe<Scalars['String']['output']>;
  Ordering_Customer_BIC_Code?: Maybe<Scalars['String']['output']>;
  Ordering_Customer_City?: Maybe<Scalars['String']['output']>;
  Ordering_Customer_Street_Address?: Maybe<Scalars['String']['output']>;
  SCB_Nostro_Account_Number?: Maybe<Scalars['String']['output']>;
  SCB_Nostro_Account_Type?: Maybe<Scalars['String']['output']>;
  Sender_Correspondent_Account_Number?: Maybe<Scalars['String']['output']>;
  Sender_Correspondent_BIC_Code?: Maybe<Scalars['String']['output']>;
};

export type Action = {
  __typename?: 'Action';
  Action_Name?: Maybe<Scalars['String']['output']>;
  Action_Type?: Maybe<Scalars['String']['output']>;
  Api_Method?: Maybe<Scalars['String']['output']>;
  Api_Url?: Maybe<Scalars['String']['output']>;
  Component_Name?: Maybe<Scalars['String']['output']>;
  Component_Url?: Maybe<Scalars['String']['output']>;
  Request_Body?: Maybe<Scalars['String']['output']>;
};

export type AddGenericConfigInput = {
  config: Scalars['String']['input'];
  key: Scalars['String']['input'];
  validation?: InputMaybe<Scalars['String']['input']>;
};

export type AffirmationInfo = {
  __typename?: 'AffirmationInfo';
  Affirmed_At?: Maybe<Scalars['String']['output']>;
  Affirmed_By?: Maybe<Scalars['String']['output']>;
  Phone_Email?: Maybe<Scalars['String']['output']>;
};

export type CashflowFailedNum = {
  __typename?: 'CashflowFailedNum';
  External_PriorDates_Num?: Maybe<Scalars['Int']['output']>;
  External_Today_Num?: Maybe<Scalars['Int']['output']>;
  External_Total_Num?: Maybe<Scalars['Int']['output']>;
  External_Yesterday_Num?: Maybe<Scalars['Int']['output']>;
  Internal_PriorDates_Num?: Maybe<Scalars['Int']['output']>;
  Internal_Today_Num?: Maybe<Scalars['Int']['output']>;
  Internal_Total_Num?: Maybe<Scalars['Int']['output']>;
  Internal_Yesterday_Num?: Maybe<Scalars['Int']['output']>;
  Total_Num?: Maybe<Scalars['Int']['output']>;
  Total_PriorDates_Num?: Maybe<Scalars['Int']['output']>;
  Total_Today_Num?: Maybe<Scalars['Int']['output']>;
  Total_Yesterday_Num?: Maybe<Scalars['Int']['output']>;
};

export type CashflowInfoNew = {
  __typename?: 'CashflowInfoNew';
  Action_Type?: Maybe<Scalars['String']['output']>;
  Booking_Entity_SCI_FMCODE?: Maybe<Scalars['String']['output']>;
  Booking_System_Event?: Maybe<Scalars['String']['output']>;
  Bypass_Workflow_Indicator?: Maybe<Scalars['Boolean']['output']>;
  Cashflow_Accounting_Reason?: Maybe<Scalars['String']['output']>;
  Cashflow_Accounting_Status?: Maybe<Scalars['String']['output']>;
  Cashflow_Affirmation_Status?: Maybe<Scalars['String']['output']>;
  Cashflow_Audit_Version?: Maybe<Scalars['String']['output']>;
  Cashflow_Business_Version?: Maybe<Scalars['Int']['output']>;
  Cashflow_Event_Reason?: Maybe<Scalars['String']['output']>;
  Cashflow_Event_Type?: Maybe<Scalars['String']['output']>;
  Cashflow_Id?: Maybe<Scalars['String']['output']>;
  Cashflow_Major_Version?: Maybe<Scalars['String']['output']>;
  Cashflow_Minor_Version?: Maybe<Scalars['Int']['output']>;
  Cashflow_State?: Maybe<Scalars['String']['output']>;
  Cashflow_SubEvent_Type?: Maybe<Scalars['String']['output']>;
  Cashflow_Sub_State?: Maybe<Scalars['String']['output']>;
  Cashflow_Sub_State_Type?: Maybe<Scalars['String']['output']>;
  Cashflow_Sub_State_Updater?: Maybe<Scalars['String']['output']>;
  Cashflow_Swift_Message_Standard?: Maybe<Scalars['String']['output']>;
  Cashflow_Swift_Reason?: Maybe<Scalars['String']['output']>;
  Cashflow_Swift_Status?: Maybe<Scalars['String']['output']>;
  Cashflow_Version?: Maybe<Scalars['Int']['output']>;
  Clearing_Alpha?: Maybe<Scalars['Boolean']['output']>;
  Event_Date?: Maybe<Scalars['String']['output']>;
  Event_Physical_Status?: Maybe<Scalars['String']['output']>;
  Exception_Reason?: Maybe<Scalars['String']['output']>;
  Execution_Date_Time?: Maybe<Scalars['String']['output']>;
  FMO_Comment?: Maybe<Scalars['String']['output']>;
  FMO_Comment_Timestamp?: Maybe<Scalars['String']['output']>;
  FMO_Comment_Updater?: Maybe<Scalars['String']['output']>;
  General_Ledger_Owner_Id?: Maybe<Scalars['String']['output']>;
  Is_Amended_Post_Settlement?: Maybe<Scalars['Boolean']['output']>;
  Is_Cashflow_Unnet?: Maybe<Scalars['Boolean']['output']>;
  Is_Commodity?: Maybe<Scalars['Boolean']['output']>;
  Is_Netting_Required?: Maybe<Scalars['Boolean']['output']>;
  Is_Payment_Intent_To_Settle?: Maybe<Scalars['Boolean']['output']>;
  Is_Pending_Fixing?: Maybe<Scalars['Boolean']['output']>;
  Is_Private_Banking_Cashflow?: Maybe<Scalars['Boolean']['output']>;
  Is_STP?: Maybe<Scalars['Boolean']['output']>;
  Is_STP_RATAN?: Maybe<Scalars['Boolean']['output']>;
  Minor_Version_Description?: Maybe<Scalars['String']['output']>;
  Murex_Structure_Id?: Maybe<Scalars['String']['output']>;
  ND_Parent_Trade_Id?: Maybe<Scalars['String']['output']>;
  ND_Parent_Typology?: Maybe<Scalars['String']['output']>;
  NSTP_Exception?: Maybe<Scalars['String']['output']>;
  NSTP_Reason?: Maybe<Scalars['String']['output']>;
  Netting_Cuttoff_Date?: Maybe<Scalars['String']['output']>;
  Netting_Id?: Maybe<Scalars['String']['output']>;
  Next_Cashflow_Id?: Maybe<Scalars['String']['output']>;
  Pay_Receive_Indicator?: Maybe<Scalars['String']['output']>;
  Payer_Name?: Maybe<Scalars['String']['output']>;
  Payment_Amount?: Maybe<Scalars['String']['output']>;
  Payment_Currency?: Maybe<Scalars['String']['output']>;
  Payment_Cutoff_Time?: Maybe<Scalars['String']['output']>;
  Payment_Date?: Maybe<Scalars['String']['output']>;
  Payment_Date_Business_Day_Convention?: Maybe<Scalars['String']['output']>;
  Payment_Payer_Party_Reference?: Maybe<Scalars['String']['output']>;
  Payment_Receiver_Party_Reference?: Maybe<Scalars['String']['output']>;
  Payment_Type?: Maybe<Scalars['String']['output']>;
  Pending_Fixing_Flag?: Maybe<Scalars['String']['output']>;
  Position_Id?: Maybe<Scalars['String']['output']>;
  Prev_Cashflow_Id?: Maybe<Scalars['String']['output']>;
  STP_Cutoff_Date_Time?: Maybe<Scalars['String']['output']>;
  Status_Event_Type?: Maybe<Scalars['String']['output']>;
  Transaction_Details?: Maybe<Scalars['String']['output']>;
  Validation_Status?: Maybe<Scalars['String']['output']>;
};

export type CashflowStatusNum = {
  __typename?: 'CashflowStatusNum';
  Error_Num?: Maybe<Scalars['Int']['output']>;
  Failed_Today_Num?: Maybe<Scalars['Int']['output']>;
  Group_Error_Num?: Maybe<Scalars['Int']['output']>;
  Group_Pending_Num?: Maybe<Scalars['Int']['output']>;
  Hold_Num?: Maybe<Scalars['Int']['output']>;
  Nack_Num?: Maybe<Scalars['Int']['output']>;
  Queued_Num?: Maybe<Scalars['Int']['output']>;
  Wating_Today_Num?: Maybe<Scalars['Int']['output']>;
};

export type CommentsChange = {
  __typename?: 'CommentsChange';
  Field_Name?: Maybe<Scalars['String']['output']>;
  New_Value?: Maybe<Array<Maybe<FmoComments>>>;
  Old_Value?: Maybe<Array<Maybe<FmoComments>>>;
};

export type DataFlow = {
  __typename?: 'DataFlow';
  Data_Publication_Date_Time?: Maybe<Scalars['String']['output']>;
  Data_Publication_Id?: Maybe<Scalars['String']['output']>;
  Data_Sender?: Maybe<Scalars['String']['output']>;
  Data_Source_System?: Maybe<Scalars['String']['output']>;
  Data_Source_System_Country_Code?: Maybe<Scalars['String']['output']>;
  Data_Source_System_Domain_Name?: Maybe<Scalars['String']['output']>;
  Data_Type?: Maybe<Scalars['String']['output']>;
  Unique_Identifier_Message_Id?: Maybe<Scalars['String']['output']>;
};

export type EntityInfo = {
  __typename?: 'EntityInfo';
  Booking_Entity_Country_ISO_Code?: Maybe<Scalars['String']['output']>;
  Booking_Entity_General_Ledger_Business_Unit_Id?: Maybe<
    Scalars['String']['output']
  >;
  Booking_Entity_SCI_FMCODE?: Maybe<Scalars['String']['output']>;
  Booking_Entity_SCI_FMID?: Maybe<Scalars['String']['output']>;
  Counterparty_CIF_Code?: Maybe<Scalars['String']['output']>;
  Counterparty_Client_Type?: Maybe<Scalars['String']['output']>;
  Counterparty_Is_Internal?: Maybe<Scalars['Boolean']['output']>;
  Counterparty_Murex_Display_Shortcode?: Maybe<Scalars['String']['output']>;
  Counterparty_SCI_BIC_Code?: Maybe<Scalars['String']['output']>;
  Counterparty_SCI_BIC_Net_Flag?: Maybe<Scalars['String']['output']>;
  Counterparty_SCI_DOMICILE_COUNTRY?: Maybe<Scalars['String']['output']>;
  Counterparty_SCI_FMCODE?: Maybe<Scalars['String']['output']>;
  Counterparty_SCI_FMID?: Maybe<Scalars['String']['output']>;
  Counterparty_Source_System_Entity_Id?: Maybe<Scalars['String']['output']>;
  General_Ledger_Business_Unit_Name?: Maybe<Scalars['String']['output']>;
  Person?: Maybe<Person>;
};

export type ExceptionNum = {
  __typename?: 'ExceptionNum';
  VD_Exceptions?: Maybe<Array<Maybe<VdException>>>;
};

export type Exposure = {
  __typename?: 'Exposure';
  Amount?: Maybe<Scalars['String']['output']>;
  Counter_Party?: Maybe<Scalars['String']['output']>;
  Type?: Maybe<Scalars['String']['output']>;
};

export type FmoComments = {
  __typename?: 'FMOComments';
  FMO_Comment?: Maybe<Scalars['String']['output']>;
  FMO_Comment_Timestamp?: Maybe<Scalars['String']['output']>;
  FMO_Comment_Updater?: Maybe<Scalars['String']['output']>;
};

export type FilterArg = {
  field: Scalars['String']['input'];
  operator: Operator;
  values: Array<InputMaybe<Scalars['String']['input']>>;
};

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

export type GraphCashFlowDashBoard = {
  __typename?: 'GraphCashFlowDashBoard';
  Exception_Num?: Maybe<ExceptionNum>;
  Failed_Num?: Maybe<CashflowFailedNum>;
  Status_Num?: Maybe<CashflowStatusNum>;
  Top_Exposure?: Maybe<TopExposure>;
  Volume_By_VD?: Maybe<VolumeByVd>;
};

export type GraphCashFlowDetails = {
  __typename?: 'GraphCashFlowDetails';
  cashflow?: Maybe<ResultNew>;
  cashflowAuditTrail?: Maybe<Array<Maybe<GraphCashFlowHistoryNew>>>;
  ratanAffirmation?: Maybe<AffirmationInfo>;
  ratanException?: Maybe<Array<Maybe<RatanException>>>;
  ratanNostroCandidates?: Maybe<Array<Maybe<Ssi>>>;
  ratanVostroCandidates?: Maybe<Array<Maybe<Ssi>>>;
};

export type GraphCashFlowHistoryNew = {
  __typename?: 'GraphCashFlowHistoryNew';
  Action?: Maybe<Scalars['String']['output']>;
  Action_Date_Time?: Maybe<Scalars['String']['output']>;
  Action_Time?: Maybe<Scalars['String']['output']>;
  Cashflow?: Maybe<CashflowInfoNew>;
  Comments_Change?: Maybe<CommentsChange>;
  Data_Flow?: Maybe<DataFlow>;
  Entity?: Maybe<EntityInfo>;
  Exception_Type?: Maybe<Scalars['String']['output']>;
  FMO_Comments?: Maybe<Array<Maybe<FmoComments>>>;
  Instrument_Common?: Maybe<InstrumentCommon>;
  Portfolio?: Maybe<Portfolio>;
  Settlement_Instruction?: Maybe<Ssi>;
  Trade?: Maybe<Trade>;
  User_PSID?: Maybe<Scalars['String']['output']>;
  Value_Change?: Maybe<Array<Maybe<ValueChange>>>;
};

export type GraphCashFlowNew = {
  __typename?: 'GraphCashFlowNew';
  pageInfo: ResultPageInfo;
  results: Array<Maybe<ResultNew>>;
};

export type GroupInfo = {
  __typename?: 'GroupInfo';
  Amendment_Type?: Maybe<Scalars['String']['output']>;
  Booking_Entity_Id?: Maybe<Scalars['String']['output']>;
  Booking_System_Event?: Maybe<Scalars['String']['output']>;
  Bussiness_Event?: Maybe<Scalars['String']['output']>;
  Cashflow_Count?: Maybe<Scalars['Int']['output']>;
  Cashflow_Event_Reason?: Maybe<Scalars['String']['output']>;
  Cashflow_Id?: Maybe<Scalars['String']['output']>;
  Cashflow_Sequence?: Maybe<Scalars['Int']['output']>;
  Cashflow_Status?: Maybe<Scalars['String']['output']>;
  Commodity_Flag?: Maybe<Scalars['String']['output']>;
  Counterparty_Fm_Id?: Maybe<Scalars['String']['output']>;
  Create_At?: Maybe<Scalars['String']['output']>;
  Group_Event?: Maybe<Scalars['String']['output']>;
  Group_Id?: Maybe<Scalars['String']['output']>;
  Group_Status?: Maybe<Scalars['String']['output']>;
  Id?: Maybe<Scalars['String']['output']>;
  Is_Group_Locked?: Maybe<Scalars['Boolean']['output']>;
  Is_Trade_Validated?: Maybe<Scalars['Boolean']['output']>;
  Major_Version?: Maybe<Scalars['Int']['output']>;
  Mxg_Trade_Id?: Maybe<Scalars['String']['output']>;
  Original_Payment_Id?: Maybe<Scalars['String']['output']>;
  Payment_Amount?: Maybe<Scalars['String']['output']>;
  Payment_Currency?: Maybe<Scalars['String']['output']>;
  Pending_Reason?: Maybe<Scalars['String']['output']>;
  Status?: Maybe<Scalars['String']['output']>;
  Trade_Id?: Maybe<Scalars['String']['output']>;
  Update_At?: Maybe<Scalars['String']['output']>;
  Updated_By?: Maybe<Scalars['String']['output']>;
  Value_Date?: Maybe<Scalars['String']['output']>;
  ratanException?: Maybe<Array<Maybe<RatanException>>>;
};

export type GroupMessages = {
  __typename?: 'GroupMessages';
  pageInfo: ResultPageInfo;
  results: Array<Maybe<GroupInfo>>;
};

export type GroupMsgReq = {
  Booking_Entity_Id?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  Cashflow_Id?: InputMaybe<Scalars['String']['input']>;
  Cashflow_Status?: InputMaybe<Scalars['String']['input']>;
  Counterparty_Fm_Code?: InputMaybe<
    Array<InputMaybe<Scalars['String']['input']>>
  >;
  Counterparty_Fm_Id?: InputMaybe<
    Array<InputMaybe<Scalars['String']['input']>>
  >;
  Group_Status?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  Major_Version?: InputMaybe<Scalars['Int']['input']>;
  Status?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  Trade_Id?: InputMaybe<Scalars['String']['input']>;
  Value_Date?: InputMaybe<Scalars['String']['input']>;
};

export type InstrumentCommon = {
  __typename?: 'InstrumentCommon';
  CFI_Code?: Maybe<Scalars['String']['output']>;
  Equity_Instrument_Reference?: Maybe<Scalars['String']['output']>;
  Financial_Instrument_Code?: Maybe<Scalars['String']['output']>;
  ISDA_Taxonomy?: Maybe<Scalars['String']['output']>;
  Murex_Product_Family?: Maybe<Scalars['String']['output']>;
  Murex_Product_Group?: Maybe<Scalars['String']['output']>;
  Murex_Product_Strategy?: Maybe<Scalars['String']['output']>;
  Murex_Product_Type?: Maybe<Scalars['String']['output']>;
  Murex_Product_Typology?: Maybe<Scalars['String']['output']>;
  Parent_Trade_Instrument?: Maybe<Scalars['String']['output']>;
  Source_System_Instrument_Sub_Type?: Maybe<Scalars['String']['output']>;
};

export type MutableGenericConfigInput = {
  config?: InputMaybe<Scalars['String']['input']>;
  validation?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addGenericConfig?: Maybe<GenericConfig>;
  removeGenericConfig?: Maybe<Scalars['Boolean']['output']>;
  updateGenericConfig?: Maybe<GenericConfig>;
  updateTrackingRecords: Array<TrackingRecord>;
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

export type MutationUpdateTrackingRecordsArgs = {
  keys: Array<Scalars['String']['input']>;
};

export enum Operator {
  Bet = 'BET',
  Eq = 'EQ',
  Gte = 'GTE',
  In = 'IN',
  Like = 'LIKE',
  Lte = 'LTE',
  Match = 'MATCH',
  Ne = 'NE',
  Notin = 'NOTIN',
}

export type Person = {
  __typename?: 'Person';
  Booking_Marketer_PSID?: Maybe<Scalars['String']['output']>;
  Coverage_Marketer_PSID?: Maybe<Scalars['String']['output']>;
  Event_Booking_Marketer_PSID?: Maybe<Scalars['String']['output']>;
  Event_Coverage_Marketer_PSID?: Maybe<Scalars['String']['output']>;
  Event_Execution_Marketer_PSID?: Maybe<Scalars['String']['output']>;
  Event_Trader_PSID?: Maybe<Scalars['String']['output']>;
  Execution_Marketer_PSID?: Maybe<Scalars['String']['output']>;
  Trader_PSID?: Maybe<Scalars['String']['output']>;
};

export type Portfolio = {
  __typename?: 'Portfolio';
  Booking_Entity_Trade_Portfolio_Name?: Maybe<Scalars['String']['output']>;
  Booking_Entity_Trade_Portfolio_Unique_Name?: Maybe<
    Scalars['String']['output']
  >;
};

export type Query = {
  __typename?: 'Query';
  cashflowAuditTrailNew: Array<Maybe<GraphCashFlowHistoryNew>>;
  cashflowDashboard: GraphCashFlowDashBoard;
  cashflowsNew: GraphCashFlowNew;
  componentCashflow: GraphCashFlowNew;
  genericConfig?: Maybe<GenericConfig>;
  genericConfigs?: Maybe<UltraQueryResult>;
  graphCashFlowDetails: Array<Maybe<GraphCashFlowDetails>>;
  groupMessages: GroupMessages;
  trackingRecords: Array<TrackingRecord>;
};

export type QueryCashflowAuditTrailNewArgs = {
  cashflowId?: InputMaybe<Scalars['String']['input']>;
};

export type QueryCashflowDashboardArgs = {
  filter?: InputMaybe<Array<InputMaybe<FilterArg>>>;
  page: Scalars['Int']['input'];
  size: Scalars['Int']['input'];
};

export type QueryCashflowsNewArgs = {
  filter?: InputMaybe<Array<InputMaybe<FilterArg>>>;
  page: Scalars['Int']['input'];
  size: Scalars['Int']['input'];
};

export type QueryComponentCashflowArgs = {
  filter?: InputMaybe<Array<InputMaybe<FilterArg>>>;
  page: Scalars['Int']['input'];
  size: Scalars['Int']['input'];
};

export type QueryGenericConfigArgs = {
  key: Scalars['String']['input'];
};

export type QueryGenericConfigsArgs = {
  ultraQueryInput: UltraQueryInput;
};

export type QueryGraphCashFlowDetailsArgs = {
  cashflowIds: Array<InputMaybe<Scalars['ID']['input']>>;
};

export type QueryGroupMessagesArgs = {
  filter?: InputMaybe<GroupMsgReq>;
  page: Scalars['Int']['input'];
  size: Scalars['Int']['input'];
};

export type QueryTrackingRecordsArgs = {
  keys: Array<Scalars['String']['input']>;
};

export type RatanException = {
  __typename?: 'RatanException';
  Actions?: Maybe<Array<Maybe<Action>>>;
  Bulk_Eligible?: Maybe<Scalars['Boolean']['output']>;
  Description?: Maybe<Scalars['String']['output']>;
  Entity_Id?: Maybe<Scalars['String']['output']>;
  Entity_Version?: Maybe<Scalars['Int']['output']>;
  Exception_Category?: Maybe<Scalars['String']['output']>;
  Exception_Code?: Maybe<Scalars['String']['output']>;
  Exception_Type?: Maybe<Scalars['String']['output']>;
  Id?: Maybe<Scalars['String']['output']>;
  Original_Exception_Id?: Maybe<Scalars['String']['output']>;
  Stashing?: Maybe<Stashing>;
  Status?: Maybe<Scalars['String']['output']>;
};

export type ResultNew = {
  __typename?: 'ResultNew';
  BCS_Parent_Trade_Id?: Maybe<Scalars['String']['output']>;
  BCS_Trade_Id?: Maybe<Scalars['String']['output']>;
  Cashflow?: Maybe<CashflowInfoNew>;
  Cashflow_Sequence?: Maybe<Scalars['String']['output']>;
  Data_Flow?: Maybe<DataFlow>;
  Delivery_Method?: Maybe<Scalars['String']['output']>;
  Effective_Date_Time?: Maybe<Scalars['String']['output']>;
  Entity?: Maybe<EntityInfo>;
  FMO_Comments?: Maybe<Array<Maybe<FmoComments>>>;
  Instrument_Common?: Maybe<InstrumentCommon>;
  Linked_Trade_ID?: Maybe<Scalars['String']['output']>;
  Parent_Trade_Id?: Maybe<Scalars['String']['output']>;
  Portfolio?: Maybe<Portfolio>;
  Position_Id?: Maybe<Scalars['String']['output']>;
  Settlement_Instruction?: Maybe<Ssi>;
  Settlement_Method?: Maybe<Scalars['String']['output']>;
  TP_System_Name?: Maybe<Scalars['String']['output']>;
  Trade?: Maybe<Trade>;
  Trade_Date?: Maybe<Scalars['String']['output']>;
  Trade_Id?: Maybe<Scalars['String']['output']>;
  Trade_Original_Source_System_Name?: Maybe<Scalars['String']['output']>;
  Trade_Purpose?: Maybe<Scalars['String']['output']>;
  Trade_State?: Maybe<Scalars['String']['output']>;
  Trade_Version?: Maybe<Scalars['Int']['output']>;
};

export type ResultPageInfo = {
  __typename?: 'ResultPageInfo';
  lastPage: Scalars['Boolean']['output'];
  pageNo: Scalars['Int']['output'];
  pageSize: Scalars['Int']['output'];
  totalHits: Scalars['Float']['output'];
};

export type RowGroupModel = {
  aggFunc: Scalars['String']['input'];
  field: Scalars['String']['input'];
};

export type Ssi = {
  __typename?: 'SSI';
  Account?: Maybe<Account>;
  Beneficiary_Account_Name?: Maybe<Scalars['String']['output']>;
  Beneficiary_Account_Number?: Maybe<Scalars['String']['output']>;
  Beneficiary_BIC_code?: Maybe<Scalars['String']['output']>;
  Booking_Entity_BIC_Code?: Maybe<Scalars['String']['output']>;
  Booking_Entity_Custodian_Account_Name?: Maybe<Scalars['String']['output']>;
  Booking_Entity_Custodian_Account_Number?: Maybe<Scalars['String']['output']>;
  Booking_Entity_Custodian_BIC_Code?: Maybe<Scalars['String']['output']>;
  BranchId_Murex3Id?: Maybe<Scalars['String']['output']>;
  CFI_Code?: Maybe<Scalars['String']['output']>;
  Cash_SSI_Id?: Maybe<Scalars['String']['output']>;
  Charge_Bearer?: Maybe<Scalars['String']['output']>;
  Comments?: Maybe<Scalars['String']['output']>;
  Counterparty_Beneficiary_Account_Name?: Maybe<Scalars['String']['output']>;
  Counterparty_Custodian_Account_Name?: Maybe<Scalars['String']['output']>;
  Counterparty_Custodian_Account_Number?: Maybe<Scalars['String']['output']>;
  Counterparty_Custodian_BIC_Code?: Maybe<Scalars['String']['output']>;
  Counterparty_SCI_FMID?: Maybe<Scalars['String']['output']>;
  Debit_Credit?: Maybe<Scalars['String']['output']>;
  Effective_Date?: Maybe<Scalars['String']['output']>;
  Event_Type?: Maybe<Scalars['String']['output']>;
  ISDA_Taxonomy?: Maybe<Scalars['String']['output']>;
  Is_Default_SSI?: Maybe<Scalars['String']['output']>;
  Is_Third_Party_Payment?: Maybe<Scalars['String']['output']>;
  Nostro_Id?: Maybe<Scalars['String']['output']>;
  Nostro_Swift_Message_Type?: Maybe<Scalars['String']['output']>;
  Payment_Currency?: Maybe<Scalars['String']['output']>;
  Primary_Asset_Class?: Maybe<Scalars['String']['output']>;
  Remittance_Information_1?: Maybe<Scalars['String']['output']>;
  Remittance_Information_2?: Maybe<Scalars['String']['output']>;
  Remittance_Information_3?: Maybe<Scalars['String']['output']>;
  Remittance_Information_4?: Maybe<Scalars['String']['output']>;
  SCB_Entity_SCI_FMID?: Maybe<Scalars['String']['output']>;
  SSI_Id?: Maybe<Scalars['String']['output']>;
  SSI_Priority?: Maybe<Scalars['String']['output']>;
  SSI_Source?: Maybe<Scalars['String']['output']>;
  SSI_Status?: Maybe<Scalars['String']['output']>;
  SSI_Unique_Id?: Maybe<Scalars['String']['output']>;
  Security_Custodian_Account_Name?: Maybe<Scalars['String']['output']>;
  Security_Custodian_Account_Number?: Maybe<Scalars['String']['output']>;
  Security_SSI_Id?: Maybe<Scalars['String']['output']>;
  Sender_To_Receiver_Information_1?: Maybe<Scalars['String']['output']>;
  Sender_To_Receiver_Information_2?: Maybe<Scalars['String']['output']>;
  Sender_To_Receiver_Information_3?: Maybe<Scalars['String']['output']>;
  Sender_To_Receiver_Information_4?: Maybe<Scalars['String']['output']>;
  Sender_To_Receiver_Information_5?: Maybe<Scalars['String']['output']>;
  Sender_To_Receiver_Information_6?: Maybe<Scalars['String']['output']>;
  Settlement_Code?: Maybe<Scalars['String']['output']>;
  Settlement_Flow_Nature?: Maybe<Scalars['String']['output']>;
  Settlement_Location_Country_ISO_Code?: Maybe<Scalars['String']['output']>;
  Settlement_Method?: Maybe<Scalars['String']['output']>;
  Settlement_Type?: Maybe<Scalars['String']['output']>;
  Source_System_Instrument_Id?: Maybe<Scalars['String']['output']>;
  Source_System_Settlement_Location?: Maybe<Scalars['String']['output']>;
  Swift_Message_Type?: Maybe<Scalars['String']['output']>;
  Swift_Payment_Date?: Maybe<Scalars['String']['output']>;
  Swift_Payment_Method?: Maybe<Scalars['String']['output']>;
  Value_Date?: Maybe<Scalars['String']['output']>;
  Value_Date_Business_Day_Convention?: Maybe<Scalars['String']['output']>;
};

export enum Sort {
  Asc = 'ASC',
  Desc = 'DESC',
}

export type SortModel = {
  field: Scalars['String']['input'];
  sort: Sort;
};

export type Stashing = {
  __typename?: 'Stashing';
  Checker_Id?: Maybe<Scalars['String']['output']>;
  Checker_Request_Body?: Maybe<Scalars['String']['output']>;
  Maker_Id?: Maybe<Scalars['String']['output']>;
  Maker_Request_Body?: Maybe<Scalars['String']['output']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  onGenericConfigUpdated?: Maybe<Array<Maybe<GenericConfigChangeNotification>>>;
  onTrackingRecordsUpdated: Array<TrackingRecordChangeNotification>;
};

export type SubscriptionOnGenericConfigUpdatedArgs = {
  query: Scalars['String']['input'];
};

export type SubscriptionOnTrackingRecordsUpdatedArgs = {
  keys: Array<Scalars['String']['input']>;
};

export type TopExposure = {
  __typename?: 'TopExposure';
  Exposure_List?: Maybe<Array<Maybe<Exposure>>>;
};

export type TrackingRecord = {
  __typename?: 'TrackingRecord';
  id: Scalars['ID']['output'];
  key: Scalars['String']['output'];
  timestamp: Scalars['String']['output'];
  userId: Scalars['String']['output'];
};

export type TrackingRecordChangeNotification = {
  __typename?: 'TrackingRecordChangeNotification';
  data: TrackingRecord;
  status: TrackingRecordChangeStatus;
};

export enum TrackingRecordChangeStatus {
  Added = 'ADDED',
  Deleted = 'DELETED',
  Updated = 'UPDATED',
}

export type Trade = {
  __typename?: 'Trade';
  Action_Type?: Maybe<Scalars['String']['output']>;
  Event_Physical_Status?: Maybe<Scalars['String']['output']>;
  Resultant_Position_Id?: Maybe<Scalars['String']['output']>;
  Trade_Lake_Latest_Event_Date_Time?: Maybe<Scalars['String']['output']>;
  Trade_Lake_Raw_Event_Date_Time?: Maybe<Scalars['String']['output']>;
  Trade_Lake_Transaction_From_Date_Time?: Maybe<Scalars['String']['output']>;
  Trade_Lake_Transaction_To_Date_Time?: Maybe<Scalars['String']['output']>;
  Trade_Lake_Valid_From_Date_Time?: Maybe<Scalars['String']['output']>;
  Trade_Lake_Valid_To_Date_Time?: Maybe<Scalars['String']['output']>;
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

export type VdException = {
  __typename?: 'VDException';
  Exception_Code?: Maybe<Scalars['String']['output']>;
  VD1_Num?: Maybe<Scalars['Int']['output']>;
  VD2_Num?: Maybe<Scalars['Int']['output']>;
  VDM_Num?: Maybe<Scalars['Int']['output']>;
  VD_Num?: Maybe<Scalars['Int']['output']>;
};

export type ValueChange = {
  __typename?: 'ValueChange';
  Field_Name?: Maybe<Scalars['String']['output']>;
  New_Value?: Maybe<Scalars['String']['output']>;
  Old_Value?: Maybe<Scalars['String']['output']>;
};

export type VolumeByVd = {
  __typename?: 'VolumeByVD';
  VD1_Num?: Maybe<Scalars['Int']['output']>;
  VD2_Num?: Maybe<Scalars['Int']['output']>;
  VDM_Num?: Maybe<Scalars['Int']['output']>;
  VD_Num?: Maybe<Scalars['Int']['output']>;
};
