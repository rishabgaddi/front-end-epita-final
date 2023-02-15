import { lazyLoad } from 'utils/loadable';

export const LastSeenMovies = lazyLoad(
  () => import('./index'),
  module => module.LastSeenMovies,
);
