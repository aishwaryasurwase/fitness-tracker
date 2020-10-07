import { Action } from '@ngrx/store';
import { AuthAction, AUTHORIZED, UNAUTHORIZED } from './auth.action';

export interface State {
    isAuthorized: boolean
}

const initialState: State = {
    isAuthorized: false
}

export function authReducer(state = initialState, action: AuthAction) {
    switch (action.type) {
        case AUTHORIZED:
            return {
                isAuthorized: true
            };
        case UNAUTHORIZED:
            return {
                isAuthorized: false
            }
        default:
            return state
    }
}

export const getIsAuthorized = (state: State) => state.isAuthorized