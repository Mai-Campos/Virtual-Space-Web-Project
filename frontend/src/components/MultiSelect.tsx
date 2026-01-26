import type { MultiSelectProps } from "../types/MultiSelectTypes";

export default function MultiSelect({
  options = [],
  label,
  selected,
  setSelected,
}: MultiSelectProps) {
  const handleAdd = (value: string) => {
    if (!value) return;

    const id = Number(value);

    if (selected.includes(id)) return;
    setSelected([...selected, id]);
  };

  const removeItem = (id: number) => {
    setSelected(selected.filter((item) => item !== id));
  };

  return (
    <div className="flex flex-col gap-2">
      <select
        className="form-select flex min-w-40 w-auto rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-white/20 bg-black/20 h-12 p-3 text-base font-normal"
        onChange={(e) => handleAdd(e.target.value)}
      >
        <option value="" className="text-primary">
          {label}
        </option>
        {options.map((op) => (
          <option key={op.id} value={op.id} className="text-primary">
            {op.name}
          </option>
        ))}
      </select>

      {/* Chips */}
      <div className="flex flex-wrap gap-2">
        {selected.map((id) => {
          const option = options.find((op) => op.id === id);
          if (!option) return null;
          return (
            <span
              key={id}
              className="flex items-center gap-1 bg-primary/80 text-white text-sm px-3 py-1 rounded-full"
            >
              {option.name}

              <button
                type="button"
                className="text-white/70 hover:text-white"
                onClick={() => removeItem(id)}
              >
                ✕
              </button>
            </span>
          );
        })}
      </div>
    </div>
  );
}
