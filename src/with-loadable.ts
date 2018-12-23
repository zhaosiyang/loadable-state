import {Loadable, onLoadableError, onLoadableLoad, onLoadableSuccess} from './loadable';
import {ActionTypes} from "./action-types";

export function withLoadable<T extends Loadable>(reducer: Function, {loadingActionType, successActionType, errorActionType}: ActionTypes): Function {
  return (state: T, action: {type: string; error?: any}): T => {
    if (action.type === loadingActionType) {
      state = onLoadableLoad(state);
    }
    if (action.type === successActionType) {
      state = onLoadableSuccess(state);
    }
    if (action.type === errorActionType) {
      state = onLoadableError(state, action.error);
    }
    return reducer(state, action);
  };
}
