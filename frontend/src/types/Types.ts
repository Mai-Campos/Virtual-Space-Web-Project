export type CardProps = {
  title: string;
  description: string;
  imageSrc: string;
};

export type MovieDetailsProps = {
  title: string;
  director: string;
  sinopsis: string;
  genres: string[];
  fileSize: number;
  posterUrl: string;
};

export type SerialDetailsProps = {
  title: string;
  sinopsis: string;
  posterUrl: string;
  fileSize: number;
  genres: string[];
  temporadas: number;
  platform: string;
};

export type GameDetailsProps = {
  title: string;
  sinopsis: string;
  posterUrl: string;
  fileSize: number;
  categories: string[];
};

export type MultiSelectProps = {
  options: string[];
  label: string;
  selected: string[];
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
};
