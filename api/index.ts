import { endpoint } from '@/config';
import { Poem, PoemList, PoemWithAdjacent } from '@/types';

export const getPoems = async ({
  limit = 10,
  cursor = 0,
}: {
  limit: number;
  cursor: number;
}): Promise<PoemList> => {
  const poems = await fetch(
    `${endpoint}/list?limit=${limit}&cursor=${cursor}`,
    {}
  );

  return poems.json();
};

export const getPoemById = async (id: string): Promise<Poem> => {
  const poem = await fetch(`${endpoint}/${id}`);
  return poem.json();
};

export const getPoemWithAdjacent = async (
  id: string
): Promise<PoemWithAdjacent> => {
  const poem = await fetch(`${endpoint}/${id}/adjacent`);
  return poem.json();
};
