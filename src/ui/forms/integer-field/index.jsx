import DecimalField from "../decimal-field";

export default function IntegerField({ value, onChange = () => {}, ...rest }) {
  function parse(val) {
    return val.replace(/[^0-9]/g, "");
  }

  return (
    <DecimalField
      value={value}
      onChange={(val) => onChange(parse(val))}
      {...rest}
    />
  );
}
