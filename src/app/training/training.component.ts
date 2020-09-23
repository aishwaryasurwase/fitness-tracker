import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrainingService } from './training.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-training',
    templateUrl: './training.component.html',
    styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit, OnDestroy {
    ongoingTraining = false;
    trainingChanged = new Subscription();

    constructor(private trainingService: TrainingService) {
        this.trainingChanged = this.trainingService.exerciseChanged.subscribe(ex => {
            if (ex) {
                this.ongoingTraining = true;
            } else {
                this.ongoingTraining = false;
            }
        })
    }
    ngOnInit() { }

    ngOnDestroy() {
        if (this.trainingChanged) {
            this.trainingChanged.unsubscribe();
        }
    }
}