import { lazyLoad } from 'utils/loadable';

export const MovieCard = lazyLoad(
  () => import('./index'),
  module => module.MovieCard,
);
