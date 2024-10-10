import { useId } from "react";
import Input from "./Input";

type inputGroupProps = {
  label?: string;
  wrapperClassName?: string;
  innerClassName?: string;
  inputClassName?: string;
  errorText?: string;
  helpText?: string;
};
type InputGroupProps = inputGroupProps;

function InputGroup({
  errorText,
  helpText,
  label,
  wrapperClassName,
  innerClassName,
  inputClassName,
  ...props
}: InputGroupProps) {
  const inputId = useId();

  return (
    <div className={`w-96 ${wrapperClassName} flex flex-col gap-y-1`}>
      {label && <label htmlFor={inputId}>{label}</label>}
      <Input
        intent={errorText ? "error" : "default"}
        innerClassName={innerClassName}
        inputClassName={inputClassName}
        inputId={inputId}
        {...props}
      />
      {errorText ? (
        <span className="text-red-500 text-sm">{errorText}</span>
      ) : (
        helpText && <span className="text-gray-400 text-sm">{helpText}</span>
      )}
    </div>
  );
}

export default InputGroup;
