import React, { InputHTMLAttributes } from "react";
import cn from "classnames";

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label: string;
  name: string;
  error: string | null;
}

const TextInput = React.forwardRef<HTMLInputElement, Props>(
  (
    { className, label, name, error, ...rest },
    ref
  ) => {
    return (
      <div className={className}>
        <label htmlFor={name} className="text-sm font-semibold text-body">
          {label}
        </label>
        <input
          id={name}
          name={name}
          type="password"
          ref={ref}
          className={cn(
            "w-full appearance-none rounded py-3 text-sm text-heading transition duration-300 ease-in-out focus:outline-0 focus:ring-0 ltr:pl-4 ltr:pr-11 rtl:pr-4 rtl:pl-11",
            "bg-gray-100 border border-border-base focus:bg-light focus:border-accent",
            error && "border-red-500",
            className
          )}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          {...rest}
        />
        {error && <p className="my-2 text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);
TextInput.displayName = "TextInput";
export default TextInput;
