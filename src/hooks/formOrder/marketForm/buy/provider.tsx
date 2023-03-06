import { useSelectOptions } from "../../useSelectOptions";
import { BuyForm } from "../types";

const Provider = ({ children }: { children: any }) => {
  const { options } = useSelectOptions();

  return (
    <BuyForm.Provider
      defaultValues={{
        selectedOption: options[1],
      }}
    >
      {children}
    </BuyForm.Provider>
  );
};

export { Provider };
