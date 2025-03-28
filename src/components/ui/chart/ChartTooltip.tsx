
import * as React from "react";
import * as RechartsPrimitive from "recharts";
import { cn } from "@/lib/utils";
import { useChart } from "./ChartContext";
import { getPayloadConfigFromPayload } from "./types";

export const ChartTooltip = RechartsPrimitive.Tooltip;

export interface ChartTooltipContentProps extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean;
  payload?: Array<{
    dataKey?: string;
    name?: string;
    value?: any;
    color?: string;
  }>;
  label?: string;
}

export const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  ChartTooltipContentProps
>(({ className, active, payload, label, ...props }, ref) => {
  const { config } = useChart();

  if (!active || !payload?.length) {
    return null;
  }

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-lg border bg-background p-2 shadow-md",
        className
      )}
      {...props}
    >
      <div className="grid gap-2">
        <div className="grid gap-1">
          {label && <div className="text-sm font-medium">{label}</div>}
          <div className="grid gap-1">
            {payload.map((item, index) => {
              const dataKey = item.dataKey || "";
              const name = item.name || dataKey;
              const itemConfig = getPayloadConfigFromPayload(config, item, dataKey);
              const iconColor = item.color || "#888888";

              return (
                <div
                  key={`item-${index}`}
                  className="flex items-center gap-1 text-xs"
                >
                  {itemConfig?.icon ? (
                    <itemConfig.icon
                      className="h-3 w-3"
                      style={{ color: iconColor }}
                    />
                  ) : (
                    <div
                      className="h-2 w-2 rounded-[2px]"
                      style={{ backgroundColor: iconColor }}
                    />
                  )}
                  <div>
                    <span className="mr-1 font-medium">{name}:</span>
                    <span className="text-muted-foreground">
                      {item.value}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
});

ChartTooltipContent.displayName = "ChartTooltipContent";
