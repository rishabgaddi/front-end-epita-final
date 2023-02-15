import { lazyLoad } from 'utils/loadable';

export const TopPopularMovies = lazyLoad(
  () => import('./index'),
  module => module.TopPopularMovies,
);
