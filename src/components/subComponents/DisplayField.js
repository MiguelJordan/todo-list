export default function DisplayField({ value = "", sx = {} }) {
  return (
    <input
      readOnly
      value={value ?? ""}
      style={{
        border: "none",
        outline: "none",
        fontSize: "larger",
        backgroundColor: "transparent",
        color: "#B3B3B3",
        textAlign: "center",
        margin: "5px auto",
        padding: "10px 0",
        ...sx,
      }}
    />
  );
}
