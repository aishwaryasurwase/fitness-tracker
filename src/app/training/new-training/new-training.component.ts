import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { analytics } from 'firebase';
import { UiService } from 'src/app/shared/ui.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  // @Output() startTrainingEvt = new EventEmitter();
  exercises: any;
  fetchExerciseSubscription = new Subscription();
  isLoading = false;
  loadingSubscription = new Subscription();

  constructor(private trainingService: TrainingService, private db: AngularFirestore,
    private uiService: UiService) { }


  ngOnInit(): void {
    this.loadingSubscription = this.uiService.loadingChanged.subscribe(loadingStatus => {
      this.isLoading = loadingStatus;
    })
    this.fetchExerciseSubscription = this.trainingService.exercisesChanged.subscribe(exercise => {
      this.exercises = exercise;
    })
    this.fetchExercise();
  }

  fetchExercise() {
    this.trainingService.fetchAvailableExercise();
  }

  onNewTraining(form) {
    console.log("form ", form.value.exercise);
    this.trainingService.startExercise(form.value.exercise);
  }

  // selectedExercise(event) {
  //   console.log("Selected exercise id ", event);
  // }

  ngOnDestroy() {
    if (this.fetchExerciseSubscription) {
      this.fetchExerciseSubscription.unsubscribe();
    }
  }
}
