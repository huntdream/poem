export const endpoint =
  process.env.NODE_ENV === 'production'
    ? 'https://api.maoyu.space/api/v1/poem'
    : 'http://localhost:4000/api/v1/poem';
