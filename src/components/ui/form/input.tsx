import cn from "classnames";
import React, { InputHTMLAttributes } from "react";

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  inputClassName?: string;
  label?: string;
  name: string;
  error?: string;
  type?: string;
  disabled?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      className,
      label,
      name,
      error,
      disabled = false,
      type = "text",
      inputClassName,
      ...rest
    },
    ref
  ) => {
    return (
      <div className={className}>
        {label && (
          <label
            htmlFor={name}
            className="mb-3 block text-sm font-semibold leading-none text-body-dark"
          >
            {label}
          </label>
        )}
        <input
          id={name}
          name={name}
          type={type}
          ref={ref}
          className={cn(
            "w-full appearance-none px-4 py-3 text-sm text-heading transition duration-300 ease-in-out focus:outline-0 focus:ring-0 border rounded",
            "bg-gray-100 border border-border-base focus:bg-light focus:border-accent",
            disabled && "cursor-not-allowed bg-gray-100",
            inputClassName
          )}
          disabled={disabled}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          aria-invalid={error ? "true" : "false"}
          {...rest}
        />
        {error && <p className="mt-2 text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";
export default Input;
