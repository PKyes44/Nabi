import Button, { ButtonProps, ButtonVariant } from "./Button";

type buttonGroupProps = {
  value: string;
  errorText?: string | null;
  className?: string;
  wrapperClassName?: string;
};
type ButtonGroupProps = buttonGroupProps & ButtonVariant & ButtonProps;

function ButtonGroup({
  value,
  errorText,
  className,
  wrapperClassName,
  ...props
}: ButtonGroupProps) {
  return (
    <div className={`flex flex-col items-start ${wrapperClassName}`}>
      <Button className={className} {...props}>
        {value}
      </Button>
      {errorText && <span className="text-red-500 font-sm">{errorText}</span>}
    </div>
  );
}

export default ButtonGroup;
