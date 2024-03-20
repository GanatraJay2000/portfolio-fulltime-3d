import { cn } from "@/util/cn";
import React from "react";

type BoundedProps = {
  as?: React.ElementType;
  className?: string;
  children: React.ReactNode;
};

const Bounded = React.forwardRef<HTMLDivElement, BoundedProps>(
  ({ as: Comp = "section", className, children, ...props }, ref) => {
    return (
      <Comp
        ref={ref}
        className={cn("px-4 py-10 md:px-6 md:py-14 lg:py-16", className)}
        {...props}
      >
        <div className="mx-auto w-full max-w-7xl">{children}</div>
      </Comp>
    );
  }
);

Bounded.displayName = "Bounded";

export default Bounded;
