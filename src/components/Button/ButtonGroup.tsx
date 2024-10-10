import Button, { ButtonVariant } from "./Button";

type buttonGroupProps = {
  value: string;
  errorText?: string | null;
  className?: string;
};
type ButtonGroupProps = buttonGroupProps & ButtonVariant;

function ButtonGroup({
  value,
  errorText,
  className,
  ...props
}: ButtonGroupProps) {
  return (
    <div className={`flex flex-col items-start`}>
      <Button className={className} {...props}>
        {value}
      </Button>
      {errorText && <span className="text-red-500 font-sm">{errorText}</span>}
    </div>
  );
}

export default ButtonGroup;
