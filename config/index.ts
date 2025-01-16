export const endpoint =
  process.env.NODE_ENV === 'production'
    ? 'https://api.maoyu.space'
    : 'http://localhost:4000/api/v1/poem';
