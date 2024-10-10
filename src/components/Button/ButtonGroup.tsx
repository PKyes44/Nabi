import Button, { ButtonVariant } from "./Button";

type buttonGroupProps = {
  value: string;
  errorText?: string | null;
};
type ButtonGroupProps = buttonGroupProps & ButtonVariant;

function ButtonGroup({ value, errorText, ...props }: ButtonGroupProps) {
  return (
    <div className={`flex flex-col items-start`}>
      <Button {...props}>{value}</Button>
      {errorText && <span className="text-red-500 font-sm">{errorText}</span>}
    </div>
  );
}

export default ButtonGroup;
