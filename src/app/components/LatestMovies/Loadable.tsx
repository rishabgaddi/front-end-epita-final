import { lazyLoad } from 'utils/loadable';

export const LatestMovies = lazyLoad(
  () => import('./index'),
  module => module.LatestMovies,
);
