import { lazyLoad } from 'utils/loadable';

export const CreateUser = lazyLoad(
  () => import('./index'),
  module => module.CreateUser,
);
