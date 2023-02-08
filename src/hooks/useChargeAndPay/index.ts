import { useMutation } from "@tanstack/react-query";
import { postPaymentV1PrivateEpayrequestPostactioninternaldepositepayrequest } from "../../services";
import { useCharge } from "../useCharge";

/**
 * @example
 *   const { chargeAndPay, isLoadingCharge, chargeError } = useChargeAndPay();
 *
 *   if (isInSufficientBalance) {
 *     chargeAndPay({
 *       chargeAmount: data?.amount,
 *       clientUniqueId: data?.clientUniqueId as string,
 *       walletNumber: selectedWallet.number!,
 *     });
 *   }
 */
const useChargeAndPay = ({
  getAfterPayRedirectUri,
  redirectToPayLink,
}: {
  getAfterPayRedirectUri: (clientUniqueId: string) => string;
  redirectToPayLink: (paymentLink: string) => string;
}) => {
  const {
    charge,
    errorAmount: chargeError,
    isLoading: isChargeLoading,
  } = useCharge({
    onSuccess(data) {
      data.paymentLink && redirectToPayLink(data.paymentLink);
    },
  });

  const {
    mutate: chargeAndPay,
    isLoading,
    error,
  } = useMutation(
    async ({
      chargeAmount,
      walletNumber,
      clientUniqueId,
    }: {
      chargeAmount: number;
      walletNumber: string;
      clientUniqueId: string;
    }) => {
      const { postActionUniqueId } =
        await postPaymentV1PrivateEpayrequestPostactioninternaldepositepayrequest(
          {
            postActionStatus: "Initiate",
            postActionNature: "EPayRequest",
            ePayRequestClientUniqueId: clientUniqueId,
          },
        );

      charge(chargeAmount, {
        postActionUniqueId,
        userWalletNumber: walletNumber,
        redirectUrl: getAfterPayRedirectUri(clientUniqueId),
        clientUniqueId,
      });
    },
  );

  return {
    chargeAndPay,
    isLoadingCharge: isChargeLoading || isLoading,
    chargeError: error || chargeError,
  };
};

export { useChargeAndPay };
