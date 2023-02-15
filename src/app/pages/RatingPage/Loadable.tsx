import { lazyLoad } from 'utils/loadable';

export const RatingPage = lazyLoad(
  () => import('./index'),
  module => module.RatingPage,
);
