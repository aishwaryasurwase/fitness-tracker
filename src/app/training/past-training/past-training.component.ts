import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements OnInit, AfterViewInit, OnDestroy {
  displayColumns = ['date', 'name', 'duration', 'status', 'calories']
  dataSource = new MatTableDataSource<Exercise>();
  constructor(private trainingService: TrainingService) { }
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  finishExerciseSubscription = new Subscription();
  ngOnInit(): void {
    this.finishExerciseSubscription = this.trainingService.finishedExercise.subscribe((finishExercise: Exercise[]) => {
      this.dataSource.data = finishExercise
    })
    this.trainingService.fetchCompletedOrCancelledExercise();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  onFilter(filterValue) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy() {
    if (this.finishExerciseSubscription) {
      this.finishExerciseSubscription.unsubscribe();
    }
  }
}
