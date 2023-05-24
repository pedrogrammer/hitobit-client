/**
 * AUTO_GENERATED Do not change this file directly, use config.ts file instead
 *
 * @version 6
 */

export type AccountStatus = "Block" | "OK";

export type AccountType =
  | "SPOT"
  | "MARGIN"
  | "FUTURES"
  | "LEVERAGED"
  | "TRD_GRP_002";

export interface AddPostActionInternalDepositEPayRequestRequestVM {
  postActionNature: PostActionNature;
  postActionStatus: PostActionStatus;
  ePayRequestClientUniqueId?: string;
}

export interface AddPostActionPlaceMarketBuyOrderRequestVM {
  marketType: MarketType;
  postActionNature: PostActionNature;
  postActionStatus: PostActionStatus;
  /** - Format: decimal */
  quoteQuantity: number;
  marketSymbol?: string;
}

export interface AddPostActionResponseVM {
  /** - Format: uuid */
  postActionUniqueId: string;
}

export interface AddressBookAddRequestVM {
  addressType: AddressType;
  whiteStatus: boolean;
  address?: string;
  currencySymbol?: string;
  /** - Format: int32 */
  globalWalletProviderId?: number;
  label?: string;
  moneyNetworkSymbol?: string;
  otherGlobalWalletProvider?: string;
  tagId?: string;
}

export interface AddressBookResponseVM {
  addressType: AddressType;
  /** - Format: int64 */
  id: number;
  whiteStatus: boolean;
  address?: string;
  currencySymbol?: string;
  globalWalletProviderName?: string;
  label?: string;
  moneyNetworkSymbol?: string;
  tagId?: string;
}

export type AddressType = "Standard" | "Universal";

export interface AggregationResultResponseVM {
  /** - Format: int32 */
  count: number;
  /** - Format: decimal */
  sum: number;
}

export interface ApiKeyAddRequestVM {
  apiKeyTrustedAddresses?: ApiKeyTrustedAddressAddRequestVM[];
  apiScopes?: ApiKeyScopeAddRequestVM[];
  label?: string;
}

export interface ApiKeyAddResponseVM {
  /** - Format: int64 */
  id: number;
  key?: string;
  secret?: string;
}

export interface ApiKeyListResponseVM {
  /** - Format: int64 */
  totalCount: number;
  apiKeys?: ApiKeyResponseVM[];
}

export interface ApiKeyResponseVM {
  /** - Format: int64 */
  id: number;
  isActive: boolean;
  apiKeyTrustedAddresses?: ApiKeyTrustedAddressResponseVM[];
  apiScopes?: ApiKeyScopeResponseVM[];
  key?: string;
  label?: string;
}

export interface ApiKeyScopeAddRequestVM {
  scope?: string;
}

export interface ApiKeyScopeResponseVM {
  scope?: string;
}

export interface ApiKeyTrustedAddressAddRequestVM {
  trustedAddress?: string;
}

export interface ApiKeyTrustedAddressResponseVM {
  trustedAddress?: string;
}

export interface ApiKeyUpdateRequestVM {
  /** - Format: int64 */
  id: number;
  isActive: boolean;
  apiKeyTrustedAddresses?: ApiKeyTrustedAddressAddRequestVM[];
  apiScopes?: ApiKeyScopeAddRequestVM[];
  label?: string;
}

export interface ApiScopeResponseVM {
  /** - Format: uuid */
  id: string;
  displayName?: string;
  name?: string;
}

export type AppKLineInterval =
  | "OneMinute"
  | "ThreeMinutes"
  | "FiveMinutes"
  | "FifteenMinutes"
  | "ThirtyMinutes"
  | "OneHour"
  | "TwoHour"
  | "FourHour"
  | "SixHour"
  | "EightHour"
  | "TwelveHour"
  | "OneDay"
  | "ThreeDay"
  | "OneWeek"
  | "OneMonth";

export type AppListOrderStatus = "EXECUTING" | "ALL_DONE" | "REJECT";

export type AppListStatusType = "RESPONSE" | "EXEC_STARTED" | "ALL_DONE";

export type AppOrderSide = "BUY" | "SELL";

export type AppOrderSourceType =
  | "Trade"
  | "InstantBuy"
  | "InstantSell"
  | "Convert"
  | "MarketMaker";

export type AppOrderStatus =
  | "NEW"
  | "PARTIALLY_FILLED"
  | "FILLED"
  | "CANCELED"
  | "PENDING_CANCEL"
  | "REJECTED"
  | "EXPIRED"
  | "NEW_INSURANCE"
  | "NEW_ADL";

export type AppOrderType =
  | "LIMIT"
  | "MARKET"
  | "STOP_LOSS"
  | "STOP_LOSS_LIMIT"
  | "TAKE_PROFIT"
  | "TAKE_PROFIT_LIMIT"
  | "LIMIT_MAKER";

export type AppTimeInForce =
  | "GTC"
  | "IOC"
  | "FOK"
  | "GoodTillCrossing"
  | "GoodTillExpiredOrCanceled";

export interface BanksResponseVM {
  /** - Format: int32 */
  id: number;
  logoAddress?: string;
  name?: string;
}

export interface BasePostActionInfoResponseVM {
  postActionNature: PostActionNature;
  postActionStatus: PostActionStatus;
  /** - Format: uuid */
  uniqueId: string;
  /** - Format: date-time */
  doneDate?: string;
}

export interface BlockchainAddressResponseVM {
  /** - Format: decimal */
  amount: number;
  /** - Format: int64 */
  domainWalletMoneyNetworkId: number;
  /** - Format: int32 */
  moneyNetworkId: number;
  /** - Format: decimal */
  paidAmount: number;
  blockchainAddress?: string;
  symbol?: string;
}

export interface BlockchainDepositInfoResponseVM {
  /** - Format: int32 */
  moneyNetworkId: number;
  txId?: string;
}

export type BusinessShareType =
  | "Person"
  | "PrivateStock"
  | "PublicStock"
  | "Limited"
  | "GeneralPartnership"
  | "Institute"
  | "Cooperative";

export interface CancelAllOrdersRequestVM {
  symbol?: string;
}

export interface CancelOcoOrderRequestVM {
  /** - Format: int64 */
  orderListId: number;
  listClientOrderId?: string;
  newClientOrderId?: string;
  symbol?: string;
}

export interface CancelOcoOrderResponseVM {
  listOrderStatus: AppListOrderStatus;
  listStatusType: AppListStatusType;
  /** - Format: int64 */
  orderListId: number;
  /** - Format: int64 */
  transactionTime: number;
  contingencyType?: string;
  listClientOrderId?: string;
  orderReports?: OrderResultInfoResponseVM[];
  orders?: OrderMinimalInfoResponseVM[];
  symbol?: string;
}

export interface CancelOrderRequestVM {
  /** - Format: int64 */
  orderId: number;
  newClientOrderId?: string;
  origClientOrderId?: string;
  symbol?: string;
}

export interface CancelOrderResponseVM {
  /** - Format: decimal */
  cummulativeQuoteQty: number;
  /** - Format: decimal */
  executedQty: number;
  /** - Format: int64 */
  orderId: number;
  /** - Format: int64 */
  orderListId: number;
  side: AppOrderSide;
  status: AppOrderStatus;
  timeInForce: AppTimeInForce;
  /** - Format: int64 */
  transactTime: number;
  type: AppOrderType;
  /** - Format: decimal */
  averageFilledPrice?: number;
  baseCurrencySymbol?: string;
  clientOrderId?: string;
  /** - Format: decimal */
  origQty?: number;
  /** - Format: decimal */
  origQuoteOrderQty?: number;
  /** - Format: decimal */
  price?: number;
  quoteCurrencySymbol?: string;
  /** - Format: decimal */
  stopPrice?: number;
  symbol?: string;
}

export interface ChangeEmailRequestVM {
  email?: string;
  emailOtpCode?: string;
  emailOtpToken?: string;
  newEmailOtpCode?: string;
  newEmailOtpToken?: string;
  totpCode?: string;
}

export interface ChangePasswordRequestVM {
  currentPassword?: string;
  password?: string;
}

export interface ChangeTwoFactorRequestVM {
  otpCode?: string;
  otpToken?: string;
  totpCode?: string;
}

export interface CityResponseVM {
  /** - Format: int32 */
  id: number;
  /** - Format: int32 */
  provinceId: number;
  title?: string;
}

export type ComissionType = "Percentage" | "Fixed" | "Step";

export interface CommissionPolicyResponseVM {
  commissionType: ComissionType;
  logicalActionType: LogicalActionType;
  commissionTypeDisplay?: string;
  currencySymbol?: string;
  /** - Format: decimal */
  fixedValue?: number;
  logicalActionTypeDisplay?: string;
  /** - Format: decimal */
  maxValue?: number;
  moneyNetworkSymbol?: string;
  /** - Format: double */
  percent?: number;
}

export interface CommissionResponseVM {
  commissionType: ComissionType;
  /** - Format: int32 */
  currencyId: number;
  excludeFromSettlementCommissionAmount: boolean;
  logicalActionType: LogicalActionType;
  /** - Format: decimal */
  minValue: number;
  /** - Format: decimal */
  noCommissionAmount: number;
  /** - Format: decimal */
  stepSize: number;
  /** - Format: decimal */
  fixedValue?: number;
  /** - Format: decimal */
  maxValue?: number;
  /** - Format: int32 */
  moneyNetworkId?: number;
  /** - Format: double */
  percent?: number;
}

export interface CountryResponseVM {
  /** - Format: int32 */
  id: number;
  title?: string;
}

export interface CreateChargeRequestRequestVM {
  /** - Format: decimal */
  amount: number;
  redirectType: RedirectType;
  clientUniqueId?: string;
  /** - Format: uuid */
  postActionUniqueId?: string;
  redirectUrl?: string;
  /** - Format: int64 */
  userBankId?: number;
  userWalletCurrencySymbol?: string;
  userWalletNumber?: string;
}

export interface CreateDivideIpgRequestRequestVM {
  /** - Format: decimal */
  amount: number;
  blockMoney: boolean;
  canPayViaWallet: boolean;
  clientUniqueId?: string;
  customData?: EpayRequestCustomDataRequestVM[];
  description?: string;
  divideShareInfo?: DivideEpayRequestShareInfoRequestVM[];
  getCommissionFromPayer?: boolean;
  pluginName?: string;
  redirectUrl?: string;
  userWalletCurrencySymbol?: string;
  userWalletNumber?: string;
}

export interface CreateDivideLinkRequestRequestVM {
  /** - Format: decimal */
  amount: number;
  blockMoney: boolean;
  /** - Format: int32 */
  expireDays: number;
  isAutoConfirm: boolean;
  notifyAudience: boolean;
  redirectType: RedirectType;
  /** - Format: uuid */
  assignedToUserId?: string;
  audiences?: EPayRequestAudienceRequestVM[];
  clientUniqueId?: string;
  customData?: EpayRequestCustomDataRequestVM[];
  description?: string;
  divideShareInfo?: DivideEpayRequestShareInfoRequestVM[];
  getCommissionFromPayer?: boolean;
  pluginName?: string;
  redirectUrl?: string;
  userWalletCurrencySymbol?: string;
  userWalletNumber?: string;
}

export interface CreateIdentificationUserBankRequirementRequestVM {
  /** - Format: date-time */
  birthday: string;
  nationalCode?: string;
}

export interface CreateIpgRequestRequestVM {
  /** - Format: decimal */
  amount: number;
  canPayViaWallet: boolean;
  payViaOtherCurrency: boolean;
  clientUniqueId?: string;
  customData?: EpayRequestCustomDataRequestVM[];
  description?: string;
  getCommissionFromPayer?: boolean;
  pluginName?: string;
  redirectUrl?: string;
  userWalletCurrencySymbol?: string;
  userWalletNumber?: string;
}

export interface CreateLinkRequestRequestVM {
  /** - Format: decimal */
  amount: number;
  /** - Format: int32 */
  expireDays: number;
  isAutoConfirm: boolean;
  notifyAudience: boolean;
  payViaOtherCurrency: boolean;
  redirectType: RedirectType;
  assignedToAnonymous?: string;
  /** - Format: uuid */
  assignedToUserId?: string;
  audiences?: EPayRequestAudienceRequestVM[];
  clientUniqueId?: string;
  customData?: EpayRequestCustomDataRequestVM[];
  description?: string;
  getCommissionFromPayer?: boolean;
  pluginKey?: string;
  redirectUrl?: string;
  userWalletCurrencySymbol?: string;
  userWalletNumber?: string;
}

export interface CreatePosRequestRequestVM {
  /** - Format: decimal */
  amount: number;
  redirectType: RedirectType;
  clientUniqueId?: string;
  customData?: EpayRequestCustomDataRequestVM[];
  description?: string;
  getCommissionFromPayer?: boolean;
  pluginKey?: string;
  redirectUrl?: string;
  userWalletCurrencySymbol?: string;
  userWalletNumber?: string;
}

export interface CreateSettlementRequestVM {
  /** - Format: decimal */
  amount: number;
  description?: string;
  /** - Format: int64 */
  userBankId?: number;
}

export interface CreateUserBankDetailRequestVM {
  /** - Format: int32 */
  bankId: number;
  businessShareType: BusinessShareType;
  accountNo?: string;
  cardNumber?: string;
  documents?: DocumentRequestVM[];
  firstName?: string;
  lastName?: string;
  name?: string;
  nationalCode?: string;
  shebaNo?: string;
}

export interface CreateUserBankRequestVM {
  accountNo?: string;
  /** - Format: int32 */
  bankId?: number;
  cardNumber?: string;
  name?: string;
  shebaNo?: string;
}

export interface CreateUserWalletRequestVM {
  currencySymbol?: string;
  getCommissionFromPayer?: boolean;
  /** - Format: int32 */
  userBankId?: number;
  walletName?: string;
}

export interface CreateWithdrawRequestUserWalletResponseVM {
  /** - Format: int64 */
  id: number;
}

export interface CurrenciesRateListResponseVM {
  currenciesRates?: CurrenciesRateResponseVM[];
  defaultCryptoSymbol?: string;
  defaultFiatSymbol?: string;
}

export interface CurrenciesRateResponseVM {
  /** - Format: decimal */
  defaultCryptoRate: number;
  /** - Format: decimal */
  defaultFiatRate: number;
  currencySymbol?: string;
}

export interface CurrencyResponseVM {
  canBuy: boolean;
  canCharge: boolean;
  canDeposit: boolean;
  canSettlement: boolean;
  canTrade: boolean;
  canWithdraw: boolean;
  currencyType: CurrencyType;
  /** - Format: int32 */
  decimalDigits: number;
  enabled: boolean;
  isDefaultCrypto: boolean;
  isDefaultFiat: boolean;
  logoAddress?: string;
  name?: string;
  specialTips?: string;
  symbol?: string;
}

export type CurrencyType = "Fiat" | "Crypto";

export interface DeleteAuthV1PrivateUsertrusteddeviceQueryParams {
  /** - Format: int64 */
  id?: number;
}

export interface DeleteAuthV1ProtectApikeyQueryParams {
  /** - Format: int64 */
  id?: number;
}

export interface DeleteEngagementV1PrivateNotificationClearallQueryParams {
  type?: NotificationTypes;
}

export interface DepositTransactionHistoryListResponseVM {
  /** - Format: int64 */
  count: number;
  list?: DepositTransactionHistoryResponseVM[];
}

export interface DepositTransactionHistoryResponseVM {
  /** - Format: date-time */
  createDate: string;
  /** - Format: int64 */
  id: number;
  status: TransactionHistoryStatus;
  transferType: TransferType;
  /** - Format: uuid */
  userId: string;
  walletType: UserWalletType;
  address?: string;
  addressTag?: string;
  currencySymbol?: string;
  moneyNetworkSymbol?: string;
  transferAmount?: string;
  txId?: string;
}

export interface DivideEpayRequestShareInfoRequestVM {
  /** - Format: decimal */
  dividerAmount: number;
  /** - Format: decimal */
  userAmount: number;
  userApiKey?: string;
  userEmail?: string;
  userMobile?: string;
  userShareNumber?: string;
}

export type DocumentContentType =
  | "Other"
  | "UserBankVerification"
  | "IdentityCard"
  | "BusinessStatute"
  | "BusinessLatestChangesAnnouncement"
  | "BusinessOwnersIdentityCards"
  | "BusinessOwnersBirthCertificates";

export interface DocumentFileRequestVM {
  fileType: DocumentType;
  /** - Format: uuid */
  fileUniqueId: string;
}

export interface DocumentRequestVM {
  documentContentType: DocumentContentType;
  /** - Format: uuid */
  fileUniqueId: string;
}

export type DocumentType =
  | "Unknown"
  | "NationalCard"
  | "BirthCertificate"
  | "Passport"
  | "VerificationLetter"
  | "BirthCertificateDescription";

export interface DomainCurrencyClassResponseVM {
  /** - Format: int32 */
  domainId: number;
  /** - Format: decimal */
  feeRate: number;
  /** - Format: int32 */
  id: number;
  name?: string;
}

export interface DomainCurrencyResponseVM {
  type: CurrencyType;
  domainMoneyNetworks?: DomainMoneyNetworkResponseVM[];
  name?: string;
  symbol?: string;
}

export interface DomainMoneyNetworkResponseVM {
  /** - Format: int32 */
  decimalDigits: number;
  depositEnabled: boolean;
  /** - Format: decimal */
  depositFee: number;
  /** - Format: decimal */
  maximumWithdraw: number;
  /** - Format: decimal */
  minDeposit: number;
  /** - Format: decimal */
  minimumWithdraw: number;
  withdrawEnabled: boolean;
  /** - Format: decimal */
  withdrawFee: number;
  /** - Format: decimal */
  maxDeposit?: number;
  name?: string;
  symbol?: string;
}

export interface DomainSettingVM {
  /** - Format: decimal */
  minimumValueForHideSmallBalance: number;
  defaultCryptoCurrencySymbol?: string;
  defaultFiatCurrencySymbol?: string;
}

export interface DomainTraderLevelResponseVM {
  /** - Format: decimal */
  cryptoMakerFeePercent: number;
  /** - Format: decimal */
  cryptoTakerFeePercent: number;
  /** - Format: decimal */
  fiatMakerFeePercent: number;
  /** - Format: decimal */
  fiatTakerFeePercent: number;
  /** - Format: int32 */
  levelIndex: number;
  /** - Format: decimal */
  tradeDefaultCryptoVolumeFrom: number;
  /** - Format: decimal */
  tradeDefaultCryptoVolumeTo: number;
  name?: string;
}

export interface EPayRequestAudienceRequestVM {
  contactType: UserIdentifierType;
  contact?: string;
  fullName?: string;
}

export interface EPayRequestAudienceResponseVM {
  contactType: UserIdentifierType;
  contact?: string;
  fullName?: string;
}

export interface EPayRequestReceiptInfoResponseVM {
  /** - Format: decimal */
  amount: number;
  epayRequestGatewayType: EpayRequestGatewayType;
  epayRequestStatus: EpayRequestStatus;
  epayRequestType: EpayRequestType;
  payViaOtherCurrency: boolean;
  /** - Format: decimal */
  payerAmount: number;
  blockchainDepositInfos?: BlockchainDepositInfoResponseVM[];
  cardNumber?: string;
  currencySymbol?: string;
  description?: string;
  epayTryStatus?: EpayTryStatus;
  /** - Format: date-time */
  payDate?: string;
  payTo?: UserWalletInfoResponseVM[];
  payerCurrencySymbol?: string;
  referenceNumber?: string;
}

export interface EPayRequestSingleResponseVM {
  /** - Format: decimal */
  amount: number;
  /** - Format: uuid */
  assignedToUserId: string;
  /** - Format: date-time */
  createDate: string;
  epayRequestActualState: EpayRequestActualState;
  epayRequestType: EpayRequestType;
  /** - Format: date-time */
  expireDate: string;
  /** - Format: int64 */
  id: number;
  /** - Format: decimal */
  requestedAmount: number;
  assignedUserDisplayName?: string;
  audiences?: EPayRequestAudienceResponseVM[];
  currencySymbol?: string;
  customDatas?: EpayRequestCustomDataResponseVM[];
  description?: string;
  ownerDisplayName?: string;
  /** - Format: date-time */
  payDate?: string;
  payerDisplayName?: string;
  token?: string;
}

export interface EpayPayWithWalletRequestVM {
  description?: string;
  token?: string;
  walletNumber?: string;
}

export type EpayRequestActualState =
  | "Initiated"
  | "Paid"
  | "Cancelled"
  | "Expired";

export interface EpayRequestCountResponseVM {
  epayRequestActualState: EpayRequestActualState;
  /** - Format: int64 */
  totalCount: number;
}

export interface EpayRequestCustomDataInfoResponseVM {
  fieldType: FieldDisplayType;
  isEditable: boolean;
  key?: string;
  listValues?: string;
  value?: string;
}

export interface EpayRequestCustomDataRequestVM {
  key?: string;
  value?: string;
}

export interface EpayRequestCustomDataResponseVM {
  key?: string;
  value?: string;
}

export type EpayRequestGatewayType = "RialShaparak" | "BlockchainAddress";

export interface EpayRequestInfoResponseVM {
  /** - Format: decimal */
  amount: number;
  /** - Format: uuid */
  assignedToUserId: string;
  /** - Format: decimal */
  commissionAmount: number;
  /** - Format: date-time */
  createDate: string;
  epayRequestGatewayType: EpayRequestGatewayType;
  epayRequestType: EpayRequestType;
  /** - Format: date-time */
  expireDate: string;
  getComissionFromPayer: boolean;
  payViaOtherCurrency: boolean;
  /** - Format: decimal */
  payerAmount: number;
  /** - Format: decimal */
  requestedAmount: number;
  status: EpayRequestActualState;
  assignedToAnonymous?: string;
  assignedUserDisplayName?: string;
  audiences?: EPayRequestAudienceResponseVM[];
  cardNumber?: string;
  clientUniqueId?: string;
  currencySymbol?: string;
  description?: string;
  epayRequestCustomDataInfos?: EpayRequestCustomDataInfoResponseVM[];
  epayTryStatus?: EpayTryStatus;
  /** - Format: date-time */
  payDate?: string;
  payTo?: UserWalletInfoResponseVM[];
  payerCurrencySymbol?: string;
  payerDisplayName?: string;
  pluginKey?: string;
  postActionInfo?: BasePostActionInfoResponseVM;
  referenceNumber?: string;
  token?: string;
  /** - Format: int64 */
  voucherId?: number;
}

export interface EpayRequestListResponseVM {
  /** - Format: int64 */
  count: number;
  list?: EPayRequestSingleResponseVM[];
}

export type EpayRequestOwnerType = "CreatedByMe" | "AssignedToMe";

export interface EpayRequestResponseVM {
  paymentLink?: string;
  token?: string;
}

export type EpayRequestStatus =
  | "Pending"
  | "Paid"
  | "Cancelled"
  | "Expired"
  | "PartiallyPaid"
  | "PartiallyPaidThenCancelled"
  | "PartiallyPaidThenExpired";

export type EpayRequestType =
  | "Link"
  | "POS"
  | "DivideIpg"
  | "DivideIpgWithBlock"
  | "Charge"
  | "IPG"
  | "DivideLink"
  | "DivideLinkWithBlock";

export type EpayTryStatus =
  | "Initiated"
  | "UnPaid"
  | "VerifyPending"
  | "Paid"
  | "WaitingForBankToken";

export interface ExceptionDetails {
  /** - Format: int32 */
  statusCode: number;
  field?: string;
  message?: string;
}

export type FieldDisplayType =
  | "String"
  | "Text"
  | "Currency"
  | "Integer"
  | "Float"
  | "Boolean"
  | "List";

export interface FindUserWalletResponseVM {
  currencySymbol?: string;
  /** - Format: uuid */
  profileImageFileUniqueId?: string;
  userDisplayName?: string;
  walletNumber?: string;
}

export interface ForgotPasswordRequestVM {
  otpCode?: string;
  password?: string;
  phoneNumber?: string;
  secureToken?: string;
  totpCode?: string;
}

export interface GetAnalyticsV1PrivateResellercommissionhistoryActiveusercountQueryParams {
  /** - Format: date-time */
  endDate?: string;
  /** - Format: date-time */
  startDate?: string;
}

export interface GetAnalyticsV1PrivateResellercommissionhistoryNewusercountQueryParams {
  /** - Format: date-time */
  endDate?: string;
  /** - Format: date-time */
  startDate?: string;
}

export interface GetAnalyticsV1PrivateResellercommissionhistoryTotalincomeQueryParams {
  /** - Format: date-time */
  endDate?: string;
  /** - Format: date-time */
  startDate?: string;
}

export interface GetAnalyticsV1PrivateResellercommissionhistoryTransactioncountQueryParams {
  /** - Format: date-time */
  endDate?: string;
  /** - Format: date-time */
  startDate?: string;
}

export interface GetAnalyticsV1PrivateSecurityactivityListQueryParams {
  /** - Format: int32 */
  page?: number;
  /** - Format: int32 */
  pageSize?: number;
  /** - Format: date-time */
  startDate?: string;
  status?: SecurityStatus;
}

export interface GetAnalyticsV1PrivateTradehistoryIncomeinviteeListQueryParams {
  /** - Format: date-time */
  endDate?: string;
  /** - Format: int32 */
  pageNo?: number;
  /** - Format: int32 */
  pageSize?: number;
  /** - Format: int64 */
  referralProgramId?: number;
  /** - Format: date-time */
  startDate?: string;
}

export interface GetAnalyticsV1PrivateTradehistoryIncomereferralListQueryParams {
  /** - Format: date-time */
  endDate?: string;
  /** - Format: int32 */
  pageNo?: number;
  /** - Format: int32 */
  pageSize?: number;
  /** - Format: int64 */
  referralProgramId?: number;
  /** - Format: date-time */
  startDate?: string;
}

export interface GetAnalyticsV1PrivateTradehistoryReferralhistoryQueryParams {
  account?: string;
  /** - Format: int32 */
  pageNo?: number;
  /** - Format: int32 */
  pageSize?: number;
  /** - Format: int64 */
  referralProgramId?: number;
}

export interface GetAnalyticsV1PrivateUserloginhistoryListQueryParams {
  /** - Format: int32 */
  pageNumber?: number;
  /** - Format: int32 */
  pageSize?: number;
  /** - Format: date-time */
  startDate?: string;
  status?: LoginStatus;
}

export interface GetAuthV1PrivateApikeyListQueryParams {
  /** - Format: int32 */
  page?: number;
  /** - Format: int32 */
  pageSize?: number;
}

export interface GetAuthV1PrivateApikeyQueryParams {
  /** - Format: int64 */
  id?: number;
}

export interface GetAuthV1PrivateUsertrusteddeviceListQueryParams {
  /** - Format: int32 */
  Page?: number;
  /** - Format: int32 */
  PageSize?: number;
}

export interface GetAuthV1PrivateUsertrusteddeviceLoginhistoryListQueryParams {
  DeviceId?: string;
  /** - Format: int32 */
  Page?: number;
  /** - Format: int32 */
  PageSize?: number;
}

export interface GetAuthV1PublicAuthIsphonenumberregisteredQueryParams {
  phoneNumber?: string;
}

export interface GetBaseinfoV1PublicCityListQueryParams {
  active?: boolean;
  /** - Format: int32 */
  provinceId?: number;
}

export interface GetBaseinfoV1PublicCountryAllQueryParams {
  active?: boolean;
}

export interface GetBaseinfoV1PublicProvinceListQueryParams {
  active?: boolean;
  /** - Format: int32 */
  countryId?: number;
}

export interface GetCapitalV1PrivateDepositListQueryParams {
  currencySymbol?: string;
  /** - Format: date-time */
  endTime?: string;
  moneyNetworkSymbol?: string;
  /** - Format: int32 */
  pageNumber?: number;
  /** - Format: int32 */
  pageSize?: number;
  /** - Format: date-time */
  startTime?: string;
  status?: TransactionHistoryStatus;
  txId?: string;
}

export interface GetCapitalV1PrivatePosListQueryParams {
  currencySymbol?: string;
  /** - Format: date-time */
  endTime?: string;
  /** - Format: int32 */
  pageNumber?: number;
  /** - Format: int32 */
  pageSize?: number;
  /** - Format: date-time */
  startTime?: string;
  status?: TransactionHistoryStatus;
}

export interface GetCapitalV1PrivateSettlementListQueryParams {
  currencySymbol?: string;
  /** - Format: date-time */
  endTime?: string;
  /** - Format: int32 */
  pageNumber?: number;
  /** - Format: int32 */
  pageSize?: number;
  /** - Format: date-time */
  startTime?: string;
  status?: TransactionHistoryStatus;
}

export interface GetCapitalV1PrivateWithdrawDetailQueryParams {
  /** - Format: int64 */
  id?: number;
}

export interface GetCapitalV1PrivateWithdrawInfoQueryParams {
  /** - Format: int64 */
  id?: number;
}

export interface GetCapitalV1PrivateWithdrawListQueryParams {
  currencySymbol?: string;
  /** - Format: date-time */
  endTime?: string;
  moneyNetworkSymbol?: string;
  /** - Format: int32 */
  pageNumber?: number;
  /** - Format: int32 */
  pageSize?: number;
  /** - Format: date-time */
  startTime?: string;
  status?: TransactionHistoryStatus;
  txId?: string;
}

export interface GetEngagementV1PrivateNotificationQueryParams {
  /** - Format: date-time */
  endDate?: string;
  notificationType?: NotificationTypes;
  /** - Format: int32 */
  pageNo?: number;
  /** - Format: int32 */
  pageSize?: number;
  read?: boolean;
  /** - Format: date-time */
  startDate?: string;
}

export interface GetEngagementV1PublicCouponIsvalidQueryParams {
  couponName?: string;
}

export interface GetEngagementV1PublicCouponIsvalidforphonenumberQueryParams {
  couponName?: string;
  phonenumber?: string;
}

export interface GetExchangeV1PrivateAllorderlistQueryParams {
  /** - Format: date-time */
  endTime?: string;
  /** - Format: int64 */
  fromId?: number;
  /** - Format: int32 */
  limit?: number;
  /** - Format: date-time */
  startTime?: string;
}

export interface GetExchangeV1PrivateAllordersQueryParams {
  baseCurrencySymbol?: string;
  /** - Format: date-time */
  endTime?: string;
  /** - Format: int64 */
  orderId?: number;
  orderSide?: AppOrderSide;
  orderSourceType?: AppOrderSourceType;
  /** - Format: int32 */
  pageNo?: number;
  /** - Format: int32 */
  pageSize?: number;
  quoteCurrencySymbol?: string;
  /** - Format: date-time */
  startTime?: string;
  symbol?: string;
}

export interface GetExchangeV1PrivateAlltradesQueryParams {
  baseCurrencySymbol?: string;
  commissionCurrencySymbol?: string;
  /** - Format: date-time */
  endTime?: string;
  /** - Format: int64 */
  orderId?: number;
  orderSourceType?: AppOrderSourceType;
  /** - Format: int32 */
  pageNo?: number;
  /** - Format: int32 */
  pageSize?: number;
  quoteCurrencySymbol?: string;
  side?: AppOrderSide;
  /** - Format: date-time */
  startTime?: string;
  symbol?: string;
}

export interface GetExchangeV1PrivateMarketsusertraderlevelfeeQueryParams {
  symbols?: string[];
}

export interface GetExchangeV1PrivateOpenocoorderlistQueryParams {
  symbol?: string;
}

export interface GetExchangeV1PrivateOpenordersQueryParams {
  orderSourceType?: AppOrderSourceType;
  symbol?: string;
}

export interface GetExchangeV1PrivateOrderQueryParams {
  /** - Format: int64 */
  orderId?: number;
  origClientOrderId?: string;
  symbol?: string;
}

export interface GetExchangeV1PrivateOrderlistQueryParams {
  /** - Format: int64 */
  orderListId?: number;
  origClientOrderId?: string;
}

export interface GetExchangeV1PrivateUsertraderlevelfeeQueryParams {
  symbol?: string;
}

export interface GetExchangeV1PublicDepthQueryParams {
  /** - Format: int32 */
  limit?: number;
  symbol?: string;
}

export interface GetExchangeV1PublicKlinesQueryParams {
  /** - Format: date-time */
  endTime?: string;
  interval?: AppKLineInterval;
  /** - Format: int32 */
  limit?: number;
  /** - Format: date-time */
  startTime?: string;
  symbol?: string;
}

export interface GetExchangeV1PublicMarketsQueryParams {
  symbol?: string;
  symbols?: string[];
}

export interface GetExchangeV1PublicSymbolRateQueryParams {
  symbol?: string;
}

export interface GetExchangeV1PublicTicker24hrQueryParams {
  symbol?: string;
}

export interface GetExchangeV1PublicTradesQueryParams {
  /** - Format: int32 */
  limit?: number;
  symbol?: string;
}

export interface GetOcoOrderResponseVM {
  listOrderStatus: AppListOrderStatus;
  listStatusType: AppListStatusType;
  /** - Format: int64 */
  orderListId: number;
  /** - Format: int64 */
  transactionTime: number;
  contingencyType?: string;
  listClientOrderId?: string;
  orders?: OrderMinimalInfoResponseVM[];
  symbol?: string;
}

export interface GetOrderResponseVM {
  /** - Format: decimal */
  cummulativeQuoteQty: number;
  /** - Format: decimal */
  executedQty: number;
  /** - Format: int64 */
  orderId: number;
  /** - Format: int64 */
  orderListId: number;
  side: AppOrderSide;
  status: AppOrderStatus;
  /** - Format: int64 */
  time: number;
  timeInForce: AppTimeInForce;
  /** - Format: int64 */
  transactTime: number;
  type: AppOrderType;
  /** - Format: decimal */
  averageFilledPrice?: number;
  baseCurrencySymbol?: string;
  clientOrderId?: string;
  /** - Format: decimal */
  icebergQty?: number;
  isWorking?: boolean;
  origClientOrderId?: string;
  /** - Format: decimal */
  origQty?: number;
  /** - Format: decimal */
  origQuoteOrderQty?: number;
  /** - Format: decimal */
  price?: number;
  quoteCurrencySymbol?: string;
  /** - Format: decimal */
  stopPrice?: number;
  symbol?: string;
  /** - Format: int64 */
  updateTime?: number;
}

export interface GetPartyV1PrivateFavoritemarketQueryParams {
  marketType?: MarketType;
}

export interface GetPartyV1PrivateNotificationAllQueryParams {
  notificationType?: HitoBitNotificationType;
  /** - Format: int32 */
  page?: number;
  /** - Format: int32 */
  pageSize?: number;
  readed?: boolean;
}

export interface GetPartyV1PrivatePluginListQueryParams {
  scenarioKey?: string;
}

export interface GetPartyV1PrivateUserProfileimageQueryParams {
  /** - Format: uuid */
  userId?: string;
}

export interface GetPartyV1PublicPluginQueryParams {
  pluginKey?: string;
}

export interface GetPaymentV1PrivateEpayrequestCommissionQueryParams {
  /** - Format: decimal */
  amount?: number;
  moneyNetworkSymbol?: string;
  walletNumber?: string;
}

export interface GetPaymentV1PrivateEpayrequestCountFrommeQueryParams {
  /** - Format: date-time */
  endDate?: string;
  pluginKey?: string;
  /** - Format: date-time */
  startDate?: string;
}

export interface GetPaymentV1PrivateEpayrequestCountQueryParams {
  /** - Format: date-time */
  endDate?: string;
  pluginKey?: string;
  /** - Format: date-time */
  startDate?: string;
  walletNumber?: string;
}

export interface GetPaymentV1PrivateEpayrequestInfoClientuniqueidQueryParams {
  clientUniqueId?: string;
}

export interface GetPaymentV1PrivateEpayrequestIpgListQueryParams {
  assignedToUserIds?: string[];
  /** - Format: date-time */
  endDate?: string;
  epayRequestActualStates?: EpayRequestActualState[];
  ownerType?: EpayRequestOwnerType;
  /** - Format: int32 */
  pageNo?: number;
  /** - Format: int32 */
  pageSize?: number;
  pluginKey?: string;
  pluginProperties?: PluginPropertyRequestVM[];
  /** - Format: date-time */
  startDate?: string;
  walletNumbers?: string[];
}

export interface GetPaymentV1PrivateEpayrequestListFrommeQueryParams {
  /** - Format: date-time */
  endDate?: string;
  epayRequestActualStates?: EpayRequestActualState[];
  /** - Format: int32 */
  pageNo?: number;
  /** - Format: int32 */
  pageSize?: number;
  /** - Format: date-time */
  startDate?: string;
}

export interface GetPaymentV1PrivateEpayrequestListQueryParams {
  assignedToUserIds?: string[];
  /** - Format: date-time */
  endDate?: string;
  epayRequestActualStates?: EpayRequestActualState[];
  ownerType?: EpayRequestOwnerType;
  /** - Format: int32 */
  pageNo?: number;
  /** - Format: int32 */
  pageSize?: number;
  pluginKey?: string;
  pluginProperties?: PluginPropertyRequestVM[];
  /** - Format: date-time */
  startDate?: string;
  walletNumbers?: string[];
}

export interface GetPaymentV1PrivateEpayrequestPluginCountQueryParams {
  /** - Format: date-time */
  endDate?: string;
  pluginKey?: string;
  pluginPropertyKey?: string;
  pluginPropertyValue?: string;
  /** - Format: date-time */
  startDate?: string;
  walletNumber?: string;
}

export interface GetPaymentV1PrivateEpayrequestPostactionPlacemarketbuyorderQueryParams {
  /** - Format: uuid */
  uniqueId?: string;
}

export interface GetPaymentV1PublicEpayrequestGetblockchainaddressQueryParams {
  /** - Format: int32 */
  currencyId?: number;
  /** - Format: int64 */
  ePayRequestId?: number;
  /** - Format: int32 */
  moneyNetworkId?: number;
}

export interface GetPaymentV1PublicEpayrequestInfoTokenQueryParams {
  token?: string;
}

export interface GetPaymentV1PublicEpayrequestReceiptinfoClientuniqueidQueryParams {
  clientUniqueId?: string;
}

export interface GetPaymentV1PublicEpayrequestReceiptinfoTokenQueryParams {
  token?: string;
}

export interface GetSettlementV1PrivateAddressbookQueryParams {
  /** - Format: int64 */
  id?: number;
}

export interface GetSettlementV1PrivateCommissionPolicyQueryParams {
  moneyNetworkSymbol?: string;
  userWalletNumber?: string;
}

export interface GetSettlementV1PrivateCommissionQueryParams {
  /** - Format: decimal */
  amount?: number;
  moneyNetworkSymbol?: string;
  walletNumber?: string;
}

export interface GetSettlementV1PrivateCountQueryParams {
  /** - Format: int32 */
  fromMonth?: number;
  /** - Format: int32 */
  fromYear?: number;
  isAuto?: boolean;
  /** - Format: int32 */
  month?: number;
  status?: SettlementRequestStatus;
  /** - Format: int32 */
  takeDays?: number;
  /** - Format: int32 */
  takeMonths?: number;
  /** - Format: int32 */
  takeYears?: number;
  /** - Format: int32 */
  toMonth?: number;
  /** - Format: int32 */
  toYear?: number;
  /** - Format: int64 */
  userBankId?: number;
  walletNumber?: string;
  /** - Format: int32 */
  year?: number;
}

export interface GetSettlementV1PrivateListQueryParams {
  /** - Format: date-time */
  EndDate?: string;
  IsAuto?: boolean;
  /** - Format: decimal */
  MaximumAmount?: number;
  /** - Format: decimal */
  MinimumAmount?: number;
  /** - Format: int32 */
  PageNo?: number;
  /** - Format: int32 */
  PageSize?: number;
  /** - Format: date-time */
  StartDate?: string;
  States?: SettlementRequestStatus[];
  UserBankIds?: number[];
  WalletNumbers?: string[];
}

export interface GetSettlementV1PrivateQueryParams {
  /** - Format: int64 */
  settelmentRequestId?: number;
}

export interface GetSettlementV1PrivateReportQueryParams {
  /** - Format: int32 */
  fromMonth?: number;
  /** - Format: int32 */
  fromYear?: number;
  isAuto?: boolean;
  /** - Format: int32 */
  month?: number;
  status?: SettlementRequestStatus;
  /** - Format: int32 */
  takeDays?: number;
  /** - Format: int32 */
  takeMonths?: number;
  /** - Format: int32 */
  takeYears?: number;
  /** - Format: int32 */
  toMonth?: number;
  /** - Format: int32 */
  toYear?: number;
  /** - Format: int64 */
  userBankId?: number;
  walletNumber?: string;
  /** - Format: int32 */
  year?: number;
}

export interface GetSettlementV1PrivateSubuserQueryParams {
  /** - Format: int64 */
  ConnectionId?: number;
  /** - Format: date-time */
  EndDate?: string;
  IsAuto?: boolean;
  /** - Format: decimal */
  MaximumAmount?: number;
  /** - Format: decimal */
  MinimumAmount?: number;
  /** - Format: int32 */
  PageNo?: number;
  /** - Format: int32 */
  PageSize?: number;
  /** - Format: date-time */
  StartDate?: string;
  States?: SettlementRequestStatus[];
  UserBankIds?: number[];
  WalletNumbers?: string[];
}

export interface GetStorageV1PrivateFileDownloadQueryParams {
  /** - Format: uuid */
  fileUniqueId?: string;
}

export interface GetWalletV1PrivateDomaincurrencyfeerateBydomaincurrencyclassidQueryParams {
  /** - Format: int32 */
  domainCurrencyClassId?: number;
}

export interface GetWalletV1PrivateGrouptransferCommissionQueryParams {
  /** - Format: decimal */
  amount?: number;
  moneyNetworkSymbol?: string;
  walletNumber?: string;
}

export interface GetWalletV1PrivateInternalwithdrawInfoQueryParams {
  /** - Format: int64 */
  internalWithdrawId?: number;
}

export interface GetWalletV1PrivateQueryParams {
  walletNumber?: string;
}

export interface GetWalletV1PrivateSubuserAllQueryParams {
  walletNumber?: string;
}

export interface GetWalletV1PrivateSubuserAssignableQueryParams {
  walletNumber?: string;
}

export interface GetWalletV1PrivateTransferCommissionQueryParams {
  /** - Format: decimal */
  amount?: number;
  moneyNetworkSymbol?: string;
  walletNumber?: string;
}

export interface GetWalletV1PrivateUserassetSpotDefaultQueryParams {
  symbol?: string;
}

export interface GetWalletV1PrivateUserbankStatusQueryParams {
  accountNo?: string;
}

export interface GetWalletV1PublicFindQueryParams {
  currencySymbol?: string;
  /** - Format: int64 */
  customerNumber?: number;
  email?: string;
  phoneNumber?: string;
  walletNumber?: string;
}

export interface GetWithdrawRequestUserWalletItemResponseVM {
  /** - Format: date-time */
  createDate: string;
  /** - Format: decimal */
  requestAmount: number;
  /** - Format: uuid */
  submitUniqueId: string;
  withdrawRequestStatus: WithdrawRequestStatus;
  currencySymbol?: string;
  destinationBlockchainAddress?: string;
  moneyNetworkSymbol?: string;
  txId?: string;
}

export interface GlobalWalletProviderResponseVM {
  globalWalletProviderType: GlobalWalletProviderType;
  /** - Format: int32 */
  id?: number;
  name?: string;
}

export type GlobalWalletProviderType = "Exchange" | "Wallet";

export type GrantType =
  | "Password"
  | "RefreshToken"
  | "Otp"
  | "MFA"
  | "Implicit"
  | "Hybrid"
  | "AuthorizationCode"
  | "ClientCredentials"
  | "DeviceFlow";

export interface GroupTransferMoneyRequestVM {
  description?: string;
  targets?: GroupTransferMoneyTargetRequestVM[];
  walletNumber?: string;
}

export interface GroupTransferMoneyTargetRequestVM {
  /** - Format: decimal */
  amount: number;
  description?: string;
  identifier?: string;
}

export interface GroupTransferResponseVM {
  /** - Format: decimal */
  amount: number;
  /** - Format: date-time */
  createDate: string;
  /** - Format: int64 */
  voucherId: number;
  description?: string;
  targets?: GroupTransferTargetInfoResponseVM[];
  userDisplayName?: string;
  walletName?: string;
}

export interface GroupTransferTargetInfoResponseVM {
  /** - Format: int64 */
  accountId: number;
  /** - Format: decimal */
  amount: number;
  /** - Format: int32 */
  currencyId: number;
  /** - Format: int32 */
  domainId: number;
  /** - Format: uuid */
  userId: string;
  description?: string;
  userDisplayName?: string;
  userPhoneNumber?: string;
  walletName?: string;
  walletNumber?: string;
}

export type HitoBitNotificationType =
  | "Activities"
  | "TradeNotification"
  | "HitoBitNews"
  | "SystemMessages";

export interface HitoBitSymbolFilter {
  filterType: SymbolFilterType;
}

export type IdentificationLevel =
  | "None"
  | "Zero"
  | "One"
  | "Two"
  | "Three"
  | "Four";

export interface IdentificationLevelGuideResponseVM {
  cryptoDepositAbility: boolean;
  cryptoTradeAbility: boolean;
  cryptoWithdrawAbility: boolean;
  /** - Format: decimal */
  dailyCryptoWithdrawAmount: number;
  /** - Format: decimal */
  dailyFiatDepositAmount: number;
  /** - Format: decimal */
  dailyFiatWithdrawAmount: number;
  fiatDepositAbility: boolean;
  fiatTradeAbility: boolean;
  fiatWithdrawAbility: boolean;
  level: IdentificationLevel;
  unlimitedFiatDepositAbility: boolean;
  userBasedCryptoWithdrawAbility: boolean;
  userBasedFiatWithdrawAbility: boolean;
}

export type IdentificationLevelRequestStatus = "Pending" | "Confirm" | "Reject";

export interface IdentificationUserBankRequirementResponseVM {
  validBirthday: boolean;
  validNationalCode: boolean;
}

export type IdentityFailedStatusCodes =
  | "BadRequest"
  | "TwoFactor"
  | "UntrustedDevice"
  | "TwoFactorAndUntrustedDevice"
  | "UserRegistrationNotCompleted"
  | "UserIsNotActive"
  | "IsLockedOut"
  | "IsNotAllowed"
  | "InvalidUserNameOrPassword"
  | "FailedTwoFa"
  | "UserIsSuspended";

export type IdentityStatus =
  | "None"
  | "WatingForCheck"
  | "Checking"
  | "EditingRequired"
  | "Approved"
  | "Rejected";

export interface InternalWithdrawResponseVM {
  /** - Format: decimal */
  amount: number;
  /** - Format: decimal */
  comission: number;
  /** - Format: date-time */
  createDate: string;
  /** - Format: int32 */
  currencyId: number;
  /** - Format: int32 */
  domainId: number;
  /** - Format: uuid */
  paidToUserId: string;
  /** - Format: int64 */
  paidToUserWalletId: number;
  /** - Format: uuid */
  userId: string;
  /** - Format: int64 */
  userWalletId: number;
  /** - Format: int64 */
  voucherId: number;
  currencySymbol?: string;
  /** - Format: int64 */
  epayRequestId?: number;
  paidToUserDisplayName?: string;
  paidToUserWalletName?: string;
  paidToUserWalletNumber?: string;
  userWalletName?: string;
  userWalletNumber?: string;
  /** - Format: int64 */
  withdrawRequestUserWalletId?: number;
}

export interface KlineDataResponseVM {
  /** - Format: decimal */
  baseVolume: number;
  /** - Format: decimal */
  close: number;
  /** - Format: int64 */
  closeTime: number;
  /** - Format: decimal */
  high: number;
  /** - Format: decimal */
  low: number;
  /** - Format: decimal */
  open: number;
  /** - Format: int64 */
  openTime: number;
  /** - Format: decimal */
  quoteVolume: number;
  /** - Format: decimal */
  takerBuyBaseVolume: number;
  /** - Format: decimal */
  takerBuyQuoteVolume: number;
  /** - Format: int64 */
  tradeCount: number;
  /** - Format: decimal */
  ignore?: number;
}

export type LogicalActionType =
  | "EpayRequest"
  | "TransferMoney"
  | "WalletCharge"
  | "ServiceBill"
  | "ServiceMobileCharge"
  | "POS"
  | "ShareAndBlockRequest"
  | "ShareRequest"
  | "Settlement"
  | "GroupTransferMoney"
  | "UnblockMoney"
  | "Gift"
  | "TaxiFarePayment"
  | "Withdraw"
  | "IPG"
  | "InternalTrade"
  | "ResellerIncome"
  | "PspTransaction"
  | "ExternalTrade"
  | "ExternalManualTrade"
  | "PaymentWithIdentifier"
  | "DomainBankRedirectOnEpay"
  | "DomainBankTransfer";

export interface LoginModelRequestVM {
  grantType: GrantType;
  clientId?: string;
  clientSecret?: string;
  otpCode?: string;
  otpToken?: string;
  password?: string;
  refreshToken?: string;
  totpCode?: string;
  username?: string;
}

export type LoginStatus = "Completed" | "Failed";

export interface MarketRateLimitRsponseVM {
  interval: RateLimitInterval;
  /** - Format: int32 */
  intervalNumber: number;
  /** - Format: int32 */
  limit: number;
  type: RateLimitType;
}

export interface MarketResponseVM {
  /** - Format: int64 */
  serverTime: number;
  exchangeFilters?: any[];
  rateLimits?: MarketRateLimitRsponseVM[];
  symbols?: MarketSymbolResponseVM[];
  timeZone?: string;
}

export interface MarketSymbolResponseVM {
  /** - Format: int32 */
  baseAssetPrecision: number;
  /** - Format: int32 */
  baseCommissionPrecision: number;
  iceBergAllowed: boolean;
  isMarginTradingAllowed: boolean;
  isSpotTradingAllowed: boolean;
  ocoAllowed: boolean;
  /** - Format: int32 */
  quoteAssetPrecision: number;
  /** - Format: int32 */
  quoteCommissionPrecision: number;
  quoteOrderQuantityMarketAllowed: boolean;
  status: SymbolStatus;
  baseAsset?: string;
  filters?: HitoBitSymbolFilter[];
  name?: string;
  orderTypes?: AppOrderType[];
  permissions?: AccountType[];
  quoteAsset?: string;
}

export interface MarketTickerPriceResponseVM {
  /** - Format: decimal */
  askPrice: number;
  /** - Format: decimal */
  askQuantity: number;
  /** - Format: decimal */
  baseVolume: number;
  /** - Format: decimal */
  bidPrice: number;
  /** - Format: decimal */
  bidQuantity: number;
  /** - Format: int64 */
  closeTime: number;
  /** - Format: int64 */
  firstTradeId: number;
  /** - Format: decimal */
  highPrice: number;
  isHighlight: boolean;
  /** - Format: int64 */
  lastMarketInfoChangeDate: number;
  /** - Format: decimal */
  lastPrice: number;
  /** - Format: decimal */
  lastQuantity: number;
  /** - Format: int64 */
  lastTradeId: number;
  /** - Format: decimal */
  lowPrice: number;
  /** - Format: decimal */
  openPrice: number;
  /** - Format: int64 */
  openTime: number;
  /** - Format: decimal */
  prevDayClosePrice: number;
  /** - Format: decimal */
  priceChange: number;
  /** - Format: decimal */
  priceChangePercent: number;
  /** - Format: decimal */
  quoteVolume: number;
  smartTradeEngine: boolean;
  /** - Format: int64 */
  symbolPublicOfferingDate: number;
  /** - Format: decimal */
  totalTrades: number;
  /** - Format: decimal */
  weightedAveragePrice: number;
  baseCurrencySymbol?: string;
  quoteCurrencySymbol?: string;
  symbol?: string;
}

export type MarketType = "Spot" | "Futures";

export interface MoneyNetworkResponseVM {
  /** - Format: int32 */
  estimatedArrivalTime: number;
  isTag: boolean;
  addressRegex?: string;
  addressUrl?: string;
  memoRegex?: string;
  name?: string;
  symbol?: string;
  txUrl?: string;
}

export interface NewEmailRequestVM {
  email?: string;
  emailOtpCode?: string;
  emailOtpToken?: string;
  mobileOtpCode?: string;
  mobileOtpToken?: string;
  totpCode?: string;
}

export interface Notification2ListResponseVM {
  /** - Format: int64 */
  count: number;
  list?: Notification2ResponseVM[];
}

export interface Notification2ResponseVM {
  /** - Format: date-time */
  createDate: string;
  /** - Format: int64 */
  id: number;
  level: NotificationLevel;
  read: boolean;
  type: NotificationTypes;
  /** - Format: uuid */
  userId: string;
  message?: string;
  /** - Format: date-time */
  readDate?: string;
  subject?: string;
}

export interface NotificationCountByTypeResponseVM {
  /** - Format: int64 */
  count: number;
  notificationType: NotificationTypes;
}

export type NotificationLevel =
  | "Unknown"
  | "Default"
  | "Success"
  | "Info"
  | "Warning"
  | "Danger";

export interface NotificationListResponseVM {
  /** - Format: int64 */
  count: number;
  notifications?: NotificationResponseVM[];
}

export type NotificationModelType =
  | "Default"
  | "EPayRequestUnpaid"
  | "EPayRequestPaid"
  | "UserIdentityUnknown"
  | "UserIdentityApproved"
  | "UserIdentityRejected"
  | "UpgradeToBusinessApproved"
  | "UpgradeToBusinessRejected"
  | "UserBankApproved"
  | "UserBankRejected"
  | "SubUserConnectionCreated"
  | "SubUserInvitationRejected"
  | "SubUserInvitationSent"
  | "MoneyDeposit"
  | "MoneyWithdrawal"
  | "SubUserDisconnectedByBusiness"
  | "SubUserDisconnectedBySubUser"
  | "Activities"
  | "TradeNotification"
  | "HitoBitNews"
  | "SystemMessages";

export interface NotificationResponseVM {
  closeable: boolean;
  /** - Format: date-time */
  createTimeUtc: string;
  dismissible: boolean;
  /** - Format: int32 */
  id: number;
  level: NotificationLevel;
  readed: boolean;
  type: NotificationModelType;
  data?: string;
  dataId?: string;
  /** - Format: date-time */
  lastFetchTimeUtc?: string;
  text?: string;
  title?: string;
}

export type NotificationTypes = "Activity" | "Trade" | "News" | "System";

export interface NotificationTypesReadCountResponseVM {
  /** - Format: int32 */
  count: number;
  notificationModelType: HitoBitNotificationType;
}

export interface OcoOrderResultInfoResponseVM {
  listOrderStatus: AppListOrderStatus;
  listStatusType: AppListStatusType;
  /** - Format: int64 */
  orderListId: number;
  /** - Format: int64 */
  transactionTime: number;
  contingencyType?: string;
  listClientOrderId?: string;
  orders?: OrderMinimalInfoResponseVM[];
  symbol?: string;
}

export interface OrderAckInfoResponseVM {
  /** - Format: int64 */
  orderId: number;
  /** - Format: int64 */
  orderListId: number;
  /** - Format: int64 */
  transactTime: number;
  clientOrderId?: string;
  symbol?: string;
}

export interface OrderBookResponseVM {
  /** - Format: int64 */
  lastUpdateId: number;
  /** - Format: int64 */
  lastUpdateIdStream: number;
  /** - Format: int64 */
  transactionTime: number;
  asks?: number[][];
  bids?: number[][];
  /** - Format: int64 */
  firstUpdateId?: number;
  symbol?: string;
}

export interface OrderMinimalInfoResponseVM {
  /** - Format: int64 */
  orderId: number;
  clientOrderId?: string;
  symbol?: string;
}

export type OrderResponseType = "ACK" | "RESULT" | "FULL";

export interface OrderResultInfoListResponseVM {
  /** - Format: int64 */
  count: number;
  list?: OrderResultInfoResponseVM[];
}

export interface OrderResultInfoResponseVM {
  /** - Format: decimal */
  cummulativeQuoteQty: number;
  /** - Format: decimal */
  executedQty: number;
  /** - Format: int64 */
  orderId: number;
  /** - Format: int64 */
  orderListId: number;
  side: AppOrderSide;
  status: AppOrderStatus;
  timeInForce: AppTimeInForce;
  /** - Format: int64 */
  transactTime: number;
  type: AppOrderType;
  /** - Format: decimal */
  averageFilledPrice?: number;
  baseCurrencySymbol?: string;
  clientOrderId?: string;
  /** - Format: decimal */
  origQty?: number;
  /** - Format: decimal */
  origQuoteOrderQty?: number;
  /** - Format: decimal */
  price?: number;
  quoteCurrencySymbol?: string;
  /** - Format: decimal */
  stopPrice?: number;
  symbol?: string;
}

export interface POSTransactionHistoryListResponseVM {
  /** - Format: int64 */
  count: number;
  list?: POSTransactionHistoryResponseVM[];
}

export interface POSTransactionHistoryResponseVM {
  /** - Format: date-time */
  createDate: string;
  /** - Format: int64 */
  id: number;
  status: TransactionHistoryStatus;
  transactionHistoryType: TransactionHistoryType;
  transferType: TransferType;
  /** - Format: uuid */
  userId: string;
  walletType: UserWalletType;
  currencySymbol?: string;
  description?: string;
  moneyNetworkSymbol?: string;
  transferAmount?: string;
  userWalletAccountNumber?: string;
}

export interface PayerCurrencyRequestVM {
  /** - Format: int32 */
  currencyId: number;
  /** - Format: int32 */
  moneyNetworkId: number;
  token?: string;
}

export interface PermissionRequestVM {
  /** - Format: int64 */
  connectionId: number;
  isEnabled: boolean;
  permissionType: SubUserPermissionType;
  walletNumber?: string;
}

export interface PlaceOcoOrderRequestVM {
  side: AppOrderSide;
  /** - Format: decimal */
  stopPrice: number;
  limitClientOrderId?: string;
  /** - Format: decimal */
  limitIcebergQty?: number;
  listClientOrderId?: string;
  newOrderRespType?: OrderResponseType;
  /** - Format: decimal */
  price?: number;
  /** - Format: decimal */
  quantity?: number;
  stopClientOrderId?: string;
  /** - Format: decimal */
  stopIcebergQty?: number;
  /** - Format: decimal */
  stopLimitPrice?: number;
  stopLimitTimeInForce?: AppTimeInForce;
  symbol?: string;
  /** - Format: int64 */
  trailingDelta?: number;
}

export interface PlaceOrderRequestVM {
  orderSourceType: AppOrderSourceType;
  side: AppOrderSide;
  type: AppOrderType;
  /** - Format: decimal */
  icebergQty?: number;
  newClientOrderId?: string;
  orderResponseType?: OrderResponseType;
  /** - Format: decimal */
  price?: number;
  /** - Format: decimal */
  quantity?: number;
  /** - Format: decimal */
  quoteOrderQty?: number;
  /** - Format: decimal */
  stopPrice?: number;
  symbol?: string;
  timeInForce?: AppTimeInForce;
}

export type PlatformType =
  | "Unknown"
  | "Server"
  | "Android"
  | "iOS"
  | "Device"
  | "Browser"
  | "PWA"
  | "Web"
  | "Windows"
  | "Linux"
  | "macOS"
  | "Desktop";

export interface PluginInfoResponseVM {
  /** - Format: int32 */
  id: number;
  amountCalculationExpression?: string;
  /** - Format: uuid */
  logoFileUniqueId?: string;
  name?: string;
  pluginProperties?: PluginPropertyResponseVM[];
}

export interface PluginPropertyRequestVM {
  key?: string;
  value?: string;
}

export interface PluginPropertyResponseVM {
  fieldType: FieldDisplayType;
  isCreatable: boolean;
  isListable: boolean;
  isRequired: boolean;
  isSearchable: boolean;
  /** - Format: int32 */
  order: number;
  description?: string;
  listValues?: string;
  name?: string;
  title?: string;
}

export type PostActionNature =
  | "EPayRequest"
  | "PlaceMarketBuyOrder"
  | "TaskCenter";

export interface PostActionPlaceMarketBuyOrderResponseVM {
  /** - Format: date-time */
  createDate: string;
  /** - Format: uuid */
  createdBy: string;
  marketType: MarketType;
  /** - Format: decimal */
  orderQuoteQuantity: number;
  postActionNature: PostActionNature;
  postActionStatus: PostActionStatus;
  /** - Format: uuid */
  uniqueId: string;
  /** - Format: date-time */
  doneDate?: string;
  marketSymbol?: string;
  /** - Format: int64 */
  resultOrderId?: number;
}

export type PostActionStatus = "Initiate" | "Success" | "Fail";

export interface PostAuthV1PrivateAuthEmailSendcodeQueryParams {
  email?: string;
}

export interface PostAuthV1PrivateAuthPhonecallSendcodeQueryParams {
  phoneNumber?: string;
}

export interface PostAuthV1PublicAuthChecktwofactorisenableQueryParams {
  phoneNumber?: string;
}

export interface PostAuthV1PublicAuthGetcodeQueryParams {
  phoneNumber?: string;
}

export interface PostPaymentV1PrivateEpayrequestUnblockQueryParams {
  /** - Format: int64 */
  ePayRequestId?: number;
}

export interface PostPaymentV1PublicEpayrequestSmsResendQueryParams {
  token?: string;
}

export interface PreferenceUserSettingRequestVM {
  activities?: boolean;
  autoBorrowRepayForMargin?: boolean;
  limitOrder?: boolean;
  marketOrder?: boolean;
  stopLimitOrder?: boolean;
  systemMessages?: boolean;
  tradeNotification?: boolean;
}

export interface ProvinceResponseVM {
  /** - Format: int32 */
  countryId: number;
  /** - Format: int32 */
  id: number;
  title?: string;
}

export type PurposeType =
  | "None"
  | "Login"
  | "ForgotPassword"
  | "ChangePassword"
  | "EnableMFA"
  | "DisableMFA"
  | "CreateApiKey"
  | "EditApiKey"
  | "DeleteApiKey"
  | "AddWhiteAdress"
  | "DeleteWhiteAdress"
  | "Withdraw"
  | "Register"
  | "PhoneCode"
  | "NewEmail"
  | "Email"
  | "Suspend"
  | "WhiteListAddressActivation";

export interface PutEngagementV1PrivateNotificationReadallQueryParams {
  type?: NotificationTypes;
}

export interface PutPartyV1ProtectUserSuspendQueryParams {
  suspensionCause?: string;
}

export interface PutPaymentV1PublicEpayrequestCancelQueryParams {
  token?: string;
}

export interface PutWalletV1PrivateUserreferralprogramDefaultQueryParams {
  /** - Format: int64 */
  userReferralProgramId?: number;
}

export interface PuzzleModelResponseVM {
  /** - Format: int32 */
  y: number;
  backgroundImage?: string;
  id?: string;
  missingPieceImage?: string;
}

export interface PuzzleSubmissionRequestVM {
  /** - Format: int32 */
  x: number;
  id?: string;
}

export interface QrCodeResponseVM {
  authenticatorKey?: string;
  qrCodeUrl?: string;
}

export type RateLimitInterval = "Second" | "Minute" | "Day";

export type RateLimitType = "REQUEST_WEIGHT" | "ORDERS" | "RAW_REQUESTS";

export interface RecentTradeResponseVM {
  /** - Format: decimal */
  baseQuantity: number;
  buyerIsMaker: boolean;
  isBestMatch: boolean;
  /** - Format: int64 */
  orderId: number;
  /** - Format: decimal */
  price: number;
  /** - Format: decimal */
  quoteQuantity: number;
  smartTradeEngine: boolean;
  /** - Format: int64 */
  tradeTime: number;
}

export type RedirectType = "None" | "Redirect" | "RedirectWithPost";

export interface RegisterRequestVM {
  couponName?: string;
  password?: string;
  phoneNumber?: string;
  /** - Format: int64 */
  referralProgramCode?: number;
}

export interface RegisterResponseVM {
  /** - Format: uuid */
  userId: string;
  token?: string;
}

export interface RemoveEmailRequestVM {
  emailOtpCode?: string;
  emailOtpToken?: string;
  mobileOtpCode?: string;
  mobileOtpToken?: string;
  totpCode?: string;
}

export interface ReportResultResponseVM {
  /** - Format: int32 */
  count: number;
  /** - Format: int32 */
  day: number;
  /** - Format: int32 */
  dayOfWeek: number;
  /** - Format: int32 */
  key: number;
  /** - Format: int32 */
  month: number;
  /** - Format: decimal */
  sum: number;
  /** - Format: int32 */
  year: number;
  dayName?: string;
  label?: string;
  monthName?: string;
  yearShort?: string;
}

export interface Response400 {
  /** - Format: int32 */
  code: number;
  errors?: ExceptionDetails[];
  message?: string;
}

export interface Response500 {
  /** - Format: int32 */
  code: number;
  errors?: ExceptionDetails[];
  message?: string;
}

export interface RevokeTokenRequestVM {
  /** - Format: uuid */
  clientId: string;
  clientSecret?: string;
  revokeTokenHint?: string;
  token?: string;
}

export interface SecurityActivityListVM {
  /** - Format: int64 */
  count: number;
  list?: SecurityActivityVM[];
}

export type SecurityActivityType =
  | "Login"
  | "ChangePassword"
  | "EnableToFA"
  | "DisableToFA"
  | "NewDevice"
  | "EnabledGoogleAuthentication"
  | "DisbaledGoogleAuthentication";

export interface SecurityActivityVM {
  activity: SecurityActivityType;
  /** - Format: date-time */
  createDate: string;
  /** - Format: int64 */
  id: number;
  status: SecurityStatus;
  /** - Format: uuid */
  userId: string;
  ipAddress?: string;
  platform?: string;
}

export type SecurityStatus = "Completed" | "Failed";

export interface SecurityUserSettingRequestVM {
  activateWhiteList?: boolean;
}

export interface SettlementExcelResponseVM {
  automaticSettlement: boolean;
  /** - Format: decimal */
  commissionAmount: number;
  /** - Format: date-time */
  createDate: string;
  /** - Format: decimal */
  requestAmount: number;
  status: SettlementRequestStatus;
  /** - Format: int64 */
  userWalletId: number;
  accountName?: string;
  accountNumber?: string;
  statusDisplay?: string;
}

export interface SettlementFilterRequestVM {
  /** - Format: date-time */
  endDate?: string;
  isAuto?: boolean;
  /** - Format: decimal */
  maximumAmount?: number;
  /** - Format: decimal */
  minimumAmount?: number;
  /** - Format: int32 */
  pageNo?: number;
  /** - Format: int32 */
  pageSize?: number;
  /** - Format: date-time */
  startDate?: string;
  states?: SettlementRequestStatus[];
  userBankIds?: number[];
  walletNumbers?: string[];
}

export interface SettlementRequestInfoListResponseVM {
  /** - Format: int64 */
  totalCount: number;
  settlementRequests?: SettlementRequestInfoResponseVM[];
}

export interface SettlementRequestInfoResponseVM {
  /** - Format: decimal */
  amount: number;
  /** - Format: decimal */
  commissionAmount: number;
  /** - Format: date-time */
  createDateUtc: string;
  /** - Format: uuid */
  creatorUserId: string;
  /** - Format: int64 */
  id: number;
  isAuto: boolean;
  /** - Format: uuid */
  ownerUserId: string;
  status: SettlementRequestStatus;
  /** - Format: int64 */
  userBankId: number;
  /** - Format: int64 */
  userWalletId: number;
  /** - Format: int32 */
  bankId?: number;
  bankLogoAddress?: string;
  bankName?: string;
  creatorUserDisplayName?: string;
  currencySymbol?: string;
  description?: string;
  userBankFirstName?: string;
  userBankLastName?: string;
  userBankName?: string;
  userBankNumber?: string;
  userBankShebaNumber?: string;
  userDisplayName?: string;
  /** - Format: int64 */
  voucherId?: number;
  walletName?: string;
  walletNumber?: string;
}

export type SettlementRequestStatus =
  | "Pending"
  | "Paid"
  | "PayCommandCreatedPendingForPay"
  | "VoucherCreatedPendingForPayCommand"
  | "Canceled";

export interface SettlementTransactionHistoryListResponseVM {
  /** - Format: int64 */
  count: number;
  list?: SettlementTransactionHistoryResponseVM[];
}

export interface SettlementTransactionHistoryResponseVM {
  /** - Format: date-time */
  createDate: string;
  /** - Format: int64 */
  id: number;
  status: TransactionHistoryStatus;
  /** - Format: decimal */
  transactionFee: number;
  /** - Format: uuid */
  userId: string;
  walletType: UserWalletType;
  currencySymbol?: string;
  description?: string;
  moneyNetworkSymbol?: string;
  transferAmount?: string;
  transferType?: TransferType;
  userWalletAccountNumber?: string;
}

export type SubUserPermissionType =
  | "Default"
  | "CanReceiveMoney"
  | "CanSeeEpayRequests"
  | "CanTransferMoney"
  | "CanSeeTransactions"
  | "CanRequestSettlement"
  | "CanChargeAccount"
  | "CanSeeSettlementRequests"
  | "CanGroupTransferMoney"
  | "CanAssistantsCreatesEpayRequest";

export interface SubuserAccessRequestVM {
  /** - Format: int64 */
  connectionId: number;
  walletNumber?: string;
}

export type SymbolFilterType =
  | "UNKNOWN"
  | "PRICE_FILTER"
  | "PERCENT_PRICE"
  | "LOT_SIZE"
  | "MARKET_LOT_SIZE"
  | "MIN_NOTIONAL"
  | "MAX_NUM_ORDERS"
  | "MAX_NUM_ALGO_ORDERS"
  | "ICEBERG_PARTS"
  | "MAX_POSITION";

export interface SymbolRateResponseVM {
  /** - Format: decimal */
  cryptoRate: number;
  /** - Format: decimal */
  fiatRate: number;
  cryptoSymbol?: string;
  fiatSymbol?: string;
}

export type SymbolStatus =
  | "PRE_TRADING"
  | "PENDING_TRADING"
  | "TRADING"
  | "POST_TRADING"
  | "END_OF_DAY"
  | "HALT"
  | "AUCTION_MATCH"
  | "BREAK"
  | "CLOSE"
  | "PRE_DELIVERING"
  | "DELIVERING"
  | "PRE_SETTLE"
  | "SETTLING";

export interface TodayTotalWithdrawResponseVM {
  /** - Format: decimal */
  maxDailyWithdraw: number;
  /** - Format: decimal */
  todayWithdraw: number;
  symbol?: string;
}

export interface TokenResponseVM {
  /** - Format: int32 */
  expiresIn: number;
  accessToken?: string;
  errorDescription?: string;
  identityToken?: string;
  refreshToken?: string;
  tokenType?: string;
}

export interface TotalTradeQuantityResponseVM {
  /** - Format: decimal */
  oneDayQuantity: number;
  /** - Format: decimal */
  sevenDayQuantity: number;
  /** - Format: decimal */
  thirtyDayQuantity: number;
}

export interface TradeIncomeHistoryListResponseVM {
  /** - Format: int64 */
  count: number;
  list?: TradeIncomeHistoryResponseVM[];
}

export interface TradeIncomeHistoryResponseVM {
  /** - Format: int32 */
  commissionCurrencyId: number;
  /** - Format: date-time */
  createDate: string;
  /** - Format: int32 */
  domainId: number;
  /** - Format: int64 */
  id: number;
  /** - Format: decimal */
  income: number;
  /** - Format: int64 */
  orderId: number;
  /** - Format: uuid */
  orderUserId: string;
  /** - Format: int64 */
  referralProgramId: number;
  /** - Format: date-time */
  transactionDate: string;
  /** - Format: uuid */
  userId: string;
  account?: string;
  commissionCurrencySymbol?: string;
}

export interface TradeIncomeInviteeRankingResponseVM {
  /** - Format: decimal */
  amount: number;
  currencySymbol?: string;
  userName?: string;
}

export interface TradeReferralHistoryListResponseVM {
  /** - Format: int64 */
  count: number;
  list?: TradeReferralHistoryResponseVM[];
}

export interface TradeReferralHistoryResponseVM {
  /** - Format: decimal */
  defaultCryptoAmount: number;
  /** - Format: decimal */
  defaultFiatAmount: number;
  /** - Format: int64 */
  referralProgramId: number;
  /** - Format: date-time */
  signedUpAt: string;
  traded: boolean;
  account?: string;
  symbol?: string;
}

export interface TradeResponseVM {
  /** - Format: decimal */
  commission: number;
  /** - Format: decimal */
  earnQuantity: number;
  /** - Format: int64 */
  orderId: number;
  /** - Format: decimal */
  price: number;
  /** - Format: decimal */
  quantity: number;
  /** - Format: decimal */
  quoteQuantity: number;
  side: AppOrderSide;
  /** - Format: date-time */
  tradeDate: string;
  commissionCurrencySymbol?: string;
  symbol?: string;
}

export interface TradeResposneListVM {
  /** - Format: int64 */
  count: number;
  list?: TradeResponseVM[];
}

export interface TransactionHistoryDetailResponseVM {
  /** - Format: date-time */
  createDate: string;
  /** - Format: decimal */
  requestAmount: number;
  status: TransactionHistoryStatus;
  currencySymbol?: string;
  destinationBlockchainAddress?: string;
  /** - Format: date-time */
  doneDate?: string;
  /** - Format: date-time */
  processDate?: string;
}

export type TransactionHistoryStatus =
  | "Pending"
  | "Processing"
  | "Completed"
  | "Failed"
  | "Canceled";

export type TransactionHistoryType =
  | "Withdraw"
  | "Deposit"
  | "Settlement"
  | "POS"
  | "PaymentWithIdentifier";

export interface TransferMoneyRequestVM {
  /** - Format: decimal */
  amount: number;
  description?: string;
  targetIdentifier?: string;
  targetWalletNumber?: string;
  walletNumber?: string;
}

export interface TransferMoneyResponseVM {
  /** - Format: int64 */
  internalDepositId: number;
  /** - Format: int64 */
  internalWithdrawId: number;
  /** - Format: int64 */
  voucherId: number;
}

export type TransferType = "Offchain" | "Onchain";

export interface UpdateEpayRequestAssignedUserRequestVM {
  /** - Format: uuid */
  assignedToUserId: string;
  token?: string;
}

export interface UpdateEpayRequestCustomDataRequestVM {
  customDatas?: EpayRequestCustomDataRequestVM[];
  token?: string;
}

export interface UpdateFavoriteMarketRequestVM {
  marketType: MarketType;
  marketSymbol?: string;
}

export interface UpdateUserWalletRequestVM {
  automaticSettlement?: boolean;
  getComissionFromPayer?: boolean;
  isActive?: boolean;
  name?: string;
  notificationEnabled?: boolean;
  /** - Format: int32 */
  userBankId?: number;
  walletNumber?: string;
}

export interface UserAssetResponseVM {
  /** - Format: decimal */
  availableRemain: number;
  /** - Format: decimal */
  inUseRemain: number;
  /** - Format: decimal */
  totalRemain: number;
  symbol?: string;
  walletName?: string;
  walletNumber?: string;
}

export interface UserBankResponseVM {
  bankAccountStatus: IdentityStatus;
  /** - Format: date-time */
  createDate: string;
  /** - Format: int64 */
  id: number;
  isVisible: boolean;
  userBankIdentityType: BusinessShareType;
  /** - Format: uuid */
  userId: string;
  accountNo?: string;
  /** - Format: int32 */
  bankId?: number;
  cardNumber?: string;
  destinationIbanPayID?: string;
  firstName?: string;
  /** - Format: date-time */
  lastChangeStatusDate?: string;
  lastName?: string;
  name?: string;
  nationalCode?: string;
  payID?: string;
  rejectCauseDescription?: string;
  shebaNo?: string;
}

export interface UserBasicInfoRequestVM {
  /** - Format: uuid */
  userId: string;
  basicInfoToken?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
}

export interface UserCurrencyResponseVM {
  /** - Format: decimal */
  availableRemain: number;
  canBuy: boolean;
  canCharge: boolean;
  canDeposit: boolean;
  canSettlement: boolean;
  canTrade: boolean;
  canWithdraw: boolean;
  /** - Format: int32 */
  decimalDigits: number;
  enabled: boolean;
  /** - Format: decimal */
  inUseRemain: number;
  /** - Format: decimal */
  totalRemain: number;
  type: CurrencyType;
  logoAddress?: string;
  name?: string;
  specialTips?: string;
  symbol?: string;
  userMoneyNetworks?: UserMoneyNetworkResponseVM[];
}

export interface UserDepositAddressRequestVM {
  currencySymbol?: string;
  moneyNetworkSymbol?: string;
}

export interface UserDepositAddressResponseVM {
  address?: string;
  tag?: string;
}

export interface UserExistResponseVM {
  twoFactorEnabled: boolean;
}

export interface UserIdentificationLevelOneRequestVM {
  /** - Format: date-time */
  birthDate: string;
  hasIdentityChanges: boolean;
  birthCertificateDescriptionFile?: DocumentFileRequestVM;
  firstName?: string;
  lastName?: string;
  nationalCardFile?: DocumentFileRequestVM;
  nationalCode?: string;
  userBankAdd?: CreateUserBankRequestVM;
}

export interface UserIdentificationLevelThreeRequestVM {
  file?: DocumentFileRequestVM;
}

export interface UserIdentificationLevelTwoRequestVM {
  /** - Format: int32 */
  cityId: number;
  /** - Format: int32 */
  countryId: number;
  /** - Format: int32 */
  provinceId: number;
  address?: string;
  authenticationSelfieFile?: DocumentFileRequestVM;
  phoneNumber?: string;
  phoneOtpCode?: string;
  phoneOtpToken?: string;
  postalCode?: string;
}

export type UserIdentifierType =
  | "Default"
  | "PhoneNumber"
  | "Email"
  | "CustomerNumber"
  | "AccountNumber";

export interface UserInfoVM {
  canAddUserBank: boolean;
  currentLevel: IdentificationLevel;
  /** - Format: int64 */
  customerNumber: number;
  /** - Format: int32 */
  domainId: number;
  hasPendingRequest: boolean;
  /** - Format: uuid */
  id: string;
  identityStatus: IdentityStatus;
  isBusinessUser: boolean;
  userStatus: UserStatus;
  userType: UserType;
  withdrawLimit: boolean;
  /** - Format: date-time */
  birthDate?: string;
  displayName?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  nationalCode?: string;
  nextLevel?: IdentificationLevel;
  nextLevelStatus?: IdentificationLevelRequestStatus;
  pendingRequestDescription?: string;
  phoneNumber?: string;
  /** - Format: uuid */
  profileImageFileUniqueId?: string;
  userName?: string;
  /** - Format: date-time */
  withdrawLimitEnd?: string;
}

export interface UserLoginHistoryDetailsVM {
  /** - Format: int64 */
  customerId: number;
  email?: string;
  ip?: string;
  /** - Format: date-time */
  lastLoginDateTime?: string;
  phoneNumber?: string;
}

export interface UserLoginHistoryListVM {
  /** - Format: int64 */
  count: number;
  list?: UserLoginHistoryVM[];
}

export interface UserLoginHistoryVM {
  /** - Format: int64 */
  id: number;
  /** - Format: date-time */
  loginDateTime: string;
  status: LoginStatus;
  browserName?: string;
  deviceId?: string;
  failedDescription?: IdentityFailedStatusCodes;
  ip?: string;
  location?: string;
  platform?: string;
  userName?: string;
}

export interface UserMinimalResponseVM {
  /** - Format: int64 */
  connectionId: number;
  /** - Format: uuid */
  userId: string;
  displayName?: string;
  phoneNumber?: string;
  positionTitle?: string;
  /** - Format: uuid */
  profileImageFileUniqueId?: string;
}

export interface UserMoneyNetworkResponseVM {
  /** - Format: int32 */
  decimalDigits: number;
  depositEnabled: boolean;
  /** - Format: int32 */
  estimatedArrivalTime: number;
  isDefault: boolean;
  isTag: boolean;
  /** - Format: decimal */
  maximumWithdraw: number;
  /** - Format: int32 */
  minConfirmations: number;
  /** - Format: decimal */
  minDeposit: number;
  /** - Format: decimal */
  minimumWithdraw: number;
  settlementEnabled: boolean;
  /** - Format: int32 */
  unlockConfirm: number;
  withdrawEnabled: boolean;
  /** - Format: decimal */
  withdrawFee: number;
  addressRegex?: string;
  addressUrl?: string;
  contractAddress?: string;
  contractType?: string;
  depositDescription?: string;
  /** - Format: decimal */
  maxDeposit?: number;
  memoRegex?: string;
  name?: string;
  specialTips?: string;
  symbol?: string;
  txUrl?: string;
  withdrawDescription?: string;
}

export interface UserPluginResponseVM {
  /** - Format: int32 */
  id: number;
  isActive: boolean;
  amountCalculationExpression?: string;
  config?: string;
  key?: string;
  /** - Format: uuid */
  logoFileUniqueId?: string;
  name?: string;
  properties?: PluginPropertyResponseVM[];
}

export interface UserPluginTogggleRequestVM {
  isActive: boolean;
  config?: string;
  pluginKey?: string;
}

export interface UserReferralProgramAddVM {
  /** - Format: decimal */
  inviteePercent: number;
  isDefault: boolean;
  /** - Format: decimal */
  referralPercent: number;
  description?: string;
  name?: string;
}

export interface UserReferralProgramVM {
  /** - Format: int32 */
  friendsCount: number;
  /** - Format: int64 */
  id: number;
  /** - Format: decimal */
  inviteePercent: number;
  isDefault: boolean;
  /** - Format: decimal */
  referralPercent: number;
  /** - Format: uuid */
  userId: string;
  description?: string;
  name?: string;
}

export interface UserSettingPreferenseResponseVM {
  activities: boolean;
  autoBorrowRepayForMargin: boolean;
  limitOrder: boolean;
  marketOrder: boolean;
  stopLimitOrder: boolean;
  systemMessages: boolean;
  tradeNotification: boolean;
}

export interface UserSettingSecurityResponseVM {
  activateWhiteList: boolean;
}

export type UserStatus =
  | "None"
  | "NotVerified"
  | "VerifiedButNotCompleted"
  | "Active"
  | "TemporaryBlocked"
  | "AutoPasswordGenerated";

export interface UserStatusResponseVM {
  emailConfirmed: boolean;
  phoneNumberConfirmed: boolean;
  twoFactorEnabled: boolean;
  email?: string;
}

export interface UserTotalReferralProgramVM {
  /** - Format: decimal */
  defaultCryptoAmount: number;
  /** - Format: decimal */
  defaultFiatAmount: number;
  /** - Format: int32 */
  friendsCount: number;
}

export interface UserTraderLevelFeeResponseVM {
  /** - Format: int32 */
  domainTraderLevelId: number;
  /** - Format: int64 */
  lastUpdate: number;
  /** - Format: int32 */
  levelIndex: number;
  /** - Format: decimal */
  makerFeePercent: number;
  /** - Format: decimal */
  takerFeePercent: number;
  /** - Format: uuid */
  userId: string;
  name?: string;
  symbol?: string;
}

export interface UserTraderLevelResponseVM {
  /** - Format: decimal */
  cryptoMakerFeePercent: number;
  /** - Format: decimal */
  cryptoTakerFeePercent: number;
  /** - Format: decimal */
  fiatMakerFeePercent: number;
  /** - Format: decimal */
  fiatTakerFeePercent: number;
  /** - Format: int32 */
  levelIndex: number;
  name?: string;
}

export interface UserTrustedDeviceListResponseVM {
  /** - Format: int64 */
  count: number;
  list?: UserTrustedDeviceResponseVM[];
}

export interface UserTrustedDeviceResponseVM {
  /** - Format: int64 */
  id: number;
  /** - Format: uuid */
  userId: string;
  /** - Format: date-time */
  createDate?: string;
  deviceId?: string;
  hardwareType?: string;
  ipAddress?: string;
  osName?: string;
  osVersion?: string;
  softwareName?: string;
  userAgent?: string;
}

export type UserType = "Person" | "Organization";

export interface UserWalletDisplayDetailResponseVM {
  accountStatus: AccountStatus;
  automaticSettlement: boolean;
  getComissionFromPayer: boolean;
  isActive: boolean;
  notificationEnabled: boolean;
  /** - Format: int32 */
  permittedSubuserCount: number;
  userWalletType: UserWalletType;
  actionPolicies?: CommissionPolicyResponseVM[];
  intermediatePayUserBankAccountNumber?: string;
  /** - Format: int64 */
  intermediatePayUserBankId?: number;
  intermediatePayUserBankName?: string;
  intermediatePayUserBankShebaNumber?: string;
  walletName?: string;
  walletNumber?: string;
}

export interface UserWalletDisplayResponseVM {
  accountStatus: AccountStatus;
  automaticSettlement: boolean;
  /** - Format: decimal */
  availableRemain: number;
  getComissionFromPayer: boolean;
  /** - Format: decimal */
  inUseRemain: number;
  isActive: boolean;
  /** - Format: int32 */
  relatedUserWalletIndex: number;
  /** - Format: decimal */
  totalRemain: number;
  userWalletType: UserWalletType;
  intermediatePayUserBankAccountNumber?: string;
  /** - Format: int64 */
  intermediatePayUserBankId?: number;
  intermediatePayUserBankName?: string;
  intermediatePayUserBankShebaNumber?: string;
  name?: string;
  number?: string;
  symbol?: string;
}

export interface UserWalletInfoResponseVM {
  displayName?: string;
  userName?: string;
  userWalletNumber?: string;
}

export interface UserWalletResponseVM {
  accountStatus: AccountStatus;
  /** - Format: int32 */
  currencyId: number;
  getComissionFromPayer: boolean;
  isActive: boolean;
  /** - Format: int32 */
  scanCount: number;
  userNotificationEnabled: boolean;
  automaticSettlement?: boolean;
  /** - Format: int64 */
  directPayUserBankId?: number;
  /** - Format: int64 */
  intermediatePayUserBankId?: number;
  name?: string;
  /** - Format: int32 */
  relatedUserWalletIndex?: number;
  userWalletType?: UserWalletType;
  walletNumber?: string;
}

export type UserWalletType = "Spot" | "InstantCredit";

export interface VerifySecureRequestVM {
  otpCode?: string;
  otpToken?: string;
  phoneNumber?: string;
  totpCode?: string;
}

export interface VerifyUserPhoneNumberRequestVM {
  /** - Format: uuid */
  userId: string;
  token?: string;
  verifyCode?: string;
}

export interface WalletDepositAddressRequestVM {
  moneyNetworkSymbol?: string;
  walletNumber?: string;
}

export type WithdrawRequestStatus =
  | "Pending"
  | "Processing"
  | "WithdrawCompletedWaitingForDeposit"
  | "Completed"
  | "Failed"
  | "Canceled";

export interface WithdrawRequestUserWalletCreateRequestVM {
  /** - Format: decimal */
  amount: number;
  address?: string;
  currencySymbol?: string;
  moneyNetworkSymbol?: string;
  tagId?: string;
}

export interface WithdrawTransactionHistoryListResponseVM {
  /** - Format: int64 */
  count: number;
  list?: WithdrawTransactionHistoryResponseVM[];
}

export interface WithdrawTransactionHistoryResponseVM {
  /** - Format: date-time */
  createDate: string;
  /** - Format: int64 */
  id: number;
  status: TransactionHistoryStatus;
  /** - Format: uuid */
  userId: string;
  walletType: UserWalletType;
  address?: string;
  addressTag?: string;
  currencySymbol?: string;
  moneyNetworkSymbol?: string;
  transactionFee?: string;
  transferAmount?: string;
  transferType?: TransferType;
  txId?: string;
}
