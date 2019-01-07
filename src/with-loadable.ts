import {Loadable, onLoadableError, onLoadableLoad, onLoadableSuccess} from './loadable';
import {ActionTypes} from "./action-types";
import {Action} from "./action";
import {ReducerFunction} from "./reducer-function";

export function withLoadable<T extends Loadable, U extends Action = Action>(reducer: ReducerFunction<T, U>, {loadingActionType, successActionType, errorActionType}: ActionTypes) {
  return (state: T, action: U): T => {
    if (matchType(loadingActionType, action.type)) {
      state = onLoadableLoad(state);
    }
    if (matchType(successActionType, action.type)) {
      state = onLoadableSuccess(state);
    }
    if (matchType(errorActionType, action.type)) {
      state = onLoadableError(state, (action as any).error);
    }
    return reducer(state, action);
  };
}

function matchType(actionType: string | string[], type: string): boolean {
  return typeof actionType === 'string' ? actionType === type : actionType.indexOf(type) !== -1;
}
