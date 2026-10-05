import { ReactNode, CSSProperties } from "react";
import Link from "next/link";
import clsx from "clsx";
import { ArrowRight } from "lucide-react";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "light" | "ghost";
  className?: string;
  icon?: boolean;
  style?: CSSProperties;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
};

export default function Button({
  children,
  href,
  variant = "primary",
  className,
  icon = true,
  style,
  onClick,
  type = "button",
  disabled,
}: ButtonProps) {
  const base =
    "group relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md px-7 py-3.5 text-sm font-semibold tracking-wide transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants: Record<string, string> = {
    // Dark text on the brand gold — white on #CCB78A fails contrast.
    primary: "bg-oxblood text-concrete hover:bg-[#bda675] shadow-sm",
    secondary: "bg-transparent text-concrete border border-concrete/20 hover:border-concrete/60",
    // For use on top of photos / dark backgrounds.
    light: "bg-transparent text-white border border-white/50 hover:bg-white hover:text-concrete",
    ghost: "bg-transparent text-concrete/80 hover:text-concrete px-0 py-0",
  };

  const content = (
    <>
      <span>{children}</span>
      {icon && (
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={2} />
      )}
    </>
  );

  const classes = clsx(base, variants[variant], className);

  if (href) {
    return (
      <Link href={href} className={classes} style={style}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes} style={style} disabled={disabled}>
      {content}
    </button>
  );
}
