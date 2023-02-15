import { lazyLoad } from 'utils/loadable';

export const TopViewedMovies = lazyLoad(
  () => import('./index'),
  module => module.TopViewedMovies,
);
