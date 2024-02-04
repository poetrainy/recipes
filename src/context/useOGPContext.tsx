import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useLayoutEffect,
  useState,
} from "react";
import { OGPType } from "~/types/OGP";

// eslint-disable-next-line react-refresh/only-export-components
const getterContext = createContext<OGPType | undefined>(undefined);
const setterContext = createContext<
  React.Dispatch<React.SetStateAction<OGPType | undefined>>
>(() => void 0);

// eslint-disable-next-line react-refresh/only-export-components
export const useOGPContext = () => {
  return useContext(getterContext);
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSetOGPContext = (context: OGPType) => {
  const setter = useContext(setterContext);

  useLayoutEffect(() => {
    setter((prev) =>
      JSON.stringify(prev) !== JSON.stringify(context) ? context : prev
    );
  });
};

export const OGPProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [context, setContext] = useState<OGPType | undefined>();

  return (
    <getterContext.Provider value={context}>
      <setterContext.Provider value={setContext}>
        {children}
      </setterContext.Provider>
    </getterContext.Provider>
  );
};
