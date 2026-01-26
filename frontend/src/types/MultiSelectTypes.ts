export type Options = { id: number; name: string };

export type MultiSelectProps = {
  options: Options[];
  label: string;
  selected: number[];
  setSelected: React.Dispatch<React.SetStateAction<number[]>>;
};
