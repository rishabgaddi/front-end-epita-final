import { lazyLoad } from 'utils/loadable';

export const Address = lazyLoad(
  () => import('./index'),
  module => module.Address,
);
