
import * as React from "react";
import * as RechartsPrimitive from "recharts";
import { cn } from "@/lib/utils";
import { ChartContext, ChartProvider } from "./ChartContext";
import { ChartStyle } from "./ChartStyle";
import { ChartConfig } from "./types";

export const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    config?: ChartConfig;
    children: React.ReactNode;
  }
>(({ id, className, children, config = {}, ...props }, ref) => {
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

  return (
    <ChartProvider value={config}>
      <div
        data-chart={chartId}
        ref={ref}
        className={cn(
          "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none",
          className
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>
          {/* Make sure children is valid for ResponsiveContainer */}
          {React.isValidElement(children) ? children : null}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartProvider>
  );
});

ChartContainer.displayName = "Chart";
