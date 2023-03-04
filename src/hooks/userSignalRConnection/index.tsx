import { MessageHeaders } from "@microsoft/signalr";
import { ReactNode } from "react";
import { useAuth } from "react-oidc-js";
import { URLManager } from "../../modules";
import { handleAccessTokenExpired, RequestError } from "../../services";
import { UserSignalRContext } from "./signalRContext";
import { useSubscribe } from "./subscribe";
import { useEPayUpdater } from "./useEPayUpdater";
import { useUpdateUserAssetWithSignalr } from "./userAsset";
import { useUpdateUserNotificationWithSignalr } from "./userNotifications";
import { useUpdateOrderWithSignalr } from "./userOrder";
import { useUpdateUserWalletWithSignalr } from "./userWallet";
import { useUserSignalREvent } from "./useUserSignalREvent";

const UserSignalRConnectionProvider = ({
  children,
  dependencies,
  headers,
}: {
  children: ReactNode;
  dependencies?: any[];
  headers?: MessageHeaders;
}): any => {
  const { userData } = useAuth();

  return (
    <UserSignalRContext.Provider
      connectEnabled={!!userData?.access_token && typeof window !== "undefined"}
      onError={async (error?: Error | RequestError) => {
        if (RequestError.isApiException(error)) {
          if (error?.status === 401) {
            await handleAccessTokenExpired();
          }
        }
      }}
      headers={headers}
      dependencies={[
        userData,
        URLManager.signalRBaseUrl,
        ...(dependencies || []),
      ]}
      url={URLManager.signalRBaseUrl}
    >
      <>
        <ConnectToSignalRListeners />
        {children}
      </>
    </UserSignalRContext.Provider>
  );
};

const ConnectToSignalRListeners = () => {
  useSubscribe();

  useUpdateUserAssetWithSignalr();

  useUpdateUserWalletWithSignalr();

  useUpdateOrderWithSignalr();

  useUpdateUserNotificationWithSignalr();

  URLManager.getDomainName() === "poolkhord" && useEPayUpdater();

  return null;
};

export { UserSignalRConnectionProvider, useUserSignalREvent };
