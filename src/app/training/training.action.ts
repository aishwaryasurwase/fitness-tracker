import { Action } from '@ngrx/store';
import { Exercise } from './exercise.model';

export const SET_AVAILABLE_TRAINING = "[TRAINING] set available training";
export const SET_FINISHED_TRINING = "[TRAINING] set finished training";
export const START_TRINING = "[TRAINING] start training";
export const STOP_TRAINING = "[TRAINING] stop training";

export class SetAvailableTraining implements Action {
    readonly type = SET_AVAILABLE_TRAINING;
    constructor(public payload: Exercise[]) { }
}
export class SetFinishedTraining implements Action {
    readonly type = SET_FINISHED_TRINING;
    constructor(public payload: Exercise[]) { }
}

export class StartTraining implements Action {
    readonly type = START_TRINING;
    constructor(public payload: Exercise) { }
}

export class StopTraining implements Action {
    readonly type = STOP_TRAINING;
}

export type TrainingActions = SetAvailableTraining | SetFinishedTraining | StartTraining | StopTraining; 