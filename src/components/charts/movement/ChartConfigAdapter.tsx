
import React from "react";
import { ChartConfigType } from "./types";
import { ChartConfig } from "@/components/ui/chart/types";

interface ChartConfigAdapterProps {
  config: ChartConfigType;
  children: React.ReactNode;
}

// This component adapts our ChartConfigType to the UI library's ChartConfig
const ChartConfigAdapter: React.FC<ChartConfigAdapterProps> = ({
  config,
  children,
}) => {
  // Convert our config to the expected format
  const adaptedConfig: ChartConfig = Object.entries(config).reduce((acc, [key, value]) => {
    acc[key] = {
      color: value.color,
      label: value.label,
      // Only include other properties if they exist
      ...(value.icon && { icon: value.icon }),
      ...(value.curve && { curve: value.curve }),
      ...(value.theme && { theme: value.theme }),
    };
    return acc;
  }, {} as Record<string, any>);

  // Return the children with the adapted config
  return (
    <>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { config: adaptedConfig });
        }
        return child;
      })}
    </>
  );
};

export default ChartConfigAdapter;
