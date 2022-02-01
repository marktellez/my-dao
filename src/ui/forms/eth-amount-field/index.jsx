import DecimalField from "../decimal-field";

export default function EthAmountField({
  value,
  label,
  onChange = () => {},
  ...rest
}) {
  return (
    <DecimalField
      label={label}
      value={value}
      onChange={(val) => onChange(val)}
      {...rest}
    />
  );
}
