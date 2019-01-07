import {Action} from "./action";

export interface ReducerFunction<T, U extends Action = Action> {
    (state: T, action: U): T;
}