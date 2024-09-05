"use client";

import * as ProgressPrimitive from "@radix-ui/react-progress";
import * as React from "react";

import { cn } from "@/lib/utils";

export const CircleProgress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
    indicatorColor?: string;
    backgroudColor?: string;
  }
>(
  (
    {
      className,
      value,
      indicatorColor = "blue",
      backgroudColor = "pink",
      ...props
    },
    ref,
  ) => (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-20 w-20 overflow-hidden rounded-full bg-primary/20 flex justify-center items-center",
        className,
      )}
      {...props}
      style={{
        background: `radial-gradient(closest-side, white 79%, transparent 80% 100%), conic-gradient(${indicatorColor} ${
          value || 0
        }%, ${backgroudColor} 0)`,
      }}
    >
      <div className="">{`${value || 0}%`}</div>
    </ProgressPrimitive.Root>
  ),
);

// define display name
CircleProgress.displayName = "CircleProgress";
