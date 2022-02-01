import TextField from "../text-field";

export default function EthAddressField({
  value,
  onChange = () => {},
  ...rest
}) {
  return (
    <TextField
      label="Polygon address"
      value={value}
      onChange={(val) => onChange(val)}
      {...rest}
    />
  );
}
