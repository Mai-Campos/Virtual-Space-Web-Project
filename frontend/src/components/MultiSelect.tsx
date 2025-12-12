import type { MultiSelectProps } from "../types/Types";

export default function MultiSelect({
  options,
  label,
  selected,
  setSelected,
}: MultiSelectProps) {
  const handleAdd = (value: string) => {
    if (!value) return;
    if (selected.includes(value)) return;
    setSelected([...selected, value]);
  };

  const removeItem = (value: string) => {
    setSelected(selected.filter((item) => item !== value));
  };

  return (
    <div className="flex flex-col gap-2">
      <select
        className="form-select flex min-w-40 w-auto rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-white/20 bg-black/20 h-12 p-3 text-base font-normal"
        onChange={(e) => handleAdd(e.target.value)}
      >
        <option value="">{label}</option>
        {options.map((op) => (
          <option key={op} value={op}>
            {op}
          </option>
        ))}
      </select>

      {/* Chips */}
      <div className="flex flex-wrap gap-2">
        {selected.map((item) => (
          <span
            key={item}
            className="flex items-center gap-1 bg-primary/80 text-white text-sm px-3 py-1 rounded-full"
          >
            {item}

            <button
              type="button"
              className="text-white/70 hover:text-white"
              onClick={() => removeItem(item)}
            >
              ✕
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
