import hermes from "hermes-channel";
import { useEffect } from "react";
import { useEvent } from "reactjs-view-core";
import {
  AppOrderSide,
  AppOrderStatus,
  AppOrderType,
  AppTimeInForce,
  EpayRequestActualState,
  EpayRequestGatewayType,
  EpayRequestType,
  NotificationLevel,
  NotificationTypes,
} from "../../services";

type EpayEventModel = {
  id: number;
  ownerUserId?: string;
  payerUserId?: string;
  ownerDisplayName?: string;
  payerDisplayName?: string;
  epayRequestGatewayType: EpayRequestGatewayType;
  status: EpayRequestActualState;
  epayRequestType: EpayRequestType;
  payDate?: string;
  createDate: string;
  amount: number;
  currencySymbol: string;
  referenceNumber: null | string;
  cardNumber?: null | string;
  description: string;
  voucherId: null | number;
  getComissionFromPayer: boolean;
  commissionAmount: number;
  assignedToUserId?: string;
  expireDate: string;
  token: string;
  clientUniqueId?: string;
  payTos: null | { userName: string; userWalletNumber: string }[];
  audiences: [];
  epayRequestCustomDataInfos: any[];
  PluginKey: string;
  AssignedUserDisplayName?: string;
  PayViaOtherCurrency: boolean;
  PayerCurrencySymbol?: string;
  e: "epayRequestChangeStatus";
  E: number;
  requestedAmount: number;
};

export interface OutboundAccountPositionModel {
  e: "outboundAccountPosition"; //Event type
  E: number; //Event Time
  u: number; //Time of last account update
  B: [
    //Balances Array
    {
      w: string; //Wallet number
      a: string; //Asset
      f: string; //Free
      l: string; //Locked
    },
  ];
}

export interface BalanceUpdateModel {
  e: "balanceUpdate"; //Event Type
  E: number; //Event Time
  a: string; //Asset
  d: string; //Balance Delta
  T: number; //Clear Time
  w: string; //Wallet number
}

export interface ExecutionReportUpdateModel {
  e: "executionReport"; // Event type
  s: string; // Symbol
  S: AppOrderSide; // Side, 1 for Buy; 2 for Sell
  o: AppOrderType; // Order type, 2 for LIMIT (only)
  f: AppTimeInForce; // Time in force,  1 for Good Till Expire (GTE); 3 for Immediate Or Cancel (IOC)
  q: string; // Order quantity
  p: string; // Order price
  x: "NEW"; // Current execution type
  X: AppOrderStatus; // Current order status, possible values Ack, Canceled, Expired, IocNoFill, PartialFill, FullyFill, FailedBlocking, FailedMatching, Unknown
  i: number; // Order ID
  l: string; // Last executed quantity
  z: string; // Cumulative filled quantity
  L: string; // Last executed price
  n: string; // Commission amount for all user trades within a given block. Fees will be displayed with each order but will be charged once.
  // Fee can be composed of a single symbol, ex:   // or multiple symbols if the available "BNB" balance is not enough to cover the whole fees, ex: 0000000BNB;0.00001000BTC;0.00050000ETH"
  T: number; // Transaction time
  t: number; // Trade ID
  O: number; // Order creation time

  c: string; // Client order ID
  P: string; // Stop price
  F: string; // Iceberg quantity
  g: number; // OrderListId
  C: string; // Original client order ID; This is the ID of the order being canceled
  r: "NONE"; // Order reject reason; will be an error code.
  N: null; // Commission asset
  I: number; // Ignore
  w: boolean; // Is the order on the book?
  m: boolean; // Is this trade the maker side?
  M: boolean; // Ignore
  Z: string; // Cumulative quote asset transacted quantity
  Y: string; // Last quote asset transacted quantity (i.e. lastPrice * lastQty)
  Q: string; // Quote Order Qty
}

export interface NotificationModel {
  e: "notification";
  E: number;
  id: number;
  userId: string;
  createDate: string;
  level: NotificationLevel;
  message: string;
  read: boolean;
  readDate: string;
  type: NotificationTypes;
  subject: string;
}

export enum Status {
  clear = 1,
  read = 2,
}
export interface NotificationStatusChangeModel {
  e: "notificationStatusChange";
  E: number;
  ids: number[];
  userId: string;
  status: Status;
}

type EventsData = {
  epayRequestChangeStatus: EpayEventModel;
  outboundAccountPosition: OutboundAccountPositionModel;
  balanceUpdate: BalanceUpdateModel;
  executionReport: ExecutionReportUpdateModel;
  notification: NotificationModel;
  notificationStatusChange: NotificationStatusChangeModel;
};

const useUserSignalREvent = <T extends keyof EventsData>(
  event: T,
  callback: (args: EventsData[T]) => void,
) => {
  const perCallback = useEvent(callback);

  useEffect(() => {
    hermes.on("userEvent_" + event, perCallback);

    return () => hermes.off("userEvent_" + event, perCallback);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [perCallback]);
};

export { useUserSignalREvent };
