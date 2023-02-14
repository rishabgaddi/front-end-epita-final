import { lazyLoad } from 'utils/loadable';

export const AddMovie = lazyLoad(
  () => import('./index'),
  module => module.AddMovie,
);
