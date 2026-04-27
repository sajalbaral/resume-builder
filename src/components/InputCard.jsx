export default function InputCard({
  label,
  name,
  id,
  value,
  onChange,
  placeholder,
  icon,
}) {
  return (
    <div className="card">
      <div className="card-header">
        <div className="card-icon">{icon}</div>
        <span className="card-label">{label}</span>
        <span className="char-count">
          {value.length.toLocaleString()} chars
        </span>
      </div>
      <textarea
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}
