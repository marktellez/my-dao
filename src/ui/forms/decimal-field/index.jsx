import TextField from "../text-field";

export default function DecimalField({
  value,
  max,
  onChange = () => {},
  ...rest
}) {
  function parse(val) {
    function reverse(val) {
      return val.split("").reverse().join("");
    }
    return reverse(reverse(val).replace(/[^0-9.]|\.(?=.*\.)/g, ""));
  }

  return (
    <TextField
      value={value}
      onChange={(val) => onChange(parse(max && val > max ? max : val))}
      {...rest}
    />
  );
}
