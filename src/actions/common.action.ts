import {START_LOADING, END_LOADING} from '../common/constants';

export const startLoading = () => ({
  type: START_LOADING,
});

export const endLoading = () => ({
  type: END_LOADING,
});
