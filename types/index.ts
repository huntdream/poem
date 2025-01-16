export interface Poem {
  id: string;
  title: string;
  author: string;
  paragraphs: string;
  notes: string;
}

export interface PoemList {
  poems: Poem[];
  total: number;
  nextCursor: number;
}

export interface PoemWithAdjacent {
  current: Poem;
  prev: Poem;
  next: Poem;
}
