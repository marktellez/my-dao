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
      autoWidth
      onChange={(val) => onChange(val)}
      {...rest}
    />
  );
}
