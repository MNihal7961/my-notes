export type SlideCode = {
  language: string;
  code: string;
};

export type Slide = {
  title: string;
  content: string;
  code?: SlideCode;
};

export type NoteData = {
  title: string;
  description: string;
  coverImage: string;
  accent: string;
  topics: string[];
  slides: Slide[];
};

export type Note = NoteData & {
  slug: string;
};
