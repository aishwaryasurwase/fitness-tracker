import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StopTrainingDialogComponent } from './stop-training-dialog/stop-training-dialog.component';
import { TrainingService } from '../training.service';
import { Subscription } from 'rxjs';
import { Exercise } from '../exercise.model';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  @Output() trainingExit = new EventEmitter();
  progress = 0;
  timer;

  currentExercise;
  constructor(private dialog: MatDialog, private trainingService: TrainingService) { }

  ngOnInit(): void {
    this.startOrResumeTraining();
    // this.currentExercise = this.trainingService.getRunningExercise();
    // console.log("currentExercise ", this.currentExercise);
  }

  startOrResumeTraining() {
    const steps = this.trainingService.getRunningExercise().duration / 100 * 1000;
    this.timer = setInterval(() => {
      this.progress = this.progress + 10;
      if (this.progress >= 100) {
        this.trainingService.completedExercise();
        clearInterval(this.timer);
      }
    }, steps);
  }

  stopTraining() {
    clearInterval(this.timer);
    let dialogRef = this.dialog.open(StopTrainingDialogComponent, { data: { progress: this.progress } })

    dialogRef.afterClosed().subscribe(res => {
      console.log("RESULT ", res);
      if (res) {
        this.trainingService.cancelledExercise(this.progress);
        this.trainingExit.emit();
      } else {
        this.startOrResumeTraining();
      }
    })
  }
}
