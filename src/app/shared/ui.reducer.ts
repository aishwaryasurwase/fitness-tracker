import { Action } from '@ngrx/store';
import { UIAction, START_LOADING, STOP_LOADING } from './ui.action';

export interface State {
    isLoading: boolean
}
const initalState: State = {
    isLoading: false
}
export function uiReducer(state = initalState, action: UIAction) {
    switch (action.type) {
        case START_LOADING:
            return {
                isLoading: true
            }
        case STOP_LOADING:
            return {
                isLoading: false
            }
        default:
            return state;
    }
}

export const getIsLoading = (state: State) => state.isLoading;