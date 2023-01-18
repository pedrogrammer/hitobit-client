import { HubConnectionState } from "@microsoft/signalr";
import hermes from "hermes-channel";
import { useEffect } from "react";
import { useAuth } from "react-oidc-js";
import { postAuthV1PrivateAuthGeneratewebsocketusertoken } from "../../services";
import { setSignalRToken, StoreAuthentication } from "../../store";
import { SignalREvents, UserSignalRContext } from "./signalRContext";
import { REFRESH_SIGNAL_MS } from "./utils";

const useSubscribe = () => {
  const { userData } = useAuth();
  const dispatch = StoreAuthentication.useDispatch();
  const { signalRToken } = StoreAuthentication.useState();

  useEffect(() => {
    if (!userData?.access_token) return;
    const aborter = new AbortController();

    const refetchSignal = async () => {
      const data = await postAuthV1PrivateAuthGeneratewebsocketusertoken({
        signal: aborter.signal,
      });

      const response = (await UserSignalRContext.connection?.invoke(
        SignalREvents.SUBSCRIBE,
        [data],
      )) as unknown as { ValidEvents: string[]; InvalidEvents: string[] };

      if (response?.ValidEvents && data) {
        const { token } = StoreAuthentication.state.signalRToken || {};

        if (token) {
          UserSignalRContext.connection?.invoke(SignalREvents.UNSUBSCRIBE, [
            token,
          ]);
        }

        dispatch(setSignalRToken(data));
        setTimeout(() => {
          refetchSignal();
        }, REFRESH_SIGNAL_MS);
      }
    };

    const timer = setInterval(async () => {
      if (
        UserSignalRContext.connection?.state !== HubConnectionState.Connected
      ) {
        aborter.abort("socket disconnected!");
        return;
      }
      clearInterval(timer);
      const { date, token } = StoreAuthentication.state.signalRToken || {};

      let duration = date ? Date.now() - Number(date) : 0;

      duration = duration > REFRESH_SIGNAL_MS ? 0 : duration;
      try {
        if (token) {
          UserSignalRContext.connection
            ?.invoke(SignalREvents.SUBSCRIBE, [token])
            .catch((e) => console.log(e));
        }
      } catch (e) {
        console.log(e);
      }

      setTimeout(() => {
        refetchSignal();
      }, duration);
    }, 1000);

    return () => {
      aborter.abort("component unmounted!");
      clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  UserSignalRContext.useSignalREffect(
    String(signalRToken?.token),
    (data: { e: string }) => {
      hermes.send("userEvent_" + data.e, data, "current");
    },
    [signalRToken],
  );

  return null;
};

export { useSubscribe };
