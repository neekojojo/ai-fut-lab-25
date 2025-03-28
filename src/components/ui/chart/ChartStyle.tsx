
import * as React from "react";
import { ChartConfig, THEMES } from "./types";

export function ChartStyle({
  id,
  config,
  ...props
}: {
  id: string;
  config: ChartConfig;
} & React.HTMLAttributes<HTMLStyleElement>) {
  // Generate dynamic CSS from the chart config
  const css = React.useMemo(() => {
    const cssRules: string[] = [];

    Object.entries(config).forEach(([key, value]) => {
      if (value?.theme) {
        const { light, dark } = value.theme;
        cssRules.push(`
          [data-chart="${id}"] [data-key="${key}"] {
            color: ${light};
            stroke: ${light};
            fill: ${light};
          }
          .dark [data-chart="${id}"] [data-key="${key}"] {
            color: ${dark};
            stroke: ${dark};
            fill: ${dark};
          }
        `);
      }
    });

    return cssRules.join("\n");
  }, [id, config]);

  if (!css) {
    return null;
  }

  return <style {...props} dangerouslySetInnerHTML={{ __html: css }} />;
}
