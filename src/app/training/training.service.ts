import { Exercise } from "./exercise.model";
import { Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { UiService } from '../shared/ui.service';

@Injectable({
    providedIn: 'root'
})
export class TrainingService {
    exerciseChanged = new Subject<Exercise>();
    exercisesChanged = new Subject();
    finishedExercise = new Subject();

    constructor(private db: AngularFirestore, private uiService: UiService) { }

    private availableExercise: Exercise[];
    private finishedExercises = [];

    private fbSubscription: Subscription[] = [];

    // private availableExercise: Exercise[] = [
    //     { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
    //     { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 10 },
    //     { id: 'side-lunges', name: 'Side lunges', duration: 120, calories: 7 },
    //     { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 },
    // ]

    // getAvailableExercise() {
    //     return this.availableExercise.slice();
    // }

    fetchAvailableExercise() {
        this.uiService.loadingChanged.next(true);
        this.fbSubscription.push(this.db.collection('AvailableExercises').snapshotChanges().pipe(
            map(docArray => {
                return docArray.map((docData: any) => {
                    return {
                        id: docData.payload.doc.id,
                        name: docData.payload.doc.data().name,
                        duration: docData.payload.doc.data().duration,
                        calories: docData.payload.doc.data().calories
                    }
                })
            })
        ).subscribe(exercise => {
            this.uiService.loadingChanged.next(false);
            this.exercisesChanged.next([...exercise]);
            this.availableExercise = exercise;
        }, error => {
            this.uiService.loadingChanged.next(false);
            this.uiService.showSnackbar('Fetching exercise failed. Please try again ', null, 3000);
            this.exercisesChanged.next(null);
        }));
    }
    private runningExercise: Exercise;

    startExercise(selectedId: string) {
        this.runningExercise = this.availableExercise.find(ex => ex.id === selectedId);
        this.exerciseChanged.next({ ...this.runningExercise })
    }

    completedExercise() {
        this.addDataToDatabase({ ...this.runningExercise, date: new Date(), status: 'Completed' })
        this.runningExercise = null;
        this.exerciseChanged.next(null);
    }

    cancelledExercise(progress) {
        this.addDataToDatabase({
            ...this.runningExercise,
            duration: this.runningExercise.duration * (progress / 100),
            calories: this.runningExercise.calories * (progress / 100),
            date: new Date(),
            status: 'Cancelled'
        })
        this.runningExercise = null;
        this.exerciseChanged.next(null);
    }

    getRunningExercise() {
        return { ...this.runningExercise };
    }

    fetchCompletedOrCancelledExercise() {
        this.fbSubscription.push(this.db.collection('finishedExercise').valueChanges().subscribe(exercise => {
            this.finishedExercise.next(exercise);
        }))
    }

    addDataToDatabase(exercise: Exercise) {
        this.db.collection('finishedExercise').add(exercise);
    }

    // fetchCompletedOrCancelledExercise() {
    //     this.db.collection('finishedExercise').snapshotChanges().
    //         pipe(map((docArray: any) => {
    //             return docArray.map((docItem: any) => {
    //                 let exerciseArray = [];
    //                 exerciseArray.push({
    //                     date: docItem.payload.doc.data().date,
    //                     name: docItem.payload.doc.data().name,
    //                     duration: docItem.payload.doc.data().duration,
    //                     status: docItem.payload.doc.data().status,
    //                     calories: docItem.payload.doc.data().calories
    //                 })
    //             })
    //         })).subscribe(result => {
    //             console.log("RESULT ", result);
    //         })
    // }

    cancelSubscription() {
        this.fbSubscription.forEach(sub => sub.unsubscribe())
    }
}
