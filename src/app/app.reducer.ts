// export interface State {
//     isLoading: boolean
// }
// const initalState: State = {
//     isLoading: false
// }
// export function appReducer(state = initalState, action) {
//     switch (action.type) {
//         case 'START_LOADING':
//             return {
//                 isLoading: true
//             }
//         case 'STOP_LOADING':
//             return {
//                 isLoading: false
//             }
//         default:
//             return state;
//     }
// }
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as frmUI from './shared/ui.reducer';
import * as frmAuth from './auth/auth.reducer';
import * as frmTraining from './training/training.reducer';

export interface State {
    ui: frmUI.State;
    auth: frmAuth.State;
    training: frmTraining.State;
}

export const reducer: ActionReducerMap<State> = {
    ui: frmUI.uiReducer,
    auth: frmAuth.authReducer,
    training: frmTraining.trainingReducer
}

export const getUiState = createFeatureSelector<frmUI.State>('ui');
export const getIsLoading = createSelector(getUiState, frmUI.getIsLoading);

export const getAuthState = createFeatureSelector<frmAuth.State>('auth');
export const getIsAuthorized = createSelector(getAuthState, frmAuth.getIsAuthorized);

export const getTrainingState = createFeatureSelector<frmTraining.State>('training');
export const getAvailableExercises = createSelector(getTrainingState, frmTraining.getAvailableExercises);
export const getFinishedExercises = createSelector(getTrainingState, frmTraining.getFinishedExercises);
// export const getActiveExercise = createSelector(getTrainingState, frmTraining.getActiveExercise);