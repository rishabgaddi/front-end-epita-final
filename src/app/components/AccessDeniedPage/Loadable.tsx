import { lazyLoad } from 'utils/loadable';

export const AccessDeniedPage = lazyLoad(
  () => import('./index'),
  module => module.AccessDeniedPage,
);
