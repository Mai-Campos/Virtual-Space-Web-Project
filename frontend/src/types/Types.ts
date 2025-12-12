export type MultiSelectProps = {
  options: string[];
  label: string;
  selected: string[];
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
};
