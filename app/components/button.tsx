import clsx from "clsx";
import type { ReactNode } from "react";
export type ButtonClickEvent = React.MouseEvent<HTMLButtonElement, MouseEvent>
export const Button = ({
  type,
  children,
  disabled = false,
  onClick,
}: {
  type?: "button" | "submit" | "reset" | undefined;
  children: ReactNode;
  disabled?: boolean;
  onClick?: (e: ButtonClickEvent) => void;
}) => {
  const _onClick = (e: ButtonClickEvent) => {
    if (onClick) onClick(e);
  }
  return (
    <button
      disabled={disabled}
      type={type ?? "button"}
      className={clsx(
        "flex transition-colors items-center justify-center rounded-md border border-transparent px-4 py-3 text-xl font-medium text-white shadow-sm hover:bg-yellow-400 sm:px-8",
        disabled ? "bg-gray-300" : "bg-tcOrange"
      )}
      onClick={_onClick}
    >
      {children}
    </button>
  );
}
