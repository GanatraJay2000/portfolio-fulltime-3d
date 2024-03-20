import { cn } from "@/util/cn";

type HeadingProps = {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  size?: "xl" | "lg" | "md" | "sm";
  children: React.ReactNode;
  className?: string;
};

export default function Heading({
  as: Comp = "h1",
  className,
  children,
  size = "lg",
}: HeadingProps) {
  return (
    <Comp
      className={cn(
        "font-bold leading-tight tracking-tight  text-slate-300",
        {
          "text-7xl md:text-9xl": size === "xl",
          "text-6xl md:text-8xl": size === "lg",
          "text-5xl md:text-6xl": size === "md",
          "text-3xl md:text-4xl": size === "sm",
        },
        className
      )}
    >
      {children}
    </Comp>
  );
}
