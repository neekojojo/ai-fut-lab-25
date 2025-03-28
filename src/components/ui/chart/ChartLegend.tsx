
import * as React from "react";
import * as RechartsPrimitive from "recharts";
import { cn } from "@/lib/utils";
import { useChart } from "./ChartContext";
import { getPayloadConfigFromPayload } from "./types";

export const ChartLegend = RechartsPrimitive.Legend;

export const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof RechartsPrimitive.Legend> & {
    className?: string;
    itemClassName?: string;
    orientation?: "horizontal" | "vertical";
  }
>(
  (
    { className, itemClassName, payload, orientation = "horizontal", ...props },
    ref
  ) => {
    const { config } = useChart();

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-wrap items-center gap-4 text-xs",
          orientation === "vertical" && "flex-col items-start",
          className
        )}
        {...props}
      >
        {payload?.map((entry, index) => {
          const key = entry.dataKey || entry.value || "";
          const itemConfig = getPayloadConfigFromPayload(config, entry, key);
          const iconColor = entry.color || "#888888";

          return (
            <div
              key={`item-${index}`}
              className={cn(
                "flex items-center gap-1.5 overflow-hidden",
                itemClassName
              )}
            >
              {itemConfig?.icon ? (
                <itemConfig.icon
                  className="h-3 w-3"
                  style={{ color: iconColor }}
                />
              ) : (
                <div
                  className="h-3 w-3 rounded-[2px]"
                  style={{ backgroundColor: iconColor }}
                />
              )}
              <span className="truncate text-muted-foreground">
                {itemConfig?.label || entry.value}
              </span>
            </div>
          );
        })}
      </div>
    );
  }
);

ChartLegendContent.displayName = "ChartLegendContent";
