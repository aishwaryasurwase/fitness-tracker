
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { CurrentTrainingComponent } from './current-training/current-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingComponent } from './past-training/past-training.component';
import { TrainingComponent } from './training.component';

@NgModule({
    declarations: [
        CurrentTrainingComponent,
        NewTrainingComponent,
        PastTrainingComponent,
        TrainingComponent,
    ],
    imports: [
        SharedModule
    ],
    exports: []
})
export class TrainingModule { }