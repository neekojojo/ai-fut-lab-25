
import * as React from "react";
import { ChartConfig } from "./types";

export interface ChartContextProps {
  config: ChartConfig;
}

export const ChartContext = React.createContext<ChartContextProps>({
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
