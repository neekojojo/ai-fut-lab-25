
import * as React from "react";
import { ChartConfig, ChartContextProps } from "./types";

const ChartContext = React.createContext<ChartContextProps>({
  config: {},
});

interface ChartProviderProps {
  value: ChartConfig;
  children: React.ReactNode;
}

export function ChartProvider({ value, children }: ChartProviderProps) {
  return (
    <ChartContext.Provider value={{ config: value }}>
      {children}
    </ChartContext.Provider>
  );
}

export const useChart = () => {
  return React.useContext(ChartContext);
};
