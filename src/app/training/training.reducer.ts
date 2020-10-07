import { Exercise } from './exercise.model';
import {
    TrainingActions, SET_AVAILABLE_TRAINING,
    SET_FINISHED_TRINING, START_TRINING, STOP_TRAINING
} from './training.action';

export interface State {
    availableExercise: Exercise[];
    finishedExercise: Exercise[];
    // activeExercise: Exercise;
}

const initalState: State = {
    availableExercise: [],
    finishedExercise: [],
    // activeExercise: null
}

export function trainingReducer(state = initalState, action: TrainingActions) {
    switch (action.type) {
        case SET_AVAILABLE_TRAINING:
            return {
                ...state,
                availableExercise: action.payload
            };
        case SET_FINISHED_TRINING:
            return {
                ...state,
                finishedExercise: action.payload
            };
        // case START_TRINING:
        //     return {
        //         ...state,
        //         activeExercise: action.payload
        //     }
        // case STOP_TRAINING:
        //     return {
        //         ...state,
        //         activeExercise: null
        // }
    }
}

export const getAvailableExercises = (state: State) => state.availableExercise;
export const getFinishedExercises = (state: State) => state.finishedExercise;
// export const getActiveExercise = (state: State) => state.activeExercise;